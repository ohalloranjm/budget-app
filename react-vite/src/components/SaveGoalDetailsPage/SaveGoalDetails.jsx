import { useState } from "react";
import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import "./SaveGoalDetails.css";

function SaveGoalDetails() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const saveGoal = useLoaderData() || [{ name: "uh", cost: "oh" }];
  const [confirmDelete, setConfirmDelete] = useState(false);
  const start_date_num = new Date(saveGoal.start_date).getTime();
  const end_date_num = new Date(saveGoal.end_date).getTime();
  const curr_date_num = new Date().getTime();
  console.log();
  console.log();

  const deleteSaveGoal = (e) => {
    e.preventDefault();
    submit(
      { id: saveGoal.id },
      { method: "delete", encType: "application/json" }
    );
    navigate("/save-goals");
  };
  return (
    <div className="save-goal-details">
      <h2>{saveGoal.name}</h2>
      <p>{saveGoal.description}</p>
      <p>${saveGoal.cost / 100}</p>

      <p>started: {saveGoal.start_date}</p>
      <p>due by: {saveGoal.end_date}</p>
      {/* VVV This is a working progress bar of time passed (plan to replicate for amount saved)  VVV */}
      <span>
        <p>Time Progress:</p>
        <progress
          max={end_date_num - start_date_num}
          value={curr_date_num - start_date_num}
        ></progress>
      </span>
      <div className="save-goal-buttons">
        <button
          className="dark"
          onClick={() => navigate(`/save-goals/${saveGoal.id}/edit`)}
        >
          Update
        </button>

        {confirmDelete ? (
          <button className="dark confirm-delete" onClick={deleteSaveGoal}>
            Confirm Delete
          </button>
        ) : (
          <button className="dark" onClick={() => setConfirmDelete(true)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default SaveGoalDetails;
