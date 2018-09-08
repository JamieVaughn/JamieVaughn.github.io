const types = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']

const getTetromino = function(type){                        // Array values describe the tetrominos scanning from top to bottom row, left to right.
    switch(type) {                                          // Shape schematic orientation order: up  {down} left {right}  square->[] origin->() 
        case 'I':
        return { 
            type: 'I',
            color: 'dodgerblue',                                                 
            up: [[0, -1], [0, 0], [0, 1], [0, 2]],          //   []      
            left: [[-1, 0], [0, 0], [1, 0], [2, 0]],        //   ()     []()[][]
            get down() { return this.up },                  //   []
            right: [[1, 0], [0, 0], [-1, 0], [-2, 0]]       //   []
        }   
        case 'J':
        return {
            type: 'J',
            color: 'coral',
            up: [[0, -1], [0, 0], [-1, 1], [0, 1]],         //     []    [][]   []
            down: [[-1, -1], [-1, 0], [0, -1], [-1, 1]],       //     ()    ()     []()[]   []()[]
            left: [[-2, 0], [-2, 1], [-1, 1], [0, 1]],      //   [][]    []                  []
            right: [[0, 0], [1, 0], [2, 0], [2, 1]]
        }   
        case 'L':
        return {
            type: 'L',
            color: 'blueviolet',
            up: [[0, -1], [0, 0], [1, 1], [0, 1]],
            down: [[-1, -1], [-1, 0], [-2, -1], [-1, 1]],
            left: [[0, 1], [0, 0], [1, 0], [2, 0]],
            right: [[-2, -1], [-1, -1], [0, -1], [0, -2]]
            // up: [[0, -1], [0, 0], [0, 1], [1, 1]],          //   []     [][]        []
            // down: [[-2, -1], [-1, -1], [-1, 0], [-1, 1]],   //   ()       ()    []()[]  []()[]
            // left: [[1, -1], [-1, 0], [0, 0], [1, 0]],       //   [][]     []            []
            // right: [[-1, -1], [0, -1], [1, -1], [-1, 0]]
        }   
        case 'O':
        return {
            type: 'O',
            color: 'orangered',
            up: [[-1, 0], [0, 0], [-1, 1], [0, 1]],         //   []()
            get down() { return this.up },                  //   [][]    
            left: [[1, 0], [0, 0], [1, -1], [0, -1]], 
            get right() { return this.left }
        }
        case 'S':
        return {
            type: 'S',
            color: 'seagreen',
            up: [[0, -1], [1, -1], [-1, 0], [0, 0]],        //     [][]   []
            left: [[0, -1], [0, 0], [1, 0], [1, 1]],        //   []()     []()
            get down() { return this.up },                  //              []
            get right() { return this.left }
        }
        case 'T':
        return {
            type: 'T',
            color: 'goldenrod',
            up: [[0, -1], [-1, 0], [0, 0], [1, 0]],         //     []               []  []
            down: [[0, 0], [1, 0], [2, 0], [1, 1]],         //   []()[]  []()[]   []()  ()[]
            left: [[-1, -1], [0, 0], [-1, 0], [-1, 1]],     //             []       []  []
            right: [[0, -1], [0, 0], [-1, 0], [0, 1]]          
        }                                                             
        case 'Z':
        return {
            type: 'Z',
            color: 'crimson',
            up: [[-1 , -1], [0, -1], [0, 0], [1, 0]],        //   [][]      []
            left: [[0 , -1], [-1, 0], [0, 0], [-1, 1]],      //     ()[]  ()[]
            get down() { return this.up },                   //           []        
            get right() {return this.left}
        }
    }
}

const board = {
    row: 22,
    col: 10,
    size: 20,
    empty: 'white',
    occupied: Array(22).fill(0),
    init () {
       return Array(this.row).fill(false).map(i => {
           var y = 0
           return Array(this.col).fill(false).map(i => y++)
       }) 
    }, 
    draw (brd) {
        brd.forEach((r, index) => {
            r.forEach(c => {
                drawSquare(c, index, this.empty)
            })
        })
    },
    sweep () {
        this.occupied.forEach(i => {
            if(i.length === 10) {
                i.length = 0;
            }
        })
    }
}