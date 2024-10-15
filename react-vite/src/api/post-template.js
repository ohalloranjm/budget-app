import { redirect } from 'react-router-dom';

export default async function postTemplate({ request: req }) {
  const { template, budgets } = await req.json();
  const body1 = JSON.stringify(template);
  const res1 = await fetch(`/api/templates/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body1,
  });
  const data = await res1.json();
  if (Object.values(budgets).length) {
    const body2 = JSON.stringify(budgets);
    await fetch(`/api/templates/` + data.id + '/budgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body2,
    });
  }

  if (res1.ok) return redirect('/templates/' + data.id);
  return await res1.json();
}
