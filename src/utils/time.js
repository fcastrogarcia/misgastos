export function getMonthAndYear(date) {
  if (date) {
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    return { month, year };
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

export const currTimestamp = Math.round(new Date().getTime() / 1000);

export const getDateFromTimestamp = timestamp => new Date(timestamp * 1000);
