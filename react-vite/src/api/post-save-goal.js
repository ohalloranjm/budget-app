import { redirect } from "react-router-dom";

export default async function postSaveGoal({ request: req }) {
  const { saveGoal } = await req.json();
  const body = JSON.stringify(saveGoal);
  const res = await fetch(`/api/save-goals/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.json();
  if (res.ok) return redirect("/save-goals/" + data.id);
  console.log("heree");
  return await res.json();
}
