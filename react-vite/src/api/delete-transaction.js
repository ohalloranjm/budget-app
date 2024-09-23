export default async function deleteTransaction({ request: req }) {
  if (req.method?.toLowerCase() === 'delete') {
    const { id } = await req.json();
    const res = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  }
}
