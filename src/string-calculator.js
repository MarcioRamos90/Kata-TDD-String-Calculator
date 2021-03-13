const NegativeNumberError = require('./errors/negative-number.error').NegativeNumberError
const MultipleNegativeNumbersError = require('./errors/multiple-negative-numbers.error').MultipleNegativeNumbersError

const reduceArray = require('./helpers/sum').reduce
const convertStringToNumber = require('./helpers/convert').convertStringToNumber

class StringCalculator {
  constructor() {
    this.timesAddWasInvoked = 0
  }

  add(numbers = "") {
    this.setTimesAddWasInvoked()
    if (!numbers) return 0
    const extractNumbers = new ExtractNumbers()
    let numbersConverted = extractNumbers.extract(numbers)
    this.numbersValidator(numbersConverted)
    return this.numbersConverted(numbersConverted)
  }
  
  numbersConverted(numbers) {
    return reduceArray(numbers)
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
      throw new MultipleNegativeNumbersError(numbers)
    }
  }

  getCalledCount() {
    return this.timesAddWasInvoked
  }

  setTimesAddWasInvoked() {
    this.timesAddWasInvoked++
  }
}

class ExtractNumbers {
  constructor() {
    this.defaultDelimiter = [',']
    this.constructDelimiters()
  }

  extract(numbers = "") {
    numbers = this.verifyInput(numbers)
    let numbersConverted = this.convertArray(numbers)
      .filter(number => number <= 1000)
    return numbersConverted
  }

  extractDelimiters(string) {
    const regex = /\[.+\]/
    if (regex.test(string)) {
      const match = string.match(regex)[0]
      return match.slice(1, match.length - 1).split('][').map(i => i).filter(i => !!i)
    }
    return [string.slice(2, string.match(/\n/).index)]
  }

  verifyInput(numbers = '') {
    if (/^\/\//.test(numbers)) {
      let delimiters = this.extractDelimiters(numbers)
      this.defaultDelimiter = delimiters 
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
      throw new MultipleNegativeNumbersError(numbers)
    }
  }

  constructDelimiters() {
    this.delimiterRegex = new RegExp(`[${this.defaultDelimiter} | \n]`)
  }
}

module.exports.StringCalculator = StringCalculator