import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import './BudgetsForm.css'

export default function BudgetForm() {
  const [name, setName] = useState('');
  const [allocated, setAllocated] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const user = useSelector((state) => state.session.user);
  const [icon, setIcon] = useState('');
  const { id } = useParams(); // Get budget id for editing budget
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch budget data if editing
      fetch(`/api/budgets/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name);
          setAllocated(data.allocated);
          setStartDate(data.start_date);
          setEndDate(data.end_date || '');
          setIcon(data.icon);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const budgetData = { name, allocated, start_date: startDate, end_date: endDate, user_id: user.id, icon };

    if (id) {
      // Edit existing budget
      const res = await fetch(`/api/budgets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(budgetData)
      });
      if (res.ok) navigate(`/budgets/${id}`);
    } else {
      // Create new budget
      const res = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(budgetData)
      });
      if (res.ok) {
        const newBudget = await res.json();
        navigate(`/budgets/${newBudget.id}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="budget-form"
    >
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Budget Name"
        required
      />
      <input
        name="allocated"
        type="number"
        value={allocated}
        onChange={(e) => setAllocated(e.target.value)}
        placeholder="Allocated Amount"
        required
      />
      <input
        name="startDate"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        name="endDate"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input
        name="icon"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        placeholder="Icon"
      />
      <button type="submit">{id ? "Update" : "Create"} Budget</button>
    </form>

  );
}