class StringCalculator {
  add(numbers = "") {
    if (!numbers) return 0
    return +numbers
  }
}

module.exports.StringCalculator = StringCalculator