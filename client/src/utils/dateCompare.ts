import { compareAsc } from "date-fns";

export function isExpired(date: string | undefined) {
  if (!date) return false;

  const today = new Date();
  const expireDate = new Date(date);
  const result = compareAsc(today, expireDate);

  return result === 1;
}
