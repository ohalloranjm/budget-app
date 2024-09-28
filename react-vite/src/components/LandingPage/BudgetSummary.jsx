import { Link, useLoaderData, useSubmit } from "react-router-dom";
import BudgetSummaryTile from "./BudgetSummaryTile";
import dollarString from "../../utils/dollar-string"
import redIf from "../../utils/red-if"
import BudgetChart from "./BudgetChart";
import { useEffect, useState } from "react";

export default function BudgetSummary() {
    const [{Budgets}, {Transactions}] = useLoaderData()
    const now = new Date()
    const currentBudgets = Budgets?.filter(b => (new Date(b.start_date) < now) && (!b.end_date || (new Date(b.end_date) > now)))
    const currentTransactions = Transactions?.filter(t => {
        const [month, year] = [now.getMonth(), now.getFullYear()]
        const tDate = new Date(t.date)
        const [tMonth, tYear] = [tDate.getMonth(), tDate.getFullYear()]
        return month === tMonth && year === tYear
    })
    const submit = useSubmit()
    useEffect(() => {
        submit()
    }, [])

    const totalSpent = currentTransactions?.reduce((sum, t) => sum + t.amount, 0)
    const totalBudgeted = currentBudgets?.reduce((sum, b) => sum + b.allocated, 0)

    if (Budgets && Transactions) {
        return <>
        <h1 className={redIf(totalSpent > totalBudgeted, "center")}>{dollarString(totalSpent)} / <span className="secondary-dark">{dollarString(totalBudgeted)}</span></h1>
        <h2 className="center">{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][now.getMonth()]} {now.getFullYear()}</h2>
        <div className="budget-summary">
            <div className="bs-text">
                {!currentBudgets.length && <Link className="secondary-dark" to="/budgets/new">No budgets active for this month. Create a budget to get started.</Link>}
                {currentBudgets.map(b => <BudgetSummaryTile key={b.id} budget={b} transactions={currentTransactions?.filter(t => t.Budget.id === b.id)} />)}
            </div>
            <BudgetChart totalBudgeted={totalBudgeted} transactions={currentTransactions} now={now} />
        </div>
        </>
        } else {
            return null
        }
}