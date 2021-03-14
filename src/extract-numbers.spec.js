const ExtractNumbers = require('./extract-numbers').ExtractNumbers

describe('Extract numbers', () => {
  it('Should returns the numbers if ExtractNumbers.extract receive "any number string"', () => {
    const sut = new ExtractNumbers()
    expect(sut.extract('3')).toEqual([3])
    expect(sut.extract('11')).toEqual([11])
    expect(sut.extract('13.21414')).toEqual([13.21414])
  })

  it('Should returns the numbers if ExtractNumbers.extract receive "number, number"', () => {
    const sut = new ExtractNumbers()
    expect(sut.extract('3, 2')).toEqual([3, 2])
    expect(sut.extract('4, 23')).toEqual([4, 23])
  })

  it('Should ExtractNumbers.extract returns the numbers if are provided an unknown amount of numbers', () => {
    const sut = new ExtractNumbers()
    expect(sut.extract('3, 2 , 1 , 3 , 4')).toEqual([3, 2 , 1 , 3 , 4])
    expect(sut.extract('3, 2 , 1 , 3 , 4, 1, 1, 100, 215')).toEqual([3, 2 , 1 , 3 , 4, 1, 1, 100, 215])
  })

  it('ensure ExtractNumbers.extract handle new lines between numbers (instead of commas)', () => {
    const sut = new ExtractNumbers()
    expect(sut.extract('3\n2')).toEqual([3,2])
    expect(sut.extract('3\n2, 4')).toEqual([3, 2, 4])
    expect(sut.extract('3\n2, 4 \n 20')).toEqual([3, 2, 4, 20])
  })

  it('Should support different delimiters when the string has this configuration: “//[delimiter]\\n[numbers...]”', () => {
    const sut = new ExtractNumbers()
    expect(sut.extract('//;\n1;2')).toEqual([1,2])
    expect(sut.extract('//;\n1;2;4')).toEqual([1,2,4])
    expect(sut.extract('//;\n1;2;4; 10; 10')).toEqual([1, 2, 4, 10, 10])
  })

  it('Should ExtractNumbers.extract ignores number bigger than 1000', () => {
    const sut = new ExtractNumbers()
    expect(sut.extract('3, 1001')).toEqual([3])
    expect(sut.extract('3, 1000')).toEqual([3, 1000])
  })

  it('Should allow switch the delimiters by any string length', () => {
    const sut = new ExtractNumbers()
    expect(sut.extract('//***\n1***2')).toEqual([1,2])
    expect(sut.extract('//xxaa\n2xxaa2')).toEqual([2, 2])
  })

  it('Should ExtractNumbers allow multiple delimiters like this: “//[delim1][delim2]\\n”', () => {
    const sut = new ExtractNumbers()
    expect(sut.extract('//[*][%]\n1*2%3')).toEqual([1,2,3])
    expect(sut.extract('//[*][%][h$%]\n1*2%3h$%55')).toEqual([1,2,3,55])
    expect(sut.extract('//[***][%][h$%]\n1***4%h$%2')).toEqual([1, 4, 2])
  })
})
