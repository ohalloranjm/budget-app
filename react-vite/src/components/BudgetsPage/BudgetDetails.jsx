import { useLoaderData, useNavigate } from "react-router-dom";
import "./BudgetPage.css";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month}/${day < 10 ? "0" : ""}${day}/${year}`;
}

function dollarString(money) {
  let [dollars, cents] = String(money).split(".");
  cents = cents ?? "00";
  if (!(cents.length - 1)) cents += "0";
  return `$${dollars}.${cents}`;
}

export default function BudgetDetails() {
  const budget = useLoaderData();
  const navigate = useNavigate();

  function calculateRollover(budget) {
    const currentPeriodSpend = budget.transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    const rollover = budget.allocated - currentPeriodSpend;
    return rollover;
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget?"
    );
    if (!confirmDelete) {
      return;
    }
    const res = await fetch(`/api/budgets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      navigate("/budgets/");
    } else {
      alert("Failed to delete budget");
    }
  };

  return (
    <div className="budget-details">
      <h1 className="budget-name">{budget.name}</h1>
      <p className="budget-allocated">
        Allocated: {dollarString(budget.allocated)}
      </p>
      <p className="budget-start-date">
        Start Date: {formatDate(budget.start_date)}
      </p>
      {budget.end_date && (
        <p className="budget-end-date">
          End Date: {formatDate(budget.end_date) || "N/A"}
        </p>
      )}
      <p className="budget-icon">Icon: {budget.icon}</p>

      <div className="buttons-budget-detail">
        <button
          className="edit-budget-btn"
          onClick={() => navigate(`/budgets/${budget.id}/edit`)}
        >
          Edit Budget
        </button>
        <button
          className="delete-budget-btn"
          onClick={() => handleDelete(budget.id)}
        >
          Delete
        </button>
      </div>

      <h2 className="transactions-title">Transactions</h2>
      {budget.transactions?.length > 0 ? (
        <ul className="transactions-list">
          {budget.transactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <p className="transaction-name">{transaction.name}</p>
              <p className="transaction-amount">
                Amount: {dollarString(transaction.amount)}
              </p>
              <p className="transaction-date">
                Date: {formatDate(transaction.date)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-transactions-message">
          No transactions associated with this budget.
        </p>
      )}
      <div>
        {/* Display balance value */}
        {budget.transactions && calculateRollover(budget) !== null && (
          <p className="budget-rollover">
            Balance: {dollarString(calculateRollover(budget))}
          </p>
        )}
      </div>

      <div className="go-to-budgets">
        <button
          className="go-to-budgets-btn"
          onClick={() => navigate("/budgets")}
        >
          Go to Budgets List
        </button>
      </div>
    </div>
  );
}
