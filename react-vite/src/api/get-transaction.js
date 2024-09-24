export default async function getTransaction({ request: req }) {
  const { transactionId } = await req.json();
  const res = await fetch(`/api/transactions/${transactionId}`);
  return await res.json();
}
