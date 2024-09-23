export default async function getTransactions() {
  const res = await fetch('/api/transactions');
  const data = await res.json();
  if (res.ok) return data;
  return false;
}
