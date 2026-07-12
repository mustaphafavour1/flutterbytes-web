import { google } from 'googleapis';
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

function hasSheetsCreds(): boolean {
  return !!(process.env.GOOGLE_SHEETS_CLIENT_EMAIL && process.env.GOOGLE_SHEETS_PRIVATE_KEY && process.env.SPREADSHEET_ID);
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

export async function getSpeakers(): Promise<Speaker[]> {
  if (!hasSheetsCreds()) return fallbackSpeakers;
  try {
    const sheets = google.sheets({ version: 'v4', auth: getAuth() });
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: process.env.SPREADSHEET_ID, range: 'Speakers!A2:G100' });
    const rows = res.data.values || [];
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
    const sheets = google.sheets({ version: 'v4', auth: getAuth() });
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: process.env.SPREADSHEET_ID, range: `${day}!A2:E100` });
    const rows = res.data.values || [];
    return rows.map(([time, session, speaker, hall, tags]) => ({
      time: time || '',
      session: session || '',
      speaker: speaker || '',
      hall: hall || '',
      tags: tags ? tags.split(',').map((t: string) => t.trim()) : [],
    }));
  } catch (e) { console.error(`[sheets] getAgenda(${day}) error:`, e); return day === 'Friday' ? fallbackFriday : fallbackSaturday; }
}

export async function getCommittee(): Promise<CommitteeMember[]> {
  if (!hasSheetsCreds()) return fallbackCommittee;
  try {
    const sheets = google.sheets({ version: 'v4', auth: getAuth() });
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: process.env.SPREADSHEET_ID, range: 'Committee!A2:E100' });
    const rows = res.data.values || [];
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
    const sheets = google.sheets({ version: 'v4', auth: getAuth() });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Settings!A1:B20',
    });
    const rows = res.data.values || [];
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
    return fallbackSpeakers;
  }
  console.log('[sheets] getPastSpeakers: fetching, spreadsheetId starts with', process.env.SPREADSHEET_ID?.slice(0, 8));
  try {
    const sheets = google.sheets({ version: 'v4', auth: getAuth() });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'PastSpeakers!A2:H200',
    });
    const rows = res.data.values || [];
    console.log('[sheets] getPastSpeakers: got', rows.length, 'rows');
    return rows.map(([name, role, company, twitter, photo, bio, tags]) => ({
      name: name || '',
      role: role || '',
      company: company || '',
      twitter: twitter || undefined,
      photo: convertDriveUrl(photo),
      bio: bio || undefined,
      tags: tags ? tags.split(',').map((t: string) => t.trim()) : [],
    }));
  } catch (e) { console.error('[sheets] getPastSpeakers error:', e); return fallbackSpeakers; }
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
    const sheets = google.sheets({ version: 'v4', auth: getAuth() });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Gallery!A2:C200',
    });
    const rows = res.data.values || [];
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
