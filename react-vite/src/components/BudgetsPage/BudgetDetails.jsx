
import { useLoaderData, useNavigate } from "react-router-dom";

export default function BudgetDetails() {
  const budget = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const res = await fetch(`/api/budgets/${budget.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (res.ok) {
      navigate('/'); // Redirect to the budgets page after successful deletion
    } else {
      alert("Failed to delete budget");
    }
  };

  return (
    <div>
      <h1>{budget.name}</h1>
      <p>Allocated: {budget.allocated}</p>
      <p>Start Date: {budget.start_date}</p>
      <p>End Date: {budget.end_date || 'N/A'}</p>
      <p>Icon: {budget.icon}</p>

      <button onClick={() => navigate(`/budgets/${budget.id}/edit`)}>Edit Budget</button>
      <button onClick={handleDelete}>Delete Budget</button>
    </div>
  );
}