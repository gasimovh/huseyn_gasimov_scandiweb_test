export const generateKey = () => {
  return Math.random(10) * new Date().getTime();
};

export const roundTo2Decimal = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
};

export const sortString = (str) => {
  return str.split("").sort().join("");
};
