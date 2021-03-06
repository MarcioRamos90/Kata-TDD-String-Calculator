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
    let numbersConverted = numbers.split(this.delimiterRegex).map(numberString => +numberString)
    for (const num of numbersConverted) {
      if (num < 0) {
        throw Error('negatives not allowed')
      }
    }
    return numbersConverted.reduce((prev, curr) => prev + curr, 0)
  }
}

module.exports.StringCalculator = StringCalculator