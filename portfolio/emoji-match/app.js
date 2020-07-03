let emojis = [
    '🧝','🗡️','🛡️','🪓','⚔️','🏹','🐉','🧙','🧚','🧛','🧜','🧟','🧞','🐎',
    '💎','💍','👑','📜','🗝','⚗','🩸','🚪','⚰','⚱','🍺','🥖','🍄','💧','🔥'
]

let cardsChosen = []
let cardsChosenId = []
let cardsWon = []
const grid = document.querySelector('.grid')
const restart = document.querySelector('.restart')
const score = document.querySelector('h3')

restart.addEventListener('click', () => createBoard(randomEmojis()))

function randomEmojis () {
    return new Array(6).fill(Math.floor(Math.random() * emojis.length - 1))
    .flatMap(i => {
        let piece = emojis.splice(i, 1)
        return [piece, piece]
    })
    .sort(() => Math.random() < 0.5 ? 1 : -1)
}

function createBoard (emojis) {
    grid.innerHTML = ''
    emojis.forEach( (e, i) => {
        var card = document.createElement('div')
        card.textContent = ''
        card.classList.add('backside')
        card.setAttribute('data-id', i)
        card.addEventListener('click', () => flipCard(emojis, card, i))
        grid.appendChild(card)
    })
}

function flipCard (emojis, card, id) {
    cardsChosen.push(emojis[id])
    cardsChosenId.push(id)
    card.classList.remove('backside')
    card.textContent = emojis[id]
    if(cardsChosen.length === 2) {
        setTimeout(() => checkForMatch(emojis), 200)
    }
}

function checkForMatch (emojis) {
    let cards = document.querySelectorAll('[data-id]')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if(cardsChosen[0] === cardsChosen[1]) {
        alert('You\'ve found a match')
        cards[optionOneId].textContent = '✅'
        cards[optionTwoId].textContent = '✅'
        cardsWon.push(cardsChosen)
    } else {
        alert('Sorry, try again.')
        cards[optionOneId].classList.add('backside')
        cards[optionTwoId].classList.add('backside')
        cards[optionOneId].textContent = ''
        cards[optionTwoId].textContent = ''
    }
    cardsChosen = []
    cardsChosenId = []
    score.textContent = 'Score: ' + cardsWon.length
    if(cardsWon.length === emojis.length/2) {
        score.textContent = 'Congratulations! You\'ve won!'
    }
}

createBoard(randomEmojis())