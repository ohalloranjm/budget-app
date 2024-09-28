import { redirect } from "react-router-dom";

export default async function putSaveGoal({ request: req, params }) {
  const { saveGoal } = await req.json();
  const { saveGoalId } = params;
  const body = JSON.stringify(saveGoal);
  const res = await fetch(`/api/save-goals/` + saveGoalId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  if (res.ok) return redirect("/save-goals/" + saveGoalId);
  return await res.json();
}
