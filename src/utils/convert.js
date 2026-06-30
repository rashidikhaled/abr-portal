export function toPersianDate(date) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export function formatMoney(value) {
  if (value === null || value === undefined || value === "") return "-";

  return Number(value).toLocaleString("fa-IR");
}