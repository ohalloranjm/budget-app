// format a date for user-facing components
// date object should have 0 hours and 0 seconds to avoid timezone problems
export default function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month}/${day < 10 ? '0' : ''}${day}/${year}`;
}

// format a date object so that it can be read by an HTML form
// date object should have 0 hours 0 seconds to avoid timezone problems
export function formatDateInternal(date) {
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  if (month < 10) month = '0' + month;
  let day = date.getUTCDate();
  if (day < 10) day = '0' + day;
  return `${year}-${month}-${day}`;
}

// returns a string for today's date calculated locally
// that can be read by an HTML form
export function todayInternal() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let day = date.getDate();
  if (day < 10) day = '0' + day;
  return `${year}-${month}-${day}`;
}
