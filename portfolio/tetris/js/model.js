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
            get right() { return this.left }                //   []
        }   
        case 'J':
        return {
            type: 'J',
            color: 'coral',
            up: [[0, -1], [0, 0], [-1, 1], [0, 1]],         //     []    [][]   []
            down: [[0, -1], [1, -1], [0, 0], [0, 1]],       //     ()    ()     []()[]   []()[]
            left: [[-1, -1], [-1, 0], [0, 0], [1, 0]],      //   [][]    []                  []
            right: [[-1, 0], [0, 0], [1, 0], [1, 1]]
        }   
        case 'L':
        return {
            type: 'L',
            color: 'blueviolet',
            up: [[0, -1], [0, 0], [0, 1], [1, 1]],          //   []     [][]        []
            down: [[-1, -1], [0, -1], [0, 0], [0, 1]],      //   ()       ()    []()[]  []()[]
            left: [[1, -1], [-1, 0], [0, 0], [1, 0]],       //   [][]     []            []
            right: [[-1, 0], [0, 0], [1, 0], [-1, 1]]
        }   
        case 'O':
        return {
            type: 'O',
            color: 'orangered',
            up: [[-1, 0], [0, 0], [-1, 1], [0, 1]],         //   []()
            get down() { return this.up },                  //   [][]    
            get left() { return this.up },
            get right() { return this.up }
        }
        case 'S':
        return {
            type: 'S',
            color: 'seagreen',
            up: [[0, -1], [1, -1], [-1, 0], [0, 0]],        //     [][]   []
            left: [[-1, -1], [-1, 0], [0, 0], [0, 1]],      //   []()     []()
            get down() { return this.up },                  //              []
            get right() { return this.left }
        }
        case 'T':
        return {
            type: 'T',
            color: 'goldenrod',
            up: [[0, -1], [-1, 0], [0, 0], [1, 0]],         //     []               []  []
            down: [[-1, 0], [0, 0], [1, 0], [0, 1]],        //   []()[]  []()[]   []()  ()[]
            left: [[0, -1], [-1, 0], [0, 0], [0, 1]],       //             []       []  []
            right: [[0, -1], [0, 0], [1, 0], [0, 1]]          
        }                                                             
        case 'Z':
        return {
            type: 'Z',
            color: 'crimson',
            up: [[-1 , -1], [0, -1], [0, 0], [1, 0]],        //   [][]      []
            left: [[1 , -1], [0, 0], [1, 0], [0, 1]],        //     ()[]  ()[]
            get down() { return this.up },                   //           []        
            get right() { return this.left }
        }
    }
}