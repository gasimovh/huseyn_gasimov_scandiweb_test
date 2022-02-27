export const generateKey = () => {
  return Math.random(10) * new Date().getTime();
};

export const roundTo2Decimal = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
};
