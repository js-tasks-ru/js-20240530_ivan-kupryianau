/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
const omit = (obj, ...fields) => {
  let keyValueArr = Object.entries(obj);
  let result = {};

  if (keyValueArr.length === 0) {
    for (let field of fields) {
      result[field] = fields.findIndex(field => field === field);
    }
  }

  for (let item of keyValueArr) {
    for (let field of fields) {
      if (item[0] !== field) {
        result[field] = item[1];
      }
    }
  }

  return result;
};
