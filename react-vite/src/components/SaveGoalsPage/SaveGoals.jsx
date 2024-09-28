import React from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";

function SaveGoals() {
  const navigate = useNavigate();
  const saveGoals = useLoaderData() || [{ name: "uh", cost: "oh" }];
  console.log(saveGoals["Save Goals"]);
  return (
    <div className="save-goals">
      <button onClick={() => navigate("/save-goals/new")}>New</button>
      {saveGoals["Save Goals"].map((goal) => (
        <div className="template">
          <NavLink to={"/save-goals/" + goal.id}>{goal.name}</NavLink>
          <p>${goal.cost / 100}</p>
        </div>
      ))}
    </div>
  );
}

export default SaveGoals;
