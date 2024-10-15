import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './BudgetsForm.css';

export default function BudgetForm() {
  const [name, setName] = useState('');
  const [allocated, setAllocated] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const user = useSelector(state => state.session.user);
  const [icon, setIcon] = useState('');
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`/api/budgets/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name);
          setAllocated(data.allocated);

          // Convert date to yyyy-MM-dd format
          const formattedStartDate = new Date(data.start_date)
            .toISOString()
            .split('T')[0];
          const formattedEndDate = data.end_date
            ? new Date(data.end_date).toISOString().split('T')[0]
            : '';

          setStartDate(formattedStartDate);
          setEndDate(formattedEndDate);
          setIcon(data.icon);
        });
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Budget name is required.';
    if (!allocated || isNaN(allocated) || allocated <= 0)
      newErrors.allocated = 'Allocated amount must be a positive number.';
    if (!startDate) newErrors.startDate = 'Start date is required.';
    if (endDate && new Date(startDate) > new Date(endDate))
      newErrors.endDate = 'End date must be after the start date.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return; // If form is invalid, exit the function

    const budgetData = {
      name,
      allocated: allocated * 100,
      start_date: startDate,
      user_id: user.id,
      icon,
    };

    if (endDate) budgetData.end_date = endDate;

    if (id) {
      // Edit existing budget
      const res = await fetch(`/api/budgets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
      });
      if (res.ok) navigate(`/budgets/${id}`);
    } else {
      // Create new budget
      const res = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
      });
      if (res.ok) {
        const newBudget = await res.json();
        navigate(`/budgets/${newBudget.id}`);
      }
    }
  };

  return (
    <>
      <h1 className='budget-form-title center'>
        {id ? 'Edit Budget' : 'Create Budget'}
      </h1>
      <form onSubmit={handleSubmit} className='budget-form'>
        <input
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Budget Name'
          className='budget-form-input'
        />
        <p className='error'>{errors.name}</p>

        <input
          name='allocated'
          type='number'
          value={allocated}
          onChange={e => setAllocated(e.target.value)}
          placeholder='Allocated Amount'
          className='budget-form-input'
        />
        <p className='error'>{errors.allocated}</p>

        <input
          name='startDate'
          type='date'
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className='budget-form-input'
        />
        <p className='error'>{errors.startDate}</p>

        <input
          name='endDate'
          type='date'
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className='budget-form-input'
        />
        <p className='error'>{errors.endDate}</p>

        <input
          name='icon'
          value={icon}
          onChange={e => setIcon(e.target.value)}
          placeholder='Icon'
          className='budget-form-input'
        />

        <button type='submit' className='budget-form-submit-btn'>
          {id ? 'Update' : 'Create'} Budget
        </button>
      </form>
    </>
  );
}
