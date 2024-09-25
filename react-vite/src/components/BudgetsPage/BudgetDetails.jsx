import { useLoaderData, useNavigate } from "react-router-dom";

export default function BudgetDetails() {
  const budget = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this budget?");

    if (!confirmDelete) {
      return; 
    }

    const res = await fetch(`/api/budgets/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (res.ok) {
      navigate('/budgets/');
    } else {
      alert("Failed to delete budget");
    }
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day < 10 ? '0' : ''}${day}/${year}`;
  }

  return (
    <div>
      <h1>{budget.name}</h1>
      <p>Allocated: {budget.allocated}</p>
      <p>Start Date: {formatDate(budget.start_date)}</p>
      {budget.end_date && <p>End Date: {formatDate(budget.end_date) || 'N/A'}</p>}
      <p>Icon: {budget.icon}</p>

      <button onClick={() => navigate(`/budgets/${budget.id}/edit`)}>Edit Budget</button>
      <button onClick={() => handleDelete(budget.id)}>Delete</button>
    </div>
  );
}