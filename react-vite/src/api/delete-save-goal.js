export default async function deleteSaveGoal({ request: req }) {
  if (req.method?.toLowerCase() === "delete") {
    const { id } = await req.json();
    const res = await fetch(`/api/save-goals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }
}
