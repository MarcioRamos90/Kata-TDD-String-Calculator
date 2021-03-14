const StringCalculator = require('./string-calculator').StringCalculator
const ExtractNumbers = require('./extract-numbers').ExtractNumbers
const NegativeNumberError = require('./errors/negative-number.error').NegativeNumberError
const MultipleNegativeNumbersError = require('./errors/multiple-negative-numbers.error').MultipleNegativeNumbersError

describe('String Calculator add', () => {
  it('Should returns 0 if StringCalculator.add receive an empty string', () => {
    const sut = new StringCalculator()
    const result = sut.add('')
    expect(result).toBe(0)
  })

  it('Should StringCalculator.add returns the numbers if are provided an unknown amount of numbers', () => {
    const sut = new StringCalculator()
    expect(sut.add('3, 2 , 1 , 3 , 4')).toBe(13)
    expect(sut.add('3, 2 , 1 , 3 , 4, 1, 1, 100, 215')).toBe(330)
  })

  it('Should StringCalculator.add throw an error if a negative number is provided', () => {
    const sut = new StringCalculator()
    expect(() => sut.add('-3214')).toThrowError(new NegativeNumberError())
    expect(() => sut.add('1, -3214')).toThrowError(new NegativeNumberError())
    expect(() => sut.add('1\n -3214')).toThrowError(new NegativeNumberError())
    expect(() => sut.add('//;\n1;-12')).toThrowError(new NegativeNumberError())
  })

  it('Should StringCalculator.add throw an exception showing all numbers if multiple negative numbers are provided', () => {
    const sut = new StringCalculator()
    expect(() => sut.add(' -3214, -12')).toThrowError(new MultipleNegativeNumbersError([-3214,-12]))
    expect(() => sut.add('-1, -3214')).toThrowError(new MultipleNegativeNumbersError([-1,-3214]))
    expect(() => sut.add('-1\n -3214')).toThrowError(new MultipleNegativeNumbersError([-1,-3214]))
    expect(() => sut.add('//;\n-1; -12')).toThrowError(new MultipleNegativeNumbersError([-1,-12]))
  })
})

describe('String Calculator getCalledCount', () => {
  it('Should returns 0 if StringCalculator.getCalledCount returns how many times add() was invoked.', () => {
    const sut = new StringCalculator()
    sut.add('3, 2')
    sut.add('3, 2')
    sut.add('3, 2')
    expect(sut.getCalledCount()).toBe(3)
    sut.add()
    expect(sut.getCalledCount()).toBe(4)
  })
})