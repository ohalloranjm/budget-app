import React, { useState } from "react";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import "./SaveGoalForm.css";
import toCents from "../../utils/to-cents";

function SaveGoalsForm({ edit }) {
  const submit = useSubmit();
  const data = edit ? useLoaderData() : {};
  const [name, setName] = useState(edit ? data.name : "");
  const [cost, setCost] = useState(edit ? data.cost / 100 : 0);
  const [description, setDescription] = useState(edit ? data.description : "");
  const [endDate, setEndDate] = useState(
    edit
      ? new Date(data.end_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [icon, setIcon] = useState(edit ? data.icon : "");
  const [errors, setErrors] = useState({});
  const validateData = (data) => {
    const validationErrors = {};
    if (!data.name) {
      validationErrors.name = "This field is required";
    }
    if (data.name.length > 50) {
      validationErrors.name = "This field must be less than 50 chars";
    }
    if (new Date(endDate).getTime() < new Date().getTime()) {
      validationErrors.date = "End date cannot be before the current date";
    }

    console.log(Object.keys(validationErrors), validationErrors);
    return Object.keys(validationErrors).length > 0 ? validationErrors : false;
  };

  const post = (e) => {
    e.preventDefault();
    const saveGoal = {
      name,
      cost: toCents(cost),
      end_date: endDate,
      description,
      icon,
    };
    const validationErrors = validateData(saveGoal);
    if (validationErrors) {
      return setErrors({ ...validationErrors });
    } else
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
    const validationErrors = validateData(saveGoal);
    if (validationErrors) {
      return setErrors({ ...validationErrors });
    } else submit({ saveGoal }, { method: "PUT", encType: "application/json" });
  };

  return (
    <div className="save-goals-form-container">
      <form className="save-goals-form" onSubmit={edit ? put : post}>
        <h2 className="secondary-dark">
          {edit ? "Update a Tempalte" : "Create a New Template"}
        </h2>
        <p>Name</p>
        {errors.name && <p className="alert-text">{errors.name}</p>}
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
        {errors.date && <p className="alert-text">{errors.date}</p>}
        <input
          id="save-goal-due-date"
          type="date"
          placeholder="Due Date"
          onInput={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
        {/* <p>Icon link</p>
        <input
          id="save-goal-icon"
          type="text"
          placeholder="icon"
          onInput={(e) => setIcon(e.target.value)}
          value={icon}
        /> */}
        <button type="submit" className="dark">
          {edit ? "Update Save Goal" : "Create Save Goal"}
        </button>
      </form>
    </div>
  );
}

export default SaveGoalsForm;
