// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const cells = Array.from(board.getElementsByClassName('cell'));
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    
    let currentPlayer = 'X'; // Human player starts
    let gameActive = true;
    const boardState = ['', '', '', '', '', '', '', '', ''];
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const index = parseInt(event.target.getAttribute('data-index'));

        if (boardState[index] !== '' || !gameActive || currentPlayer === 'O') return;

        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = `${currentPlayer} Wins!`;
            gameActive = false;
            return;
        } 

        if (!boardState.includes('')) {
            status.textContent = 'It\'s a Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = 'O';
        status.textContent = `Player ${currentPlayer}'s Turn`;
        setTimeout(aiMove, 500); // Delay AI move to simulate thinking
    }

    function aiMove() {
        if (!gameActive || currentPlayer !== 'O') return;

        let availableMoves = boardState.map((value, index) => value === '' ? index : null).filter(index => index !== null);
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

        boardState[randomMove] = currentPlayer;
        cells[randomMove].textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = `${currentPlayer} Wins!`;
            gameActive = false;
            return;
        } 

        if (!boardState.includes('')) {
            status.textContent = 'It\'s a Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        boardState.fill('');
        cells.forEach(cell => cell.textContent = '');
        status.textContent = `Player ${currentPlayer}'s Turn`;
    }

    board.addEventListener('click', handleClick);
    resetButton.addEventListener('click', resetGame);

    resetGame(); // Initialize the game status
});
