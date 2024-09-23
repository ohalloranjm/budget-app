export default async function getBudgets() {
  let res = await fetch('/api/budgets');
  if (res.ok) {
    return await res.json();
  }
  return false;
}
