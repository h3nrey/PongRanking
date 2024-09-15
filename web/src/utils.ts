export function formatDatetimeToDDMMYYY(date: string) {
  const days = date.slice(8, 10);
  const month = date.slice(5, 7);
  const year = date.slice(0, 4);
  const formatedDate = [days, month, year].join("/");
  return formatedDate;
}
