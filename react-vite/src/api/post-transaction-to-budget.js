import { redirect } from 'react-router-dom';

export default async function postTransactionToBudget({ request: req }) {
  const { budgetName, transaction } = await req.json();
  const body = JSON.stringify(transaction);
  const res = await fetch(`/api/budgets/${budgetName}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  if (res.ok) return redirect('/transactions');
  return await res.json();
}
