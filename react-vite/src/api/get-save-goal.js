export default async function getSaveGoal({ params }) {
  const { saveGoalId } = params;
  const res = await fetch(`/api/save-goals/${saveGoalId}`);
  if (res.ok) return await res.json();
  throw await res.json();
}
