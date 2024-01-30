export const Thousands = (num) => {
  return num.toString().split('').reverse().join('')
    .replace(/(?=\d*\.?)(\d{3})/g, '$1,')
    .split('')
    .reverse()
    .join('')
    .replace(/^[,]/, '');
};