/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  const toArr = string.split('');
  const groupedArr = [];
  toArr.forEach(el => {
    let lastItem = groupedArr[groupedArr.length - 1];
    if (!lastItem) {
      groupedArr.push(el);
    } else {
      const lastLetter = lastItem[lastItem.length - 1];
      if (lastLetter === el) {
        lastItem += el;
        groupedArr[groupedArr.length - 1] = lastItem;
      } else {
        groupedArr.push(el);
      }
    }
  });
  const result = [];
  groupedArr.forEach(el => {
    if (el.length > size) {
      result.push(el.substr(0, size));
    } else {
      result.push(el);
    }
  });
  return result.join('');
}
