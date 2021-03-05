class StringCalculator {
  constructor() {
    this.re = /[, | \n]/
  }

  add(numbers = "") {
    if (!numbers) return 0
    if (numbers.split(this.re).length === 1) return +numbers
    let numbersConverted = numbers.split(this.re).map(numberString => +numberString)
    return numbersConverted.reduce((prev, curr) => prev + curr, 0)
  }
}

module.exports.StringCalculator = StringCalculator