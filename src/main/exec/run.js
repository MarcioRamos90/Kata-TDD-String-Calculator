const makeStringCalculatorFactory = require('../factories/string-calculator/string-calculator-factory').makeStringCalculatorFactory

class ExecCalculator {
  handle (input) {
    return makeStringCalculatorFactory().add(input)
  }
}

module.exports.ExecCalculator = ExecCalculator