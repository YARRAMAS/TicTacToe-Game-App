const cells = document.querySelectorAll(".cell");
const messageElement = document.getElementById("message");
const resetButton = document.getElementById("reset-button");
const overlay = document.getElementById("overlay");
const overlayMessage = document.getElementById("overlay-message");
const newGameButton = document.getElementById("new-game-button");
let currentPlayer = "X";
let board = Array(9).fill(null);
let gameActive = true;

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

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            showEndScreen(`Player ${board[a]} Wins!`);
            gameActive = false;
            return;
        }
    }

    // Check for draw
    if (!board.includes(null)) {
        showEndScreen("It's a Draw!");
        gameActive = false;
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    // Change the cell color based on the player
    event.target.classList.add(`player-${currentPlayer.toLowerCase()}`);

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        messageElement.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function showEndScreen(message) {
    overlayMessage.textContent = message;
    overlay.classList.remove("hidden");
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("player-x", "player-o"); // Reset player classes
    });
    currentPlayer = "X";
    gameActive = true;
    overlay.classList.add("hidden");
    messageElement.textContent = `Player ${currentPlayer}'s Turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);

resetGame();  // Initialize game
