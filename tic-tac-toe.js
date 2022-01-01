let currentPlayerSymbol = "X"
let squareValues =  ["","","","","","","","",""]

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tic-tac-toe-board').addEventListener('click', event => {
        console.log('A square is clicked:', e.target.id)
        const targetId = e.target.id;

        if(!target.startsWith('square-')) return;

        const squareIndex = Number.parseInt(targetId[targetId.length - 1])

        if (squareValues[squareIndex] !== '') return;

        const img = document.createElement('img');
        img.src = `../player-${currentPlayerSymbol}.svg`
        e.target.appendChild(img)

        squareValues[squareIndex] = currentPlayerSymbol;

        if (currentpLAYERsYMBOL ==='X') {
            currentPlayerSymbol = 'O';
        } else {
            currentPlayerSymbol = 'X'
        }
    })
});