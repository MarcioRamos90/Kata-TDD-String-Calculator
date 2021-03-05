class StringCalculator {
  add(numbers = "") {
    if (!numbers) return 0
    if (numbers.split(',').length === 1) return +numbers
    let numbersConverted = numbers.split(',').map(numberString => +numberString)
    return numbersConverted.reduce((prev, curr) => prev + curr, 0)
  }
}

module.exports.StringCalculator = StringCalculator