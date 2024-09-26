import { useLoaderData } from "react-router-dom";
import BudgetSummaryTile from "./BudgetSummaryTile";

export default function BudgetSummary() {
    const { Budgets } = useLoaderData()

    const currentBudgets = Budgets.filter(b => !b.end_date || new Date(b.end_date) > new Date())
    console.log('my data:', currentBudgets);
    return <>
    {currentBudgets.map(b => <BudgetSummaryTile key={b.id} budget={b} />)}
    </>
}