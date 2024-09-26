export default async function getTemplates() {
  const res = await fetch("/api/templates");
  const data = await res.json();
  if (res.ok) return data;
  return false;
}
