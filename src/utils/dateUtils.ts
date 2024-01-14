import {parseISO, differenceInSeconds, format} from 'date-fns';

function formatRelative(dateISO: string): string {
  const date = parseISO(dateISO);
  const now = new Date();

  const diffInSeconds = differenceInSeconds(now, date);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} s`;
  }
  const diffMinutes = Math.round(diffInSeconds / 60);

  if (diffMinutes < 60) {
    return `${diffMinutes} m`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} h`;
  }

  const diffInDays = Math.floor(diffHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} d`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} sem`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} mês`;
  }

  return format(date, 'dd/MM/yyyy');
}
export const dateUtils = {
  formatRelative,
};
