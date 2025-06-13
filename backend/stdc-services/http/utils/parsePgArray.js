// utils/parsePgArray.js

function parsePgArrayString(arrayString) {
  // If it's already an array, return as is
  if (Array.isArray(arrayString)) {
    return arrayString;
  }
  if (arrayString === null || typeof arrayString === 'undefined') {
    return [];
  }
  // If it's a string in the format "{item1,item2}"
  if (typeof arrayString === 'string' && arrayString.startsWith('{') && arrayString.endsWith('}')) {
    const innerContent = arrayString.slice(1, -1);
    return innerContent ? innerContent.split(',') : [];
  }
  // Return empty array for unrecognized formats
  return [];
}

module.exports = parsePgArrayString;