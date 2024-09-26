import { useLoaderData } from "react-router-dom";

export default function BudgetSummary() {
    const { Budgets } = useLoaderData()

    const currentBudgets = Budgets.filter(b => !b.end_date || new Date(b.end_date) > new Date())
    console.log('my data:', currentBudgets);
    return <p>its a me, your data</p>
}