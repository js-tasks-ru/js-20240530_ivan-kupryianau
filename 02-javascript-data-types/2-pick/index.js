/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let keyValueArr = Object.entries(obj); // [ [ 'apple', 2 ], [ 'orange', 4 ], [ 'banana', 3 ] ]
  let result = {};

  if (keyValueArr.length === 0) {
    for (let field of fields) {
      result[field] = fields.findIndex(field => field === field);
    }
  }

  for (let item of keyValueArr) {
    for (let field of fields) {
      if (item[0] === field) {
        result[field] = item[1];
      }
    }
  }

  return result;
};
