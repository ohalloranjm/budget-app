export default async function getTransaction({ params }) {
  const { transactionId } = params;
  const res = await fetch(`/api/transactions/${transactionId}`);
  if (res.ok) return await res.json();
  throw await res.json();
}
