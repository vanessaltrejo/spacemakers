/** Small display helpers shared by the dashboard views. */

export function textValue(value: unknown, fallback = 'Sin definir') {
  return value === null || value === undefined || value === '' ? fallback : String(value);
}

export function shortDate(value: unknown) {
  if (!value) return 'Sin fecha';
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

export function asPercent(value: unknown) {
  const number = Number(value ?? 0);
  return Math.round(number <= 1 ? number * 100 : number);
}

/** "02 oct": day and month only, for tight spaces. */
export function shortDayMonth(value: unknown) {
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value ?? '');
  const day = String(date.getDate()).padStart(2, '0');
  const month = new Intl.DateTimeFormat('es-MX', { month: 'short' }).format(date).replace('.', '');
  return `${day} ${month}`;
}
