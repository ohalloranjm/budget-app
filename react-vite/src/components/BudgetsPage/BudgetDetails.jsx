import { useLoaderData, useNavigate } from "react-router-dom";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month}/${day < 10 ? '0' : ''}${day}/${year}`;
}

function dollarString(money) {
  let [dollars, cents] = String(money).split('.');
  cents = cents ?? '00';
  if (!(cents.length - 1)) cents += '0';
  return `$${dollars}.${cents}`;
}

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

  return (
    <div>
      <h1>{budget.name}</h1>
      <p>Allocated: {dollarString(budget.allocated)}</p>
      <p>Start Date: {formatDate(budget.start_date)}</p>
      {budget.end_date && <p>End Date: {formatDate(budget.end_date) || 'N/A'}</p>}
      <p>Icon: {budget.icon}</p>

      <div className="buttons_budgets_detail">
      <button onClick={() => navigate(`/budgets/${budget.id}/edit`)}>Edit Budget</button>
      <button onClick={() => handleDelete(budget.id)}>Delete</button>
      </div>
    
      {/* Transactions */}
      <h2>Transactions</h2>
      {budget.transactions.length > 0 ? (
        <ul>
          {budget.transactions.map(transaction => (
            <li key={transaction.id}>
              <p>{transaction.name}</p>
              <p>Amount: {dollarString(transaction.amount)}</p>
              <p>Date: {formatDate(transaction.date)}</p>
              <p>Description: {transaction.description || '—'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions associated with this budget.</p>
      )}
    </div>
  );
}