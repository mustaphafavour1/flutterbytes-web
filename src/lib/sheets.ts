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
  } catch { return fallbackSpeakers; }
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
  } catch { return day === 'Friday' ? fallbackFriday : fallbackSaturday; }
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
  } catch { return fallbackCommittee; }
}
