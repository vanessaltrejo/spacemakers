const shortFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "06 oct 2026" */
export const formatShortDate = (isoDate: string): string => shortFormatter.format(new Date(isoDate));
