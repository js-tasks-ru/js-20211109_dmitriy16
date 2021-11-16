/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  let resultObj = obj;
  for (let i = 0; i < fields.length; i++) {
    for (let key in obj) {
      if (key === fields[i]) {
        delete resultObj[fields[i]];
      }
    }
  }
  return resultObj;
};
