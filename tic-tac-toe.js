let currentPlayerSymbol = "X"
                    //s0 s1 s2...            s8
let squareValues =  ["","","","","","","","",""]
let gameStatus = ''

function checkGameStatus() {

// Check rows
    for(let i = 0; i < 9; i += 3) {
        if (squareValues[i] !== ''
              && squareValues[i] === squareValues[i + 1]
              && squareValues[i] === squareValues[i + 2]){
          gameStatus = squareValues[i];
          break;
        }
    }

// Check columns
    for(let i = 0; i < 3; i += 1) {
        if (squareValues[i] !== ''
            && squareValues[i] === squareValues[i + 3]
            && squareValues[i] === squareValues[i + 6]){
          gameStatus = squareValues[i];
          break;
        }
    }

// Check diagonals
    if (squareValues[0] !== ''
            && squareValues[0] === squareValues[4]
            && squareValues[0] === squareValues[8]){
          gameStatus = squareValues[0];
        }

    if (squareValues[2] !== ''
            && squareValues[2] === squareValues[4]
            && squareValues[2] === squareValues[6]){
          gameStatus = squareValues[2];
        }

// Check for a tie
    let boardIsFilled = true;
    for(let i=0; i < 9; i += 1) {
        if (squareValues[i] === '') {
            boardIsFilled = false;
            break;
        }
    }
    if (boardIsFilled) {
        gameStatus = 'None'
    }

    if (gameStatus !== '') {
        document
            .getElementById('game-status')
            .innerHTML = `Winner: ${gameStatus.toUpperCase()}`;

        document
            .getElementById('new-game')
            .disabled = false;
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

        checkGameStatus()
    });

    document.getElementById('new-game').addEventListener('click', () => {
        gameStatus = ''
        document
            .getElementById('game-status')
            .innerHTML = '';

        for(let i = 0; i < 9; i++) {
            document.getElementById('square-${i}').innerHTML = ''
        }
        currentPlayerSymbol = 'X'
        document
        .getElementById('new-game')
        .disabled = true;
        squareValues = ["","","","","","","","",""]
    })
});