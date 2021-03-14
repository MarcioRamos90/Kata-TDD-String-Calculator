const convertStringToNumber = require('./helpers/convert').convertStringToNumber

class ExtractNumbers {
  constructor() {
    this.defaultDelimiter = [',']
    this.constructDelimiters()
  }

  extract(numbers) {
    numbers = this.verifyInputDelimiters(numbers)
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

  verifyInputDelimiters(numbers) {
    if (/^\/\//.test(numbers)) {
      let delimiters = this.extractDelimiters(numbers)
      this.defaultDelimiter = delimiters 
      this.constructDelimiters()
      return numbers.slice(3)
    } else {
      return numbers
    }
  }

  convertArray(numbers) {
    let numbersConverted = numbers.split(this.delimiterRegex)
    numbersConverted = convertStringToNumber(numbersConverted)
    return numbersConverted
  }

  constructDelimiters() {
    this.delimiterRegex = new RegExp(`[${this.defaultDelimiter} | \n]`)
  }
}

module.exports.ExtractNumbers = ExtractNumbers