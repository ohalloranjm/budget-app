import { useLoaderData, useSubmit, Link } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BudgetSummary from "./BudgetSummary";

export default function BudgetsPage() {
    const user = useSelector(store => store.session.user);
    const { Budgets } = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        submit();  
    }, [user, submit]);

    if (!Budgets) return <p>No budgets available.</p>;

    return (
        <div>
            <h1>My Budgets</h1>
            <Link to="/budgets/new">Create New Budget</Link>
            {Budgets.map(budget => (
                <BudgetSummary key={budget.id} budget={budget} />
            ))}
        </div>
    );
}