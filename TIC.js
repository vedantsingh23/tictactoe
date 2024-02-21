let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

function ttt(cellId) {
    const cellIndex = parseInt(cellId) - 1;
    if (cells[cellIndex] === '') {
        document.getElementById(cellId).innerText = currentPlayer;
        cells[cellIndex] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('turn').innerText = `Player ${currentPlayer}`;
    }
}

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            document.getElementById('result').innerText = `Player ${cells[a]} wins!`;
            disableCells();
            return;
        }
    }
    if (!cells.includes('')) {
        document.getElementById('result').innerText = "It's a draw!";
    }
}

function disableCells() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`${i}`).removeAttribute('onclick');
    }
}

function restart() {
    currentPlayer = 'X';
    cells = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('result').innerText = "Result:";
    document.getElementById('turn').innerText = `Player ${currentPlayer}`;
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`${i}`).innerText = '';
        document.getElementById(`${i}`).setAttribute('onclick', `ttt('${i}')`);
    }
}