class NegativeNumberError extends Error {
  constructor() {
    super()
    this.message = 'negatives not allowed'
    this.name = 'NegativeNumberError'
  }
}

module.exports.NegativeNumberError = NegativeNumberError