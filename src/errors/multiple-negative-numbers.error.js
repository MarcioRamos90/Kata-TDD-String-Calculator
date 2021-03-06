class MultipleNegativeNumbersError extends Error {
  constructor(message) {
    super()
    this.message = `negative numbers [${message}] are not allowed`
    this.name = 'MultipleNegativeNumbersError'
  }
}

module.exports.MultipleNegativeNumbersError = MultipleNegativeNumbersError