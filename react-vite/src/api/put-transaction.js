import { redirect } from 'react-router-dom';

export default async function putTransaction({ request: req, params }) {
  const transaction = await req.json();
  const { transactionId } = params;
  const body = JSON.stringify(transaction);
  const res = await fetch(`/api/transactions/${transactionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (res.ok) return redirect('/transactions');
  return await res.json();
}
