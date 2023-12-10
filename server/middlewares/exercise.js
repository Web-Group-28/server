/**
 * Get `n` elements randomly from `array`.
 * @param {Array} array 
 * @param {number} n 
 * @returns {array}
 */
module.exports = (array, n) => {
   const randomFills = (array.length > 1 && n < array.length) ? array.sort(() => .5 - Math.random()).slice(0, n) : array;
   return randomFills;
};