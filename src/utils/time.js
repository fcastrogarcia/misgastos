export function getCurrentTime() {
  const date = new Date();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return { month, year };
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

// export const completeMonths = {
//   'Enero',
//   'Febrero',
//   'Marzo',
//   'Abril'
// }

