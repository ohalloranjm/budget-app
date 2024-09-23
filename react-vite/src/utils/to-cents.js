export default function toCents(dollar_amount) {
  if (!isNaN(dollar_amount)) {
    return Math.round(dollar_amount * 100);
  }
}
