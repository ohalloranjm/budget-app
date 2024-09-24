export default function dollarString(money) {
  let [dollars, cents] = String(money).split('.');
  cents = cents ?? '00';
  if (!(cents.length - 1)) cents += '0';
  return `$${dollars}.${cents}`;
}
