// initializes the player, cells, scores, and winning combos
let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]              
];
let wins = {
    X: 0,
    O: 0
};

// plays the game
function playGame(cellId) {
    const cellIndex = parseInt(cellId) - 1;
    if (cells[cellIndex] === '') {
        document.getElementById(cellId).innerText = currentPlayer;
        cells[cellIndex] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // ternary in which player name changes
        document.getElementById('turn').innerText = `Player ${currentPlayer}`; 
    }
}

// checks who the winner is or if its a draw
function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            document.getElementById('result').innerText = `Player ${cells[a]} wins!`;
            wins[cells[a]]++; 
            // adds the winnign cells to a css class to highlight it
            document.getElementById(a + 1).classList.add('winning-cell');
            document.getElementById(b + 1).classList.add('winning-cell');
            document.getElementById(c + 1).classList.add('winning-cell');
            setScore();
            disableCells(); //disable used cells that are used
            return;
        }
    }
    // checks for draw
    if (!cells.includes('')) {
        document.getElementById('result').innerText = "It's a draw!";
        alert(`Its a draw!`)

    }
}

// sets the score by changing the html using span classes
function setScore() {
    document.getElementById(currentPlayer + 'Wins').textContent = wins[currentPlayer];
    alert(`${currentPlayer} wins!`)
}

// disables cells that are used
function disableCells() { 
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`${i}`).removeAttribute('onclick');
    }
}

//restarts the game by clearing the cells 
function restart() {
    currentPlayer = 'X';
    cells = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('result').innerText = "Result:";
    document.getElementById('turn').innerText = `Player ${currentPlayer}`;
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`${i}`).innerText = '';
        document.getElementById(`${i}`).setAttribute('onclick', `playGame('${i}')`);
        // removes the highlighted class from the winning cells
        document.getElementById(`${i}`).classList.remove('winning-cell');

    }
    
}
