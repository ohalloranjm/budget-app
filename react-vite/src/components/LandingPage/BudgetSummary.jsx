import { useLoaderData } from "react-router-dom";
import BudgetSummaryTile from "./BudgetSummaryTile";

export default function BudgetSummary() {
    const [{Budgets}, {Transactions}] = useLoaderData()
    const now = new Date()
    const currentBudgets = Budgets.filter(b => !b.end_date || new Date(b.end_date) > now)
    const currentTransactions = Transactions.filter(t => {
        const [month, year] = [now.getMonth(), now.getFullYear()]
        const tDate = new Date(t.date)
        const [tMonth, tYear] = [tDate.getMonth(), tDate.getFullYear()]
        return month === tMonth && year === tYear
    })

    return <>
        {currentBudgets.map(b => <BudgetSummaryTile key={b.id} budget={b} transactions={currentTransactions.filter(t => t.Budget.id === b.id)} />)}
    </>
}