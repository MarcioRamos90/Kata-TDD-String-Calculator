const StringCalculator = require('./string-calculator').StringCalculator
const ExtractNumbers = require('./extract-numbers').ExtractNumbers
const NegativeNumberError = require('./errors/negative-number.error').NegativeNumberError
const MultipleNegativeNumbersError = require('./errors/multiple-negative-numbers.error').MultipleNegativeNumbersError

const makeExtractNumbersStub = () => {
  class ExtractNumbersStub {
    extract(numbers = "") {
      return [1,1]
    }
  }

  return new ExtractNumbersStub()
}

const makeStringCalculator = () => {
  const extractNumbersStub = makeExtractNumbersStub()
  const sut = new StringCalculator(extractNumbersStub)
  return {
    sut,
    extractNumbersStub
  }
}

describe('String Calculator add', () => {
  it('Should returns 0 if StringCalculator.add receive an empty string', () => {
    const { sut } = makeStringCalculator()
    const result = sut.add('')
    expect(result).toBe(0)
  })

  it('Should StringCalculator.add returns the numbers if are provided an unknown amount of numbers', () => {
    const { sut, extractNumbersStub } = makeStringCalculator()
    jest.spyOn(extractNumbersStub, 'extract').mockReturnValueOnce([3, 2 , 1 , 3 , 4])
    expect(sut.add('3, 2 , 1 , 3 , 4')).toBe(13)
    jest.spyOn(extractNumbersStub, 'extract').mockReturnValueOnce([3, 2 , 1 , 3 , 4, 1, 1, 100, 215])
    expect(sut.add('3, 2 , 1 , 3 , 4, 1, 1, 100, 215')).toBe(330)
  })

  it('Should StringCalculator throw an error if a negative number is provided', () => {
    const { sut, extractNumbersStub } = makeStringCalculator()
    jest.spyOn(extractNumbersStub, 'extract').mockReturnValueOnce([1, -3214])
    expect(() => sut.add('1, -3214')).toThrowError(new NegativeNumberError())
  })

  it('Should StringCalculator throw an exception showing all numbers if multiple negative numbers are provided', () => {
    const { sut, extractNumbersStub } = makeStringCalculator()
    jest.spyOn(extractNumbersStub, 'extract').mockReturnValueOnce([-3214, -12])
    expect(() => sut.add(' -3214, -12')).toThrowError(new MultipleNegativeNumbersError([-3214,-12]))
  })
})

describe('String Calculator getCalledCount', () => {
  it('Should returns 0 if StringCalculator.getCalledCount returns how many times add() was invoked.', () => {
    const { sut } = makeStringCalculator()
    sut.add('3, 2')
    sut.add('3, 2')
    sut.add('3, 2')
    expect(sut.getCalledCount()).toBe(3)
    sut.add()
    expect(sut.getCalledCount()).toBe(4)
  })
})