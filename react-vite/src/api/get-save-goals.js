export default async function getSaveGoals() {
    const res = await fetch('/api/save-goals');
    const data = await res.json();
    if (res.ok) return data;
    return false;
  }
  