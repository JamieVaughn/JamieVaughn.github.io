let emojis = [ 
    { ref: 0, icon: '🧝' },
    { ref: 1, icon: '🗡️' },
    { ref: 2, icon: '🛡️' },
    { ref: 3, icon: '🪓' },
    { ref: 4, icon: '⚔️' },
    { ref: 5, icon: '🏹' },
    { ref: 6, icon: '🐉' },
    { ref: 7, icon: '🧙' },
    { ref: 8, icon: '🧚' },
    { ref: 9, icon: '🧛' },
    { ref: 10, icon: '🧜' },
    { ref: 11, icon: '🧟' },
    { ref: 12, icon: '🧞' },
    { ref: 13, icon: '🐎' },
    { ref: 14, icon: '💎' },
    { ref: 15, icon: '💍' },
    { ref: 16, icon: '👑' },
    { ref: 17, icon: '📜' },
    { ref: 18, icon: '🗝' },
    { ref: 19, icon: '⚗' },
    { ref: 20, icon: '🩸' },
    { ref: 21, icon: '🚪' },
    { ref: 22, icon: '⚰' },
    { ref: 23, icon: '⚱' },
    { ref: 24, icon: '🍺' },
    { ref: 25, icon: '🥖' },
    { ref: 26, icon: '🍄' },
    { ref: 27, icon: '💧' },
    { ref: 28, icon: '🔥' }
]

function getRandomEmojis (level) {
    return new Array(+level).fill(null)
    .map(() => Math.floor(Math.random() * emojis.length))
    .flatMap(i => {
        let dupe = Object.assign({}, emojis[i])
        let dupe1 = Object.assign({}, emojis[i])
        return [dupe, dupe1]
    })
    .sort(() => Math.random() <= 0.5 ? 1 : -1)
}