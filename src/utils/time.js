export function getMonthAndYear(date) {
  if (date) {
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    return { month, year };
  }
}

export function doFormatDate(date) {
  if (!date) {
    return;
  } else if (typeof date === "number") {
    return getDateFromTimestamp(date);
  } else if (typeof date === "object") {
    return getDateFromTimestamp(date.seconds);
  }
}

export const months = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC"
];

export const getTimestampFromDate = date => {
  return date ? Math.round(date.getTime() / 1000) : null;
};

export const getDateFromTimestamp = timestamp => new Date(timestamp * 1000);

export function getMaxDayOfMonth(date) {
  const { month, year } = getMonthAndYear(date);
  return new Date(year, month + 1, 0);
}

export function getMinDayOfMonth(date) {
  const { month, year } = getMonthAndYear(date);
  return new Date(year, month, 1);
}
