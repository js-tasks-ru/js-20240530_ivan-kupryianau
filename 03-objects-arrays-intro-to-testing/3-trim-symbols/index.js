/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let counter = 0;
  let accumulator = '';
  let lastLetter = '';
  let result = '';

  for (const letter of string) {
    if (letter !== lastLetter) {
      result += accumulator;
      counter = 1;
      accumulator = letter;
    } else {
      counter += 1;
      if (counter <= size) {
        accumulator += letter;
      }
    }
    lastLetter = letter;
  }


  result += accumulator;

  return size === 0 ? '' : arguments.length < 2 ? string : result;
}

