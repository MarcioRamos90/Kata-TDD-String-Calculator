const reduce = require('./sum').reduce

describe('reduce', () => {
  it('should sum the array', () => {
    expect(reduce([1,2,4,5])).toBe(12)
  })
})