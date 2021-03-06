const NegativeNumberError = require('./errors/negative-number.error').NegativeNumberError

class StringCalculator {
  constructor() {
    this.defaultDelimiter = ','
    this.constructDelimiters()
  }
  
  constructDelimiters() {
    this.delimiterRegex = new RegExp(`[${this.defaultDelimiter} | \n]`)
  }

  verifyInput(numbers = '') {
    if (/^\/\//.test(numbers)) {
      this.defaultDelimiter = '\;'
      this.constructDelimiters()
      return numbers.slice(3)
    }
    return numbers
  }

  add(numbers = "") {
    numbers = this.verifyInput(numbers)
    if (!numbers) return 0
    let numbersConverted = numbers.split(this.delimiterRegex)
      .filter(numberString => !!numberString)
      .map(numberString => +numberString.trim())
    this.numbersValidator(numbersConverted)
    return numbersConverted.reduce((prev, curr) => prev + curr, 0)
  }

  numbersValidator(numbers = 0) {
    for (const num of numbers) {
      if (num < 0) {
        throw new NegativeNumberError()
      }
    }
  }
}

module.exports.StringCalculator = StringCalculator