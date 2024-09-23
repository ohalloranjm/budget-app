// format a date for user-facing components
export default function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day < 10 ? '0' : ''}${day}/${year}`;
}

// format a date object so that it can be read by an HTML form
export function formatDateInternal(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let day = date.getDate();
  if (day < 10) day = '0' + day;
  return `${year}-${month}-${day}`;
}
