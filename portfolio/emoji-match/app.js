const grid = document.querySelector('.grid')
const restart = document.querySelector('.restart')
const score = document.querySelector('h3')
restart.addEventListener('change', (e) => createBoard(e))

const state = {
    useEmojis: [],
    selection: [],
    matches: []
}

function createBoard (e) {
    grid.innerHTML = ''
    console.log(e, e.target)
    grid.classList = 'grid '+e.target.selectedOptions[0].id
    for(key in state) { state[key] = []}
    state.useEmojis = getRandomEmojis(e.target.value)
    state.useEmojis.forEach( (e, i) => {
        e.found = false
        e.position = i
        grid.innerHTML += `
        <div class='backside' 
        data-match=${e.icon} 
        data-id=${i}
        onclick='flipCard(event)'>
            <span>${e.icon}</span>
        </div>`
    })
    console.log(state.useEmojis)
}

function flipCard (event) {
    console.log(state.useEmojis)
    let emoji = state.useEmojis.filter((i, idx) => idx === +event.currentTarget.dataset.id)[0]
    console.log('emoji', emoji)
    state.selection.push(emoji)
    event.currentTarget.classList.remove('backside')
    if(state.selection.length === 2) {
        setTimeout(() => checkForMatch(event), 100)
    }
}

function checkForMatch () {
    let currentCards = state.selection
        .map(c => document.querySelector(`[data-id="${c.position}"]`))
    console.log(currentCards)
    if(state.selection[0].ref === state.selection[1].ref) {
        alert('You\'ve found a match')
        currentCards.forEach(c => c.textContent = '✅')
        state.matches.push(state.selection)
    } else {
        alert('Sorry, try again.')
        currentCards.forEach(c => (c.classList.add('backside')))
    }
    state.selection = []
    score.textContent = 'Score: ' + state.matches.length
    if(state.matches.length === state.useEmojis.length / 2) {
        score.textContent = 'Congratulations! You\'ve won!'
    }
}

createBoard({target: {value: 6, selectedOptions: [{id: 'easy'}]}})