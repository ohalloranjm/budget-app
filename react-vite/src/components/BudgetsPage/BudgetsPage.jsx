import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import format from "date-fns/format";
import "./BudgetPage.css";

function dollarString(money) {
  let [dollars, cents] = String(money).split(".");
  cents = cents ?? "00";
  if (!(cents.length - 1)) cents += "0";
  return `$${dollars}.${cents}`;
}

export default function BudgetsPage() {
  const { Budgets } = useLoaderData();

  const [selectedMonth, setSelectedMonth] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setIsFiltered(true);
  };

  const displayAllBudgets = () => {
    setSelectedMonth("");
    setIsFiltered(false);
  };

  const filteredBudgets = Budgets.filter((budget) => {
    if (!selectedMonth) return true;
    const startDate = new Date(budget.start_date);
    const budgetMonth = format(startDate, "yyyy-MM");
    return budgetMonth === selectedMonth;
  });

  if (!Budgets) return <p className="no-budgets">No budgets found.</p>;

  return (
    <div className="budgets-page">
      <Link to="/budgets/new" className="create-new-budget">
        Create New Budget
      </Link>

      <h1 className="page-title">My Budgets</h1>

      <div className="filter-by-month">
        <label htmlFor="month-select" className="month-label">Filter by Month:</label>
        <input
          type="month"
          id="month-select"
          className="month-input"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>

      <ul className="budget-list">
        {filteredBudgets.length > 0 ? (
          filteredBudgets.map((budget) => (
            <li key={budget.id} className="budget-item">
              <Link to={`/budgets/${budget.id}`} className="budget-link">{budget.name}</Link>
              <p className="budget-amount">{dollarString(budget.allocated)}</p>
            </li>
          ))
        ) : (
          <p className="no-budgets-found">No budgets found for this month.</p>
        )}
      </ul>

      {isFiltered && (
        <button className="display-all-budgets-btn" onClick={displayAllBudgets}>
          Display All Budgets
        </button>
      )}
    </div>
  );
}