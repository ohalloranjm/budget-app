import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";

function SaveGoalDetails() {
  const saveGoal = useLoaderData() || [{ name: "uh", cost: "oh" }];
  const start_date_num = new Date(saveGoal.start_date).getTime();
  const end_date_num = new Date(saveGoal.end_date).getTime();
  const curr_date_num = new Date().getTime();
  return (
    <div className="save-goal-details">
      <h2>{saveGoal.name}</h2>
      <p>{saveGoal.description}</p>
      <p>${saveGoal.cost / 100}</p>
      <span>
        <p>started: {saveGoal.start_date}</p>
        <p>due by: {saveGoal.end_date}</p>
        {/* VVV This is a working progress bar of time passed (plan to replicate for amount saved)  VVV */}
        <progress
          max={end_date_num - start_date_num}
          value={Math.abs(start_date_num - curr_date_num)}
        ></progress>
      </span>
    </div>
  );
}

export default SaveGoalDetails;
