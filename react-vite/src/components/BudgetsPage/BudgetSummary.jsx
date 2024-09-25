import { Link, useLoaderData } from "react-router-dom";

export default function BudgetsPage() {
  const { Budgets } = useLoaderData();

  if (!Budgets) return <p>No budgets found.</p>;

  return (
    <div>
      <h1>My Budgets</h1>
      <Link to="/budgets/new">Create New Budget</Link>
      <ul>
        {Budgets.map(budget => (
          <li key={budget.id}>
            <Link to={`/budgets/${budget.id}`}>{budget.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}