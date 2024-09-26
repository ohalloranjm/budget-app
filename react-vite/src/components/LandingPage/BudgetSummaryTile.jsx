export default function BudgetSummaryTile({budget, transactions}) {
    return <div className="budget-summary-tile">
        <div className="bst-name">{budget.name}</div>
        <div className="bst-money">
            <span className="bst-spent">{transactions.reduce((sum, t) => sum + t.amount, 0)}</span>
            /
            <span className="bst-allocated">{budget.allocated}</span>
        </div>
    </div>
}