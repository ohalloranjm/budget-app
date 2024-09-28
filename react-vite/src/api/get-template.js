export default async function getTemplate({ params }) {
  const { templateId } = params;
  const res1 = await fetch("/api/templates/" + templateId);
  const data1 = await res1.json();

  let res2 = await fetch("/api/budgets");
  const data2 = await res2.json();

  if (res1.ok && res2.ok) return { template: data1, budgets: data2 };
  return false;
}
