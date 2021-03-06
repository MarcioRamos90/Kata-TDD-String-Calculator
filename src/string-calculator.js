const NegativeNumberError = require('./errors/negative-number.error').NegativeNumberError
const reduceArray = require('./helpers/sum').reduce
const convertStringToNumber = require('./helpers/convert').convertStringToNumber

class StringCalculator {
  constructor() {
    this.defaultDelimiter = ','
    this.constructDelimiters()
    this.timesAddWasInvoked = 0
  }

  add(numbers = "") {
    this.setTimesAddWasInvoked()

    numbers = this.verifyInput(numbers)
    if (!numbers) return 0
    let numbersConverted = this.convertArray(numbers)
      .filter(number => number <= 1000)
    this.numbersValidator(numbersConverted)
    return reduceArray(numbersConverted)
  }

  verifyInput(numbers = '') {
    if (/^\/\//.test(numbers)) {
      this.defaultDelimiter = '\;'
      this.constructDelimiters()
      return numbers.slice(3)
    }
    return numbers
  }

  convertArray(numbers) {
    let numbersConverted = numbers.split(this.delimiterRegex)
    numbersConverted = convertStringToNumber(numbersConverted)
    return numbersConverted
  }

  numbersValidator(numbers = 0) {
    let count = 0
    for (const num of numbers) {
      if (num < 0) {
        count++
      }
    }
    if (count === 1) {
      throw new NegativeNumberError()
    } else if (count > 1) {
      throw new Error(`negative numbers [${numbers.toString()}] are not allowed`)
    }
  }

  constructDelimiters() {
    this.delimiterRegex = new RegExp(`[${this.defaultDelimiter} | \n]`)
  }

  getCalledCount() {
    return this.timesAddWasInvoked
  }

  setTimesAddWasInvoked() {
    this.timesAddWasInvoked++
  }
}

module.exports.StringCalculator = StringCalculator