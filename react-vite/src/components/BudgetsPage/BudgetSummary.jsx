import { useSubmit, Link } from "react-router-dom";

export default function BudgetSummary({ budget }) {
    const submit = useSubmit();

    function deleteBudget(e) {
        e.preventDefault();
        submit({ id: budget.id }, { method: 'delete', encType: 'application/json' });
    }

    return (
        <div className="budget-summary-tile">
            <h3>{budget.name}</h3>
            <p>Allocated: ${budget.allocated}</p>
            <p>Start Date: {new Date(budget.start_date).toLocaleDateString()}</p>
            {budget.end_date && <p>End Date: {new Date(budget.end_date).toLocaleDateString()}</p>}
            <button onClick={deleteBudget}>Delete</button>
            <Link to={`/budgets/${budget.id}`}>View Details</Link>
        </div>
    );
}