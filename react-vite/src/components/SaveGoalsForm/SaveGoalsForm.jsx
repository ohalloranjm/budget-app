import React, { useState } from "react";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import "./SaveGoalForm.css";
import toCents from "../../utils/to-cents";

function SaveGoalsForm({ edit }) {
  const submit = useSubmit();
  const data = edit ? useLoaderData() : {};
  const [name, setName] = useState(data.name || "");
  const [cost, setCost] = useState(data.cost || 0);
  const [description, setDescription] = useState(data.description || "");
  const [endDate, setEndDate] = useState(
    new Date(data.end_date).toISOString().split("T")[0] ||
      new Date().toISOString().split("T")[0]
  );
  console.log(data.end_date);
  const [icon, setIcon] = useState(data.icon || "");

  const post = (e) => {
    e.preventDefault();
    const saveGoal = {
      name,
      cost: toCents(cost),
      end_date: endDate,
      description,
      icon,
    };
    submit({ saveGoal }, { method: "post", encType: "application/json" });
  };

  const put = (e) => {
    e.preventDefault();
    const saveGoal = {
      name,
      cost: toCents(cost),
      end_date: endDate,
      description,
      icon,
    };
    submit({ saveGoal }, { method: "PUT", encType: "application/json" });
    console.log("heyyy");
  };

  return (
    <div className="save-goals-form-container">
      <form className="save-goals-form" onSubmit={put}>
        <p>Name</p>
        <input
          id="save-goal-name"
          type="text"
          placeholder="Name"
          onInput={(e) => setName(e.target.value)}
          value={name}
        />
        <p>Description</p>
        <textarea
          id="save-goal-desc"
          type="textarea"
          placeholder="Description"
          onInput={(e) => setDescription(e.target.value)}
          value={description}
        />
        <p>Cost</p>
        <input
          id="save-goal-cost"
          type="number"
          placeholder="Cost"
          onInput={(e) => setCost(e.target.value)}
          value={Math.floor(cost * 100) / 100}
        />
        <p>Due Date</p>
        <input
          id="save-goal-due-date"
          type="date"
          placeholder="Due Date"
          onInput={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
        <p>Icon link</p>
        <input
          id="save-goal-icon"
          type="text"
          placeholder="icon"
          onInput={(e) => setIcon(e.target.value)}
          value={icon}
        />
        <button type="submit">
          {edit ? "Update Save Goal" : "Create Save Goal"}
        </button>
      </form>
    </div>
  );
}

export default SaveGoalsForm;
