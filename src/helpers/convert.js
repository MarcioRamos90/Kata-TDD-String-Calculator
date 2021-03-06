function convertStringToNumber(arrayOfString) {
  return arrayOfString
    .filter(numberString => !!numberString)
    .map(numberString => +numberString.trim())
}

module.exports.convertStringToNumber = convertStringToNumber
