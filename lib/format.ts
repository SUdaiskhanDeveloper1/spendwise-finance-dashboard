import { DEFAULT_CURRENCY, LOCALE, TODAY } from './constants';

// Intl formatters are expensive to construct, so they are cached by key.
const numberFormats = new Map<string, Intl.NumberFormat>();
const dateFormats = new Map<string, Intl.DateTimeFormat>();

function numberFormat(key: string, options: Intl.NumberFormatOptions) {
  let format = numberFormats.get(key);
  if (!format) {
    format = new Intl.NumberFormat(LOCALE, options);
    numberFormats.set(key, format);
  }
  return format;
}

const MINUS = '−';

export function formatCurrency(value: number, currency = DEFAULT_CURRENCY, decimals = 2) {
  return numberFormat(`cur-${currency}-${decimals}`, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(value)
    .replace('-', MINUS);
}

/** £19.3K, £1.2M — for axis ticks and dense summaries. */
export function formatCompactCurrency(value: number, currency = DEFAULT_CURRENCY) {
  return numberFormat(`cmp-${currency}`, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/** +£3,200.00 / −£84.35 */
export function formatSignedCurrency(value: number, currency = DEFAULT_CURRENCY) {
  const sign = value > 0 ? '+' : value < 0 ? MINUS : '';
  return `${sign}${formatCurrency(Math.abs(value), currency)}`;
}

export function formatPercent(fraction: number, digits = 0) {
  return numberFormat(`pct-${digits}`, {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(fraction);
}

/** +5.8% / −2.3% */
export function formatSignedPercent(fraction: number, digits = 1) {
  const sign = fraction > 0 ? '+' : fraction < 0 ? MINUS : '';
  return `${sign}${formatPercent(Math.abs(fraction), digits)}`;
}

export function formatNumber(value: number) {
  return numberFormat('num', { maximumFractionDigits: 0 }).format(value);
}

export type ValueFormat = 'currency' | 'compactCurrency' | 'percent' | 'number';

export function formatValue(value: number, format: ValueFormat = 'currency', currency = DEFAULT_CURRENCY) {
  switch (format) {
    case 'compactCurrency':
      return formatCompactCurrency(value, currency);
    case 'percent':
      return formatPercent(value, 1);
    case 'number':
      return formatNumber(value);
    default:
      return formatCurrency(value, currency, 0);
  }
}

// ---- Dates ---------------------------------------------------------------

const DATE_STYLES = {
  short: { day: 'numeric', month: 'short' },
  medium: { day: 'numeric', month: 'short', year: 'numeric' },
  long: { day: 'numeric', month: 'long', year: 'numeric' },
  weekday: { weekday: 'short', day: 'numeric', month: 'short' },
  weekdayLong: { weekday: 'long', day: 'numeric', month: 'long' },
  monthYear: { month: 'long', year: 'numeric' },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export type DateStyle = keyof typeof DATE_STYLES;

/** Parses a YYYY-MM-DD string as a UTC date so the calendar day never shifts. */
export function parseDate(iso: string) {
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`);
}

export function formatDate(iso: string, style: DateStyle = 'medium') {
  let format = dateFormats.get(style);
  if (!format) {
    format = new Intl.DateTimeFormat(LOCALE, { ...DATE_STYLES[style], timeZone: 'UTC' });
    dateFormats.set(style, format);
  }
  return format.format(parseDate(iso));
}

const DAY_MS = 86_400_000;

/** Whole days from `from` to `to` (positive when `to` is later). */
export function daysBetween(from: string, to: string) {
  return Math.round((parseDate(to).getTime() - parseDate(from).getTime()) / DAY_MS);
}

/** "Today", "Yesterday", "Tomorrow", "In 4 days", "3 days ago" relative to the mock TODAY. */
export function formatRelativeDay(iso: string, today = TODAY) {
  const diff = daysBetween(today, iso);
  if (diff === 0) return 'Today';
  if (diff === -1) return 'Yesterday';
  if (diff === 1) return 'Tomorrow';
  if (diff > 1 && diff < 7) return `In ${diff} days`;
  if (diff < -1 && diff > -7) return `${Math.abs(diff)} days ago`;
  return formatDate(iso, 'short');
}

/** Label for a group of transactions in a date-grouped list. */
export function formatDayHeading(iso: string, today = TODAY) {
  const diff = daysBetween(today, iso);
  if (diff === 0) return 'Today';
  if (diff === -1) return 'Yesterday';
  return formatDate(iso, 'weekdayLong');
}
