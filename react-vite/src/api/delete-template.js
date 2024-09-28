export default async function deleteTemplate({ request: req }) {
  if (req.method?.toLowerCase() === "delete") {
    const { id } = await req.json();
    const res = await fetch(`/api/templates/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }
}
