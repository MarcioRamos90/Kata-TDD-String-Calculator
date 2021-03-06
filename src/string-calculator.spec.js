const StringCalculator = require('./string-calculator').StringCalculator
const NegativeNumberError = require('./errors/negative-number.error').NegativeNumberError

describe('String Calculator add', () => {
  it('Should returns 0 if StringCalculator.add receive an empty string', () => {
    const sut = new StringCalculator()
    const result = sut.add('')
    expect(result).toBe(0)
  })

  it('Should returns the number if StringCalculator.add receive "any number string"', () => {
    const sut = new StringCalculator()
    expect(sut.add('3')).toBe(3)
    expect(sut.add('11')).toBe(11)
    expect(sut.add('13.21414')).toBe(13.21414)
  })

  it('Should returns the sum if StringCalculator.add receive "number, number"', () => {
    const sut = new StringCalculator()
    expect(sut.add('3, 2')).toBe(5)
    expect(sut.add('4, 23')).toBe(27)
  })

  it('Should StringCalculator.add returns the sum if are provided an unknown amount of numbers', () => {
    const sut = new StringCalculator()
    expect(sut.add('3, 2 , 1 , 3 , 4')).toBe(13)
    expect(sut.add('3, 2 , 1 , 3 , 4, 1, 1, 100, 215')).toBe(330)
  })

  it('ensure StringCalculator.add handle new lines between numbers (instead of commas)', () => {
    const sut = new StringCalculator()
    expect(sut.add('3\n2')).toBe(5)
    expect(sut.add('3\n2, 4')).toBe(9)
    expect(sut.add('3\n2, 4 \n 20')).toBe(29)
  })

  it('Should support different delimiters when the string has this configuration: “//[delimiter]\\n[numbers...]”', () => {
    const sut = new StringCalculator()
    expect(sut.add('//;\n1;2')).toBe(3)
    expect(sut.add('//;\n1;2;4')).toBe(7)
    expect(sut.add('//;\n1;2;4; 10; 10')).toBe(27)
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
    expect(() => sut.add(' -3214, -12')).toThrowError(new Error('negative numbers [-3214,-12] are not allowed'))
    expect(() => sut.add('-1, -3214')).toThrowError(new Error('negative numbers [-1,-3214] are not allowed'))
    expect(() => sut.add('-1\n -3214')).toThrowError(new Error('negative numbers [-1,-3214] are not allowed'))
    expect(() => sut.add('//;\n-1; -12')).toThrowError(new Error('negative numbers [-1,-12] are not allowed'))
  })

  it('Should StringCalculator.add ignores number bigger than 1000', () => {
    const sut = new StringCalculator()
    expect(sut.add('3, 1001')).toBe(3)
    expect(sut.add('3, 1000')).toBe(1003)
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