const grid = document.querySelector('.grid')
const restart = document.querySelector('.restart')
const score = document.querySelector('h3')
restart.addEventListener('change', (e) => createBoard(e))

const state = {
    useEmojis: [],
    selection: [],
    matches: [],
    difficulty: 'easy',
    multiplier: (key) => ({easy: 1, medium: 2, hard: 3}[key]),
    score: 0
}

function createBoard (e) {
    grid.innerHTML = ''
    score.textContent = 'Score: ' + state.score
    for(key in state) { Array.isArray(state[key]) ? state[key] = [] : null }
    console.log(state)
    state.difficulty = e.target.selectedOptions[0].id
    grid.classList = 'grid '+ state.difficulty
    state.useEmojis = getRandomEmojis(e.target.value)
    state.useEmojis.forEach( (e, i) => {
        e.unpaired = true
        e.position = i
        grid.innerHTML += `
        <div class='backside' 
        data-match=${e.icon} 
        data-id=${i}
        onclick='flipCard(event)'>
            <span>${e.icon}</span>
        </div>`
    })
}

function flipCard (event) {
    let emoji = state.useEmojis
        .filter((i, idx) => idx === +event.currentTarget.dataset.id)[0]
    state.selection.push(emoji)
    event.currentTarget.classList.remove('backside')
    if(state.selection.length === 2) {
        setTimeout(() => checkForMatch(event), 100)
    }
}

function checkForMatch () {
    let currentCards = state.selection
        .map(c => document.querySelector(`[data-id="${c.position}"]`))
    if(state.selection[0].ref === state.selection[1].ref) {
        alert('You\'ve found a match')
        currentCards.forEach(c => c.textContent = '✅')
        state.selection.forEach(i => i.unpaired = false)
        state.score += state.multiplier(state.difficulty)
    } else {
        alert('Sorry, try again.')
        currentCards.forEach(c => (c.classList.add('backside')))
    }
    state.selection = []
    score.textContent = 'Score: ' + state.score
    if(state.useEmojis.filter(i => i.unpaired).length === 0) {
        score.textContent = 'Congratulations! You\'ve won!'
    }
}

createBoard({target: {value: 6, selectedOptions: [{id: 'easy'}]}})