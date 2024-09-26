export default function redIf(condition, className = '') {
  if (condition) return `${className} overspent`;
  return className;
}
