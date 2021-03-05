const StringCalculator = require('./string-calculator').StringCalculator

describe('String Calculator', () => {
  it('Should returns 0 if StringCalculator.add receive an empty string', () => {
    const sut = new StringCalculator('')
    const result = sut.add('')
    expect(result).toBe(0)
  })
})