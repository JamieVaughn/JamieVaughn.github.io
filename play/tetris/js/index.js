// General functions
const id = x => x
const add = x => y => x + y
const transpose = xsxs => xsxs[0].map((col, i) => xsxs.map(row => row[i]));
const mirror = xsxs => xsxs.map(xs => xs.reverse())
const pipe = (...fs) => x => [...fs].reduce((acc, f) => f(acc), x)
const map = f => xs => xs.map(f)
const range = min => max => [...Array(max).keys()].map((_, i) => i + min)
const k = x => _ => x
const join = s => xs => xs.join(s)
const rep = c => n => map(k(c))(range(0)(n))
const concat = x1 => x2 => x1.concat(x2)
const mapi = f => xs => xs.map((x, i) => f(x)(i))
const ifelse = c => t => f => x => c(x) ? t(x) : f(x)
const reduce = f => z => xs => xs.reduce((acc, x) => f(acc)(x), z)
const eq = x => y => x == y
const find = f => xs => xs.find(f)
const append = x => xs => [...xs, x]
const not = f => x => !f(x)
const and = x => y => x && y
const or = x => y => x || y
const all = f => pipe(map(f), reduce(and)(true))
const any = f => pipe(map(f), reduce(or)(false))
const flip = f => x => y => f(y)(x)
const filter = f => xs => xs.filter(f)
const gt = x => y => x > y
const lt = x => y => x < y
const prop = p => o => o[p]
const both = f => g => x => f(x) && g(x)

const Color = {}
Color.I = 'cornflowerblue';
Color.O = 'tomato';
Color.T = 'mediumseagreen';
Color.S = 'gold';
Color.Z = 'mediumslateblue';
Color.J = 'darkmagenta';
Color.L = 'orange';
Color.swipe = 'deeppink';
Color[' '] = 'white';
Color['▔'] = 'white';

const Pieces = {
  I: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
  O: [[2,2],[2,2]],
  T: [[0,3,0],[3,3,3],[0,0,0]],
  S: [[0,4,4],[4,4,0],[0,0,0]],
  Z: [[0,0,0],[5,5,0],[0,5,5]],
  J: [[0,0,0],[6,6,6],[0,0,6]],
  L: [[0,0,7],[7,7,7],[0,0,0]],
}

const Piece = {}
Piece.pick = xs => xs[Math.floor(Math.random() * xs.length)]
Piece.cache = [Piece.pick(Object.keys(Pieces))]
Piece.rand = () => {
    let next = Piece.pick(Object.keys(Pieces))
    Piece.cache[0] === next ? 
        Piece.cache.push(next = Piece.pick(Object.keys(Pieces))) :
        Piece.cache.push(next);
    return Pieces[Piece.cache.shift()];
}
Piece.toStr = n => {
  switch (n) {
    case 0: return ' '; break
    case 1: return 'I'; break
    case 2: return 'O'; break
    case 3: return 'T'; break
    case 4: return 'S'; break
    case 5: return 'Z'; break
    case 6: return 'J'; break
    case 7: return 'L'; break
    case -1: return 'swipe'; break
    default: return ' '; break
  }
}

const Matrix  = {}
Matrix.sum    = pipe(map(reduce(add)(0)), reduce(add)(0))
Matrix.toStr  = x => pipe(map(join(' ')), join('\r\n'))(x)
Matrix.row    = x => m => rep(x)(m[0].length)
Matrix.frame  = m => append(Matrix.row('▔')(m))(m)
Matrix.rotate = pipe(transpose, mirror)
Matrix.make   = rows => cols => rep(rep(0)(cols))(rows)
Matrix.mount  = f => pos => m1 => m2 =>
  mapi(row => y =>
    mapi(val => x =>
      (y >= pos.y && (y - pos.y < m1.length)) &&
      (x >= pos.x && (x - pos.x < m1[0].length))
      ? f(m1[y-pos.y][x-pos.x])(m2[y][x])
      : m2[y][x]
    )(row)
  )(m2)

const Player = {}
Player.move   = d => p => ({ ...p, x:p.x+(d.x||0), y:p.y+(d.y||0) })
Player.make   = () => ({ x: 3, y: 0 , piece: Piece.rand() }),
Player.rotate = p  => ({ ...p, piece: Matrix.rotate(p.piece) })

const State          = {}
State.toMatrix       = s => Board.mount(s.player)(s.board)
State.make           = k({
  time:   0,
  wait:   15,
  board:  Matrix.make(22)(10),
  player: Player.make(),
})
State.movePlayer = f => s => {
  if (State.isAnimating(s)) return s
  let pre  = Board.mount(s.player)(s.board)
  let post = Board.mount(f(s.player))(s.board)
  let valid = Matrix.sum(pre) == Matrix.sum(post)
  if(!valid && s.player.y == 0) endGame(playing);
  return { ...s, player: valid ? f(s.player) : s.player }
}
State.moveLeft   = State.movePlayer(Player.move({ x: -1 }))
State.moveRight  = State.movePlayer(Player.move({ x: 1 }))
State.moveDown   = s => {
  if (State.isAnimating(s)) return s
  let s2 = State.movePlayer(Player.move({ y: 1 }))(s)
  return s2.player != s.player
    ? s2
    : {
      ...s,
      board:  Board.mount(s.player)(s.board),
      player: Player.make(),
    }
}
State.rotate = s =>
  State.isAnimating(s) ? s : ({
    ...s,
    player: (
      find(f =>
        Matrix.sum(Board.mount(f(s.player))(s.board)) ==
        Matrix.sum(Board.mount(s.player)(s.board))
      )([
        Player.rotate,
        pipe(Player.move({ x: 1 }), Player.rotate),
        pipe(Player.move({ x:-1 }), Player.rotate),
        pipe(Player.move({ x: 2 }), Player.rotate),
        pipe(Player.move({ x:-2 }), Player.rotate),
        id
      ])
    )(s.player)
  })
State.swipe = s => ({
  ...s,
  board: s.board.map(
    ifelse(
      all(both(flip(gt)(0))(flip(lt)(10)))
    )(
      k([18,17,16,15,14,12,14,15,16,17,18])
    )(id)
  )
})
State.score = 0;
State.clear = s => {
  let remains = filter(any(not(eq(-1))))(s.board)
  let count    = s.board.length - remains.length
  let newlines = rep(Matrix.row(0)(remains))(count)
  let board    = concat(newlines)(remains)
  if(count) {
    State.score += (count * 5) ** 2;
    scoreElement.innerText = State.score
  }
  return { ...s, board }
}
State.isAnimating = pipe(prop('board'), any(any(flip(gt)(9))))
State.animate = s => ({
  ...s,
  board: map(map(pipe(
    ifelse(flip(gt)(7))(add(1))(id),
    ifelse(flip(gt)(30))(k(-1))(id)
  )))(s.board)
})
State.timeToMove     = s => s.time % s.wait == 0
State.nextTime       = s => ({ ...s, time: s.time + 1})
State.maybeMoveDown  = ifelse(State.isAnimating)(id)(ifelse(State.timeToMove)(State.moveDown)(id))
State.next           = pipe(
  State.animate,
  State.nextTime,
  State.maybeMoveDown,
  State.clear,
  State.swipe,
)

const Board = {}
Board.mount = p => Matrix.mount(o => n => n != 0 ? n : o)(p)(p.piece)
Board.valid = b1 => b2 => Matrix.sum(b1) == Matrix.sum(b2)

//Render to canvas
const SQ = 20;
const drawSquare = (x,y,letter, flag) => {
    var context = flag ? ctx : nextCtx;
    context.fillStyle = Color[letter];
    context.fillRect(x*SQ,y*SQ,SQ,SQ);
    context.strokeStyle = "#777";
    context.strokeRect(x*SQ,y*SQ,SQ,SQ);
}
const drawBoard = (board, flag = 1) => {
  board.forEach((row,y) => {
    row.forEach((col,x) => drawSquare(x,y,col, flag))
  })
}
//init next tetro display
const blankNext = () => [0,1,2,3].forEach(i => [0,1,2,3].forEach(j => drawSquare(j,i, ' ')));
// Key events
document.addEventListener('keydown', (e) => {
  if (e.key === 'p') playing = !playing;
  switch (e.key) {
    case 'ArrowLeft': STATE = State.moveLeft(STATE);  break
    case 'ArrowRight': STATE = State.moveRight(STATE); break
    case 'ArrowDown': STATE = State.moveDown(STATE);  break
    case 'ArrowUp': STATE = State.rotate(STATE);    break
  }
});

// Game loop
var playing = true;
var STATE = State.make()
const step = () => STATE = State.next(STATE)
const show = () => {
  let boardState = pipe(State.toMatrix,map(map(Piece.toStr)),Matrix.frame)(STATE);
  drawBoard(boardState);
  let nextTetro = Pieces[Piece.cache].map(i => i.map(j => Piece.toStr(j)))
  blankNext();
  drawBoard(nextTetro, 0);
// console.log(State.movePlayer(STATE)())
  
}
setInterval(() => playing ? step() && show() : {}, 30)

//just to show boardState for debugging
// setInterval(() => { console.log(pipe(State.toMatrix,map(map(Piece.toStr)),Matrix.frame)(STATE)) }, 30000)

const endGame = (p) => {
    if(!p) return;
    console.log('Game Over.');
    var msg = document.createElement("div");
    msg.classList.add('end');
    msg.innerHTML =  '<h4>Game Over! Play again?</h4><button onclick="restart()">Restart</button>'
    document.querySelector('.score').append(msg);
    playing = false;
}

const restart = () => {
    STATE = State.make();
    let boardState = pipe(State.toMatrix,map(map(Piece.toStr)),Matrix.frame)(STATE);
    drawBoard(boardState);
    document.querySelector('.end').remove();
    playing = true;
}
