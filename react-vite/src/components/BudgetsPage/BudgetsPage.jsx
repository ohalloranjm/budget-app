import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import './BudgetPage.css';

function dollarString(money) {
  let [dollars, cents] = String(money).split('.');
  cents = cents ?? '00';
  if (!(cents.length - 1)) cents += '0';
  return `$${dollars}.${cents}`;
}

export default function BudgetsPage() {
  const { Budgets } = useLoaderData();
  console.log(Budgets);

  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthStart, setMonthStart] = useState('');
  const [monthEnd, setMonthEnd] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  console.log('selectedMonth', selectedMonth);
  console.log('monthStart', monthStart);
  console.log('monthEnd', monthEnd);

  const handleMonthChange = e => {
    const { value } = e.target;
    setSelectedMonth(value);
    const year = +value.slice(0, 4);
    const month = +value.slice(5) - 1;
    setMonthStart(Date.UTC(year, month));
    setMonthEnd(Date.UTC(year, month + 1));
    setIsFiltered(true);
  };

  const displayAllBudgets = () => {
    setSelectedMonth('');
    setMonthStart('');
    setMonthEnd('');
    setIsFiltered(false);
  };

  const filteredBudgets = Budgets.filter(budget => {
    if (!selectedMonth) return true;
    const budgetStart = new Date(budget.start_date);
    const budgetEnd = budget.end_date ? new Date(budget.end_date) : null;
    if (budgetEnd && budgetEnd < monthStart) return false;
    if (budget.id === 5)
      console.log(
        'budgetStart',
        budgetStart,
        '\n',
        'monthEnd',
        monthEnd,
        '\n',
        budgetStart === monthEnd
      );
    if (budgetStart >= monthEnd) return false;
    return true;
  });

  if (!Budgets) return <p className='no-budgets'>No budgets found.</p>;

  return (
    <div className='budgets-page'>
      <Link to='/budgets/new' className='create-new-budget'>
        Create New Budget
      </Link>

      <h1 className='page-title'>My Budgets</h1>

      <div className='filter-by-month'>
        <label htmlFor='month-select' className='month-label'>
          Filter by Month:
        </label>
        <input
          type='month'
          id='month-select'
          className='month-input'
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>

      <ul className='budget-list'>
        {filteredBudgets.length > 0 ? (
          filteredBudgets.map(budget => (
            <li key={budget.id} className='budget-item'>
              <Link to={`/budgets/${budget.id}`} className='budget-link'>
                {budget.name}
              </Link>
              <p className='budget-amount'>{dollarString(budget.allocated)}</p>
            </li>
          ))
        ) : (
          <p className='no-budgets-found'>No budgets found for this month.</p>
        )}
      </ul>

      {isFiltered && (
        <button className='display-all-budgets-btn' onClick={displayAllBudgets}>
          Display All Budgets
        </button>
      )}
    </div>
  );
}
