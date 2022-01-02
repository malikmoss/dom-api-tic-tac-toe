let currentPlayerSymbol = "X"
let squareValues =  ["","","","","","","","",""]
let gameStatus = ''

function checkGameStatus() {
    
    for(let i = 0; i < 9; i += 3) {
        if (squareValues[i] !== ''
              && squareValues[i] === squareValues[i + 1]
              && squareValues[i] === squareValues[i + 2]){
          gamesStatus = squareValues[i];
          break;
        }
    }

    for(let i = 0; i < 3; i += 1) {
        if (squareValues[i] !== ''
            && squareValues[i] === squareValues[i + 3]
            && squareValues[i] === squareValues[i + 6]){
          gamesStatus = squareValues[i];
          break;
        }
    }

    if (squareValues[0] !== ''
            && squareValues[0] === squareValues[4]
            && squareValues[0] === squareValues[8]){
          gamesStatus = squareValues[0];
        }

    if (squareValues[2] !== ''
            && squareValues[2] === squareValues[4]
            && squareValues[2] === squareValues[6]){
          gamesStatus = squareValues[2];
        }

    let boardIsFilled = true;
    for(let i=0; i < 9; i += 1) {
        if (squareValues[i] === '') {
            boardIsFilled = false;
            break;
        }
        if (boardIsFilled) {
            gameStatus = 'None'
        }
    }

    if (gameStatus !== '') {
        document
            .getElementById('game-status-message')
            .innerHTML = `Winner: ${gameStatus.toUpperCase()}`
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tic-tac-toe-board').addEventListener('click', e => {
        
        const targetId = e.target.id;
        console.log('the target is :', targetId)

        if(!targetId.startsWith('square-')) return;

        const squareIndex = Number.parseInt(targetId[targetId.length - 1])
        console.log('this is the squareIndex', squareIndex)

        if (squareValues[squareIndex] !== '') return;

        const img = document.createElement('img');
        img.src = `../player-${currentPlayerSymbol}.svg`
        e.target.appendChild(img)

        squareValues[squareIndex] = currentPlayerSymbol;

        if (currentPlayerSymbol === 'X') {
            currentPlayerSymbol = 'O';
        } else {
            currentPlayerSymbol = 'X'
        }
    });
});