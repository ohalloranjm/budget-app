export default async function getTemplate({ params }) {
  const { templateId } = params;
  const res = await fetch("/api/templates/" + templateId);
  const data = await res.json();
  if (res.ok) return data;
  return false;
}
