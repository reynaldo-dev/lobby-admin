export function getFormattedDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  });
}
