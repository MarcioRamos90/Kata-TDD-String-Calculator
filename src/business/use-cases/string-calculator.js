const NegativeNumberError = require('../../errors/negative-number.error').NegativeNumberError
const MultipleNegativeNumbersError = require('../../errors/multiple-negative-numbers.error').MultipleNegativeNumbersError

const reduceArray = require('../../helpers/sum').reduce

class StringCalculator {
  constructor(extractNumbers) {
    this.timesAddWasInvoked = 0
    this.extractNumbers = extractNumbers
  }

  add(numbers = "") {
    this.setTimesAddWasInvoked()
    if (!numbers) return 0
    let numbersConverted = this.extractNumbers.extract(numbers)
    this.numbersValidator(numbersConverted)
    const result = reduceArray(numbersConverted)
    return result
  }

  numbersValidator(numbers) {
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
    const timesCalled = this.timesAddWasInvoked
    return timesCalled
  }

  setTimesAddWasInvoked() {
    this.timesAddWasInvoked++
  }
}


module.exports.StringCalculator = StringCalculator