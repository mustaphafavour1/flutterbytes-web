import { google } from 'googleapis';
import { resolvePastSpeakers } from '@/lib/speaker-photos';
import { fallbackSpeakers, type Speaker } from '@/data/fallback-speakers';
import { fallbackFriday, fallbackSaturday, type AgendaSession } from '@/data/fallback-agenda';
import { fallbackCommittee, type CommitteeMember } from '@/data/fallback-committee';

export type { Speaker, AgendaSession, CommitteeMember };

export function convertDriveUrl(url: string | undefined | null): string {
  const placeholder = 'https://ui-avatars.com/api/?background=1E3A5F&color=38BDF8&size=200&bold=true';
  if (!url || url.trim() === '') return placeholder;
  if (url.includes('uc?export=view')) return url;
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
  return url;
}

function getSpreadsheetId(): string | undefined {
  const raw = process.env.SPREADSHEET_ID;
  if (!raw) return undefined;
  // Accept full Google Sheets URL — extract just the ID part
  const match = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : raw;
}

function hasSheetsCreds(): boolean {
  return !!(process.env.GOOGLE_SHEETS_CLIENT_EMAIL && process.env.GOOGLE_SHEETS_PRIVATE_KEY && getSpreadsheetId());
}

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

const normalizeTab = (s: string) => s.toLowerCase().replace(/[\s_-]/g, '');

/** List all tab (worksheet) titles in the spreadsheet. */
async function getSheetTitles(): Promise<string[]> {
  const sheets = google.sheets({ version: 'v4', auth: getAuth() });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: getSpreadsheetId() });
  return (meta.data.sheets || []).map((s) => s.properties?.title || '').filter(Boolean);
}

/**
 * Read rows from the first tab whose title matches one of `candidates`
 * (case-insensitive, ignoring spaces/underscores/hyphens). This makes data
 * loading resilient to a tab being named e.g. "Past Speakers" instead of
 * "PastSpeakers". Throws (with the list of available tabs) if none match.
 */
async function fetchTabRows(candidates: string[], a1Range: string): Promise<string[][]> {
  const sheets = google.sheets({ version: 'v4', auth: getAuth() });
  const titles = await getSheetTitles();
  const wanted = candidates.map(normalizeTab);
  const match = titles.find((t) => wanted.includes(normalizeTab(t)));
  if (!match) {
    throw new Error(
      `No tab matched [${candidates.join(', ')}]. Available tabs: [${titles.join(', ')}]`
    );
  }
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: `'${match}'!${a1Range}`,
  });
  return res.data.values || [];
}

export async function getSpeakers(): Promise<Speaker[]> {
  if (!hasSheetsCreds()) {
    console.log('[sheets] getSpeakers: missing env vars, using fallback');
    return fallbackSpeakers;
  }
  try {
    const rows = await fetchTabRows(['Speakers', 'Speaker', '2026 Speakers'], 'A2:G100');
    console.log('[sheets] getSpeakers: got', rows.length, 'rows');
    if (rows.length === 0) return fallbackSpeakers;
    return rows.map(([name, role, company, twitter, photo, bio, tags]) => ({
      name: name || '',
      role: role || '',
      company: company || '',
      twitter: twitter || undefined,
      photo: convertDriveUrl(photo),
      bio: bio || undefined,
      tags: tags ? tags.split(',').map((t: string) => t.trim()) : [],
    }));
  } catch (e) { console.error('[sheets] getSpeakers error:', e); return fallbackSpeakers; }
}

export async function getAgenda(day: 'Friday' | 'Saturday'): Promise<AgendaSession[]> {
  if (!hasSheetsCreds()) return day === 'Friday' ? fallbackFriday : fallbackSaturday;
  try {
    const rows = await fetchTabRows([day], 'A2:F100');
    if (rows.length === 0) return day === 'Friday' ? fallbackFriday : fallbackSaturday;
    return rows.map(([time, session, speaker, hall, type, tags]) => ({
      time: time || '',
      session: session || '',
      speaker: speaker || '',
      hall: hall || '',
      type: type || undefined,
      tags: tags ? tags.split(',').map((t: string) => t.trim()) : [],
    }));
  } catch (e) { console.error(`[sheets] getAgenda(${day}) error:`, e); return day === 'Friday' ? fallbackFriday : fallbackSaturday; }
}

export async function getCommittee(): Promise<CommitteeMember[]> {
  if (!hasSheetsCreds()) return fallbackCommittee;
  try {
    const rows = await fetchTabRows(['Committee'], 'A2:E100');
    if (rows.length === 0) return fallbackCommittee;
    return rows.map(([name, role, title, photo, bio]) => ({
      name: name || '',
      role: role || '',
      title: title || undefined,
      photo: convertDriveUrl(photo),
      bio: bio || undefined,
    }));
  } catch (e) { console.error('[sheets] getCommittee error:', e); return fallbackCommittee; }
}

/**
 * Settings tab: rows of [KEY, VALUE].
 * Add a row "AGENDA_VISIBLE | true" to show the agenda grid.
 * Without that row (or when value is not "true"), shows the coming-soon overlay.
 */
export async function getAgendaVisible(): Promise<boolean> {
  if (!hasSheetsCreds()) return false;
  try {
    const rows = await fetchTabRows(['Settings'], 'A1:B20');
    const row = rows.find(([k]) => k?.toLowerCase().trim() === 'agenda_visible');
    const val = row?.[1]?.toLowerCase().trim() ?? '';
    return val === 'true' || val === 'yes' || val === '1';
  } catch (e) { console.error('[sheets] getAgendaVisible error:', e); return false; }
}

/**
 * Past editions speakers — separate sheet tab "PastSpeakers".
 * Columns: name, role, company, twitter, photo, bio, tags, edition (year)
 */
export async function getPastSpeakers(): Promise<Speaker[]> {
  if (!hasSheetsCreds()) {
    console.log('[sheets] getPastSpeakers: missing env vars, using fallback');
    return resolvePastSpeakers(fallbackSpeakers);
  }
  try {
    const rows = await fetchTabRows(
      ['PastSpeakers', 'Past Speakers', 'Past Editions', 'Past Edition Speakers'],
      'A2:H200'
    );
    console.log('[sheets] getPastSpeakers: got', rows.length, 'rows');
    if (rows.length === 0) return resolvePastSpeakers(fallbackSpeakers);
    return resolvePastSpeakers(rows.map(([name, role, company, twitter, photo, bio, tags]) => ({
      name: name || '',
      role: role || '',
      company: company || '',
      twitter: twitter || undefined,
      photo: convertDriveUrl(photo),
      bio: bio || undefined,
      tags: tags ? tags.split(',').map((t: string) => t.trim()) : [],
    })));
  } catch (e) { console.error('[sheets] getPastSpeakers error:', e); return resolvePastSpeakers(fallbackSpeakers); }
}

/**
 * Gallery photo sets — "Gallery" sheet tab.
 * Columns: set (1-4), src (Drive URL or direct URL), caption?
 * Returns 4 arrays of photo URLs.
 */
export async function getGalleryPhotos(): Promise<string[][]> {
  const empty: string[][] = [[], [], [], []];
  if (!hasSheetsCreds()) return empty;
  try {
    const rows = await fetchTabRows(['Gallery'], 'A2:C200');
    const sets: string[][] = [[], [], [], []];
    for (const [set, src] of rows) {
      const idx = parseInt(set, 10) - 1;
      if (idx >= 0 && idx < 4 && src) {
        sets[idx].push(convertDriveUrl(src));
      }
    }
    return sets;
  } catch (e) { console.error('[sheets] getGalleryPhotos error:', e); return empty; }
}

/**
 * Live diagnostics for the /api/debug/sheets route. Never throws — returns a
 * plain object describing exactly what the server sees, with no secrets leaked.
 */
export async function getSheetsDiagnostics(): Promise<Record<string, unknown>> {
  const rawId = process.env.SPREADSHEET_ID;
  const resolvedId = getSpreadsheetId();
  const base: Record<string, unknown> = {
    clientEmailPresent: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL
      ? process.env.GOOGLE_SHEETS_CLIENT_EMAIL
      : null,
    privateKeyPresent: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    privateKeyLength: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.length ?? 0,
    privateKeyLooksEscaped: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.includes('\\n') ?? false,
    spreadsheetIdPresent: !!rawId,
    spreadsheetIdWasUrl: rawId ? rawId !== resolvedId : false,
    spreadsheetIdPreview: resolvedId ? `${resolvedId.slice(0, 6)}…${resolvedId.slice(-4)}` : null,
    hasAllCreds: hasSheetsCreds(),
  };
  if (!hasSheetsCreds()) {
    base.result = 'MISSING_CREDS — one or more env vars are not set at runtime';
    return base;
  }
  try {
    const titles = await getSheetTitles();
    base.availableTabs = titles;
    const counts: Record<string, number> = {};
    for (const [key, cands, range] of [
      ['Speakers', ['Speakers', 'Speaker', '2026 Speakers'], 'A2:G100'],
      ['PastSpeakers', ['PastSpeakers', 'Past Speakers', 'Past Editions'], 'A2:H200'],
      ['Committee', ['Committee'], 'A2:E100'],
    ] as const) {
      try {
        const rows = await fetchTabRows(cands as unknown as string[], range);
        counts[key] = rows.length;
      } catch (e) {
        counts[key] = -1;
        base[`${key}Error`] = (e as Error).message;
      }
    }
    base.rowCounts = counts;
    base.result = 'OK — spreadsheet reachable';
  } catch (e) {
    base.result = 'AUTH_OR_ACCESS_ERROR';
    base.error = (e as Error).message;
  }
  return base;
}
