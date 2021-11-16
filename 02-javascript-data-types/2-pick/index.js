/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let resultObj = {};
  for (let i = 0; i < fields.length; i++) {
    for (let key in obj) {
      if (key === fields[i]) {
        resultObj[fields[i]] = obj[key];
      }
    }
  }
  return resultObj;
};
