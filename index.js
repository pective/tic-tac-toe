const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const resetButton = document.querySelector("#restartButton")

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];

const game = (function() {
    let running = false;

    const initializeGame = function() {
        cells.forEach(cellElement => cellElement.addEventListener("click", cell.cellClicked));
        resetButton.addEventListener("click", resetGame);
        statusText.textContent = `${player.getCurrentPlayer()}'s turn`;
        running = true;
    }

    function resetGame() {
        options = ["", "", "", "", "", "", "", "", ""];
        statusText.textContent = `${player.getCurrentPlayer()}'s turn`;
        cells.forEach(cellElement => cellElement.textContent = "");
        running = true;
    }

    const isRunning = () => running;
    const setRunning = (value) => running = value;

    return {initializeGame, resetGame, isRunning, setRunning};
})();

const cell = (function() {
    const cellClicked = function() {
        const cellIndex = this.getAttribute("cellIndex");

        if(options[cellIndex] != "" || !game.isRunning()) {
            return 0;
        }

        cell.updateCell(this, cellIndex);
        player.checkWinner();
    }

    const updateCell = function(cell, index) {
        options[index] = player.getCurrentPlayer();
        cell.textContent = player.getCurrentPlayer();
    }

    return {cellClicked, updateCell};
})();

const player = (function() {
    let currentPlayer = "X";

    const getCurrentPlayer = () => currentPlayer;
    const setCurrentPlayer = (value) => currentPlayer = value;

    const changePlayer = function() {
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        statusText.textContent = `${currentPlayer}'s turn`;
    }

    function checkWinner() {
        let roundWon = false;

        for (let i = 0; i < winCombinations.length; i++) {
            const condition = winCombinations[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];

            if (cellA == "" || cellB == "" || cellC == "") continue;

            if (cellA == cellB && cellB == cellC) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `${currentPlayer} won!`;
            game.setRunning(false);
        } else if (!options.includes("")){
            statusText.textContent = "It's a draw!";
            game.setRunning(false);
        } else changePlayer();
    }
    return {getCurrentPlayer, setCurrentPlayer, changePlayer, checkWinner};
})();

game.initializeGame();