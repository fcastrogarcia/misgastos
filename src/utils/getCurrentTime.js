export function getCurrentTime() {
  const date = new Date();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return { month, year };
}
