const statusDisplay = document.querySelector('.status');

let game = true;
let Player = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${Player} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const PlayerTurn = () => `It's ${Player}'s turn`;

statusDisplay.innerHTML = PlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function CellPlayed(clicked, clickedCell) {
    gameState[clickedCell] = Player;
    clicked.innerHTML = Player;
}

function PlayerChange() {
    Player = Player === "X" ? "O" : "X";
    statusDisplay.innerHTML = PlayerTurn();
}

function Result() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        game = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        game = false;
        return;
    }

    PlayerChange();
}

function CellClick(clickedCellEvent) {
    const clicked = clickedCellEvent.target;
    const clickedCell = parseInt(clicked.getAttribute('data-cell-index'));

    if (gameState[clickedCell] !== "" || !game) {
        return;
    }

    CellPlayed(clicked, clickedCell);
    Result();
}

function RestartGame() {
    game = true;
    Player = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = PlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', CellClick));
document.querySelector('.restart').addEventListener('click', RestartGame);