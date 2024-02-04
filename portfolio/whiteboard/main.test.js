const whiteboard = require('./main');

test('checks for whiteboard object', () => {
    expect(typeof whiteboard === 'object').toBe(true)
})

test('object assignment', () => {
    let properties = []
    for(property in whiteboard) {
        properties.push(property)
    }
    expect(properties).toEqual([
        "isPalindrome", "clipRansomNote", "mostCommonChar", "getRange", "reverseArray", 
        "caesarCypher", "fizzBuzz", "sumMultsOf3n5", "maxSumNonAdjacent", "twoSum",
        "fibonacci", "pascalsTriangle", "isPrime", "listPrimes", "makeChange", 
        "maxStockProfit", "binarySearch", "bubbleSort", "mergeSort"
    ]);
  });

  test('FizzBuzz does not contain multiples of 3 or 5', () => {
    let nums = whiteboard.fizzBuzz(50).split(' ').filter(n => !isNaN(parseInt(n)))
    let filtered = nums.filter(i=>i%15).filter(j=>j%5).filter(k=>k%3)
    expect(nums.length === filtered.length).toBe(true);
  });

  test('Number is prime', () => {
    expect(whiteboard.isPrime(12)).not.toBe(true);
    expect(whiteboard.isPrime(17)).toBe(true);
  });

  test('makeChange', () => {
    expect(JSON.parse(whiteboard.makeChange('5.34')))
        .toEqual({five:1,dollar:0,quarter:1,dime:0,nickel:1,penny:4});
  });