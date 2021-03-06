const convertStringToNumber = require('./convert').convertStringToNumber

describe('convertStringToNumber', () => {
  it('should sum the array', () => {
    expect(convertStringToNumber([' 1','  2','4 ',' 5'])).toEqual([1,2,4,5])
  })
})
