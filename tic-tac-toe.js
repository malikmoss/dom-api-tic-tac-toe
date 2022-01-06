const key = 'tic-tac-toe-game-state'
let currentPlayerSymbol = "X"
let squareValues =  ["","","","","","","","",""]
let gameStatus = ''

//for every time the game state changes, we call this to save the game state
function saveGameState() {
    const state = {
        currentPlayerSymbol,
        squareValues,
        gameStatus
    }
    window.localStorage.setItem(key, JSON.stringify(state));
}

//we call this when the dom Ccontent is loaded
function loadGameState() {
    const savedState = window.localStorage.getItem(key);
    if (savedState === null) return;

 // pulling out values from stored stated and setting them on values below   
    const state = JSON.parse(savedState);
    currentPlayerSymbol = state.currentPlayerSymbol;
    squareValues = state.squareValues;
    gameStatus = state.gameStatus;

    //update status on each of boards squares based on values in sqaure values array
    for(let i = 0; i < 9; i++) {
        if (squareValues !== '') {
            const img = document.createElement('img');
            img.src = `../player-${squareValues[i]}.svg`
            document
                .getElementById(`square-${i}`)
                .appendChild(img)
        }
    }

    //updating status of remaining elements 
    if (gameStatus !== '') {
        document
            .getElementById('game-status')
            .innerHTML = `Winner: ${gameStatus.toUpperCase()}`;

        document
            .getElementById('new-game')
            .disabled = false;

        document
            .getElementById('give-up')
            .disabled = true;
    } else {
        document
            .getElementById('game-status')
            .innerHTML = '';

        document
            .getElementById('new-game')
            .disabled = true;

        document
            .getElementById('give-up')
            .disabled = false; 
    }
}

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

        document
            .getElementById('give-up')
            .disabled = true;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadGameState();

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

        checkGameStatus();
        saveGameState();
    });

    document.getElementById('new-game').addEventListener('click', () => {
        gameStatus = ''
        document
            .getElementById('game-status')
            .innerHTML = '';

        for(let i = 0; i < 9; i++) {
            document.getElementById(`square-${i}`).innerHTML = ''
        }
        
        currentPlayerSymbol = 'X'
        
        document
            .getElementById('new-game')
            .disabled = true;
        squareValues = ["","","","","","","","",""]

        document
            .getElementById('give-up')
            .disabled = false;
    saveGameState()
    })

    document.getElementById('give-up').addEventListener('click', () => {
        
        if (currentPlayerSymbol === 'X') {
            gameStatus = 'O'
        } else {
            gameStatus = 'X'
        }
        document
            .getElementById('game-status')
            .innerHTML = `Winner: ${gameStatus.toUpperCase()}`

        document
            .getElementById('give-up')
            .disabled = true;

        document
            .getElementById('new-game')
            .disabled = false;

    saveGameState()
    })
});