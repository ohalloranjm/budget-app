export default async function getTransaction({ params }) {
  const { transactionId } = params;
  const res = await fetch(`/api/transactions/${transactionId}`);
  return await res.json();
}
