const StringCalculator = require('./string-calculator').StringCalculator

describe('String Calculator', () => {
  it('Should returns 0 if StringCalculator.add receive an empty string', () => {
    const sut = new StringCalculator('')
    const result = sut.add('')
    expect(result).toBe(0)
  })

  it('Should returns the number if StringCalculator.add receive "any number string"', () => {
    const sut = new StringCalculator('')
    expect(sut.add('3')).toBe(3)
    expect(sut.add('11')).toBe(11)
    expect(sut.add('111321414')).toBe(111321414)
    expect(sut.add('13.21414')).toBe(13.21414)
    expect(sut.add('-321414')).toBe(-321414)
  })
})