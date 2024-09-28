import { redirect } from "react-router-dom";

export default async function putTemplate({ request: req, params }) {
  const { template, budgets } = await req.json();
  const { templateId } = params;
  const body = JSON.stringify({ template, budgets });
  const res = await fetch(`/api/templates/` + templateId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (res.ok) return redirect("/templates/" + templateId);
  return await "res.json()";
}
