import { formatInTimeZone } from 'date-fns-tz';
import { addDays, parseISO, format, differenceInCalendarDays } from 'date-fns';

export const TIMEZONE = 'Africa/Lagos';

export function getTodayString(): string {
  return formatInTimeZone(new Date(), TIMEZONE, 'yyyy-MM-dd');
}

export function calculatePublicationDate(seriesStartDate: string, dayNumber: number): string {
  const start = parseISO(seriesStartDate);
  const pubDate = addDays(start, dayNumber - 1);
  return format(pubDate, 'yyyy-MM-dd');
}

export function isDevotionalAvailable(publicationDate: string, status: string): boolean {
  const today = getTodayString();
  return (
    (status === 'published' || status === 'scheduled') &&
    publicationDate <= today
  );
}

export function formatDateForDisplay(dateString: string): string {
  const date = parseISO(dateString);
  return formatInTimeZone(date, TIMEZONE, 'EEEE, MMMM d, yyyy');
}

export function getDaysUntil(dateString: string): number {
  const today = parseISO(getTodayString());
  const target = parseISO(dateString);
  return differenceInCalendarDays(target, today);
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}