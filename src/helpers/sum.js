function reduce(arrayOfNumbers) {
  return arrayOfNumbers.reduce((prev, curr) => prev + curr, 0)
}

module.exports.reduce = reduce