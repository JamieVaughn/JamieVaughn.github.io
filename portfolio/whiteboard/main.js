// White board functions
const whiteboard = {
    isPalindrome: (str) => {
      let word = str.toLowerCase()
      // return word.split('').reverse().join('') == word
    return word.split('').every((i, index) => {
      return (i == word[word.length - index -1])
      })
    },
     clipRansomNote: (str) => {
      var noteArr = str.split(' ').map(i => i.toLowerCase());
      var hmap = {};
      var articleArr = articleExcerpt.split(' ').map(i => i.toLowerCase())
       articleArr.forEach(word => {
           if(!hmap[word]) hmap[word] = 0
           hmap[word]++
         });
       return noteArr.every(word => !!hmap[word]--)
  // returns false if any of the hmap[word] are undefined or 0; true if all hmap[word] are positive
    },
    mostCommonChar: (str) => {
      var census = str.split('').reduce((acc, cur) => {
        if(acc[cur]) { acc[cur]++
        } else { acc[cur] = 1 }
        return acc
      }, {})
      var most = Object.entries(census)[0][1]
      var mode =  Object.keys(census)
        .filter(key => census[key] >= most)
          .map(key => key + ' (Char Code: ' + key.charCodeAt() + ')').join(' and ')
      return `Appearing ${most} times: ${mode}`;
    },
    // Given a 50,000 word dictionary, find me an efficient way to find anagrams. The answer is simple:
  
  // for each word in the dictionary, take and sort it's characters..... BANANA becomes AAABNN, then see if it (the sorted word) exists in a hash ... if it doesn't, create one, with AAABNN as the key, and ["BANANA"] as the value. If it exists, just push the unsorted word into the array. Now it's completely fast and easy to find anagrams -- sort the letters, find the entry, display the array.
    
    //quicksort
    getRange: (str) => {
      if(isNaN(str)) return "Not a number"
      Number.prototype[Symbol.iterator] = function* range() {
          for(let i = 0; i <= this; i++) {
            yield i;
          }
        };
      return [...Number(str)]
    },
    reverseArray: (str) => {
      return str.split(' ').reduce((acc, cur) => {
        acc.unshift(cur);
        return acc;
      }, [])
    },
    caesarCypher: (str) => {
      return str.split('').map(i => {
        var next = i.charCodeAt(0); console.log(next)
        if( next == 32) return ' '
        return String.fromCharCode(next+3)
      }).join('')
    },
    fizzBuzz: (str) => {
      if(str.length > 6) return "How about less than 7 digits?";
      return [...Array(Math.abs(str)+1).keys()].slice(1).reduce((acc, cur) => {
        return acc += ( cur%3 ? '' : 'fizz' ) + ( cur%5 ? '' : 'buzz' ) || ' '+cur+' '
      }, '')
    },
    sumMultsOf3n5: (str) => {
      return [...Array(Math.abs(str)+1).keys()].reduce((acc, cur) => {
        return acc += cur%3 ? ( cur%5 ? 0 : cur ) : cur 
      }, 0)
    },
    maxSumNonAdjacent: (str) => {
      var result = Object.entries(str.split(',')).sort((a,b) => b[1] - a[1])
      var sum = result.reduce((acc, cur) => {
        if(acc.ind.includes(+cur[0] + 1) || acc.ind.includes(+cur[0] - 1)) {
          return acc;
        }
        acc.sum += Number(cur[1])
        acc.ind.push(+cur[0])
        return acc;
      }, {sum: 0, ind: []})
      return sum.sum;
    },
    twoSum: (str) => {
      var array = str.split(' ').map(i=>Number(i))
      var pairs = []
      array.reduce((acc, cur) => {
        acc.includes(10 - cur) ? pairs.push([10-cur, cur]) : ''
        acc.push(cur)
        return acc;
      }, [])
      return JSON.stringify(pairs)
    },
    fibonacci: (str) => {
      function fib(arr) {
        if(arr[arr.length-1] > Math.abs(str)) return arr; //memoized
        var next = arr[arr.length-1] + arr[arr.length-2]
        if( next > Math.abs(str) ) return arr
        arr.push(next)
        return fib(arr)
      }
      return fib([1,1]);
    },
    pascalsTriangle: (str) => {
      //https://math.stackexchange.com/questions/1154955/is-there-an-equation-that-represents-the-nth-row-in-pascals-triangle
      var rows = Math.abs(str)
      if(!rows) return "Ze-rows?"
      var pt = [[1]]
      for(var i=1;i<rows;i++){
        let row = []; row.length = i+1;
        pt.push(row)
        for(var j=0;j<row.length;j++) {
          pt[i][j] = (pt[i-1][j]||0) + (pt[i-1][j-1]||0)
        }
      }
      return ('<div class="pt">' + pt.map((i,index) => `(${index+1})`+'·'.repeat(rows-index+1) +i+'<br>') + '</div>').split(',').join(' ');
    },
    isPrime: (str) => {
      if(isNaN(str)) return "Not a number"
      var num = Number(str);
      if(num === 1) return false;
      var sieve = ![2,3,5,7,11,13,17,19,23,29].filter(j => num%j)
      for(i=2; i <= Math.sqrt(num); i++) {
        if(num%i == 0 || sieve) return false;
      }
      return true;
    },
    listPrimes: (str) => {
      if(str.length > 6) return "How about less than 7 digits?";
      var sieved = [...Array(Math.abs(str)+1).keys()].filter(i=> i>1 && i%2 && i%3 && i%5 && i%7 && i%11 && i%13 && i%17 && i%19 && i%23 && i%29)
      var seed =[2,3,5,7,11,13,17,19,23,29].filter(j => j <= Math.abs(str))
      return [...seed, ...sieved.filter(k => whiteboard.isPrime(k))]
    },
    makeChange: (str) => {
      const coins = {twenty: 2000, ten: 1000, five: 500, dollar: 100, quarter: 25, dime: 10, nickel: 5, penny: 1}
      let amount = Math.round( Math.abs(+'.20') * 100)
      return JSON.stringify(Object.entries(coins).reduce((acc, cur) => {
        var num = Math.floor(amount/cur[1])
        amount = amount%cur[1]
        console.log(acc, cur)
        acc[cur[0]] = num
        return acc;
      }, {twenty: 0, ten: 0, five: 0, dollar: 0, quarter: 0, dime: 0, nickel: 0, penny: 0}))
    },
    maxStockProfit: (str) => {
      var arr = str.split(' ').map(i=> Number(i));
      var buy = 0, sell = 0, min = 0, profit = 0;
      for (var i = 0; i < arr.length; i++) {
          if (arr[i] < arr[min]) min = i;
          else if (arr[i] - arr[min] > profit) {
              buy = min; 
              sell = i;
              profit = arr[i] - arr[min];
          }
      }
        return `Buy at $${arr[buy]}, sell at $${arr[sell]} and profit $${profit}`
    },
    binarySearch: (str) => {
      var presort =  str.split(' ').map(i=>Number(i)).sort((a,b)=> a-b); //arr is presorted
      //searching for the number 20
      function bin(arr) {
        var bot = 0;
        var top = arr.length - 1;
        while (bot <= top) {
            var mid = Math.floor((bot + top) / 2);
          console.log(arr[mid])
            var compare = 20 - arr[mid];
            if (compare > 0) {
                bot = mid + 1;
            } else if(compare < 0) {
                top = mid - 1;
            } else {
                return 'index: ' + mid +' ...' +arr;
            }
        }
        return 'index: '+(-bot - 1) + ' ...' +arr;
      }
      return bin(presort);
    },
    bubbleSort: (str) => {
      var arr = str.split(' ').map(i=>Number(i))
      let swap;
      do {
        swap = false;
        for (let i = 1; i < arr.length; ++i) {
          if (arr[i - 1] > arr[i]) {
            [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            swap = true;
          }
        }
      } while (swap)
      return arr
    },
    mergeSort: (str) => {
      var array = str.split(' ').map(i=>Number(i))
      function mergeSort (arr) {
        if (arr.length < 2) return arr;
        var mid = Math.floor(arr.length / 2);
        var subLeft = mergeSort(arr.slice(0, mid));
        var subRight = mergeSort(arr.slice(mid));
        return merge(subLeft, subRight);
      }
  
      function merge (node1, node2) {
          var result = [];
          while (node1.length > 0 && node2.length > 0)
              result.push(node1[0] < node2[0]? node1.shift() : node2.shift());
          return result.concat(node1.length? node1 : node2);
      }
      return mergeSort(array);
    },
  }

try {
  module.exports = whiteboard;
} catch(err) {
  console.log(err)
}
