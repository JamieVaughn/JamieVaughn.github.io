class ChessPiece {
    constructor(name){
        this.name = name
    }

    move(){
        this.updatePosition
    }
    take() {
        console.log('gotcha')
    }
    taken(){
        this.delete()
    }
}

const pieces = (edge, rows) => ({ 
    // rows can be pos or neg integer between 0 and edge
    // edge is const positive integer
    pawn: {
        move: [edge, edge+1, edge-1]
    },
    bishop: {
        move: [(edge-1)*rows, (edge+1)*rows]
    },
    knight: {
        move: [edge*2-1, edge*2+1, edge+2, edge-2]
    },
    rook: {
        move: [edge*rows]
    },
    queen: {
        move: this.rook.move.concat(this.bishop.move)
    },
    king: {
        move: this.pawn.move.concat([this.pawn.move.map(m => m*-1)])
    }
})