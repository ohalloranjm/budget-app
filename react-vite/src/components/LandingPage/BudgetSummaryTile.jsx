import dollarString from "../../utils/dollar-string"
import redIf from "../../utils/red-if"

export default function BudgetSummaryTile({budget, transactions}) {

    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0)

    return <div className="budget-summary-tile">
        <div className="bst-name">{budget.name}</div>
        <div className={redIf(totalSpent > budget.allocated, "bst-spent")}>{dollarString(totalSpent)}</div>
        <div className="center">/</div>
        <div className="bst-allocated">{dollarString(budget.allocated)}</div>
    </div>
}