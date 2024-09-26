import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import format from "date-fns/format";
import "./BudgetPage.css";

function dollarString(money) {
    let [dollars, cents] = String(money).split('.');
    cents = cents ?? '00';
    if (!(cents.length - 1)) cents += '0';
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

  // Filter budgets by selected month
  const filteredBudgets = Budgets.filter((budget) => {
    if (!selectedMonth) return true; // If no month is selected, show all budgets
    const startDate = new Date(budget.start_date);
    const budgetMonth = format(startDate, "yyyy-MM");
    return budgetMonth === selectedMonth;
  });

  if (!Budgets) return <p>No budgets found.</p>;

  return (
    <div>
      
      <Link to="/budgets/new">Create New Budget</Link>

      <h1>My Budgets</h1>
      
      {/* Month Filter */}
      <div className="filterbymonth">
        <label htmlFor="month-select">Filter by Month:</label>
      <input
        type="month"
        id="month-select"
        value={selectedMonth}
        onChange={handleMonthChange}
      />
      </div>

      <ul>
        {filteredBudgets.length > 0 ? (
          filteredBudgets.map((budget) => (
            <li key={budget.id}>
              <Link to={`/budgets/${budget.id}`}>{budget.name}</Link>
              <p>
                {dollarString(budget.allocated)}
              </p>
            </li>
          ))
        ) : (
          <p className="error-message">No budgets found for this month.</p>
        )}
      </ul>

      {/* Display All Budgets Button */}
      {isFiltered && (
        <button onClick={displayAllBudgets}>
          Display All Budgets
        </button>
      )}

    </div>
  );
}