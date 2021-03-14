const ExecCalculator = require('./run').ExecCalculator

describe('Exec calculator', () => {
  it('should handle one number', () => {
    const sut = new ExecCalculator()
    expect(sut.handle('2')).toBe(2)
  })
  it('should sum two numbers', () => {
    const sut = new ExecCalculator()
    expect(sut.handle('1,2')).toBe(3)
  })
  it('should sum many numbers', () => {
    const sut = new ExecCalculator()
    expect(sut.handle('1,2,3,4,5')).toBe(15)
  })
})