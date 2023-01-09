import dayjs from "dayjs";

export const trimDate = (
  dateString: string | number | null,
  trimDateTo: dayjs.OpUnitType
): dayjs.Dayjs => dayjs(dateString).startOf(trimDateTo);

export const convertToEpochTime = (date: dayjs.Dayjs): number => +date;
