export function doFormatDate(timestamp) {
  if (timestamp && typeof timestamp === "number") {
    const date = new Date(timestamp * 1000);

    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  } else {
    return "-";
  }
}

export function doFormatMonthAndYear(time) {
  const { month: zeroBasedMonth, year } = time;
  let month = zeroBasedMonth + 1;

  month = month < 10 ? `0${month}` : month;

  return `${month}/${year}`;
}

export const doFormatEmptyFields = value => (!value ? "-" : value);
