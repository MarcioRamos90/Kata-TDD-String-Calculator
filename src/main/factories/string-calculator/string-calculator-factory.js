const StringCalculator = require('../../../business/use-cases/string-calculator').StringCalculator
const ExtractNumbers = require('../../../business/use-cases/extract-numbers').ExtractNumbers

const makeStringCalculatorFactory = () => {
  const extractNumbers = new ExtractNumbers()
  return new StringCalculator(extractNumbers)
}

module.exports.makeStringCalculatorFactory = makeStringCalculatorFactory