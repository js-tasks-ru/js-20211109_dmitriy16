/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const resultObj = {};
  for (let index of fields.keys()) {
    for (let key in obj) {
      if (key === fields[index]) {
        resultObj[fields[index]] = obj[key];
      }
    }
  }
  return resultObj;
};
