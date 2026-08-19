import { formatDate } from "@shared/lib/utils";

export const formatRelativeTime = (timestamp: number): string => {
  const diff = Date.now() / 1000 - timestamp;

  if (diff < 60) return "только что";
  if (diff < 3600) return `${Math.floor(diff / 60)} мин. назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч. назад`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} дн. назад`;
  return formatDate(timestamp);
};
