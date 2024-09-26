export default function BudgetSummaryTile({budget}) {
    return <div className="budget-summary-tile">
        <div className="bst-name">{budget.name}</div>
        <div className="bst-money">
            <span className="bst-spent">?</span>
            /
            <span className="bst-allocated">{budget.allocated}</span>
        </div>
    </div>
}