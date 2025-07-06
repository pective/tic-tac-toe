const Gameboard = function() {
    const board = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
}
const Cell = function(player) {
    let value = 0;

    value = player

    return value;
}

const Player = function() {
    const players = ["player1", "player2"];
    let currentPlayer = players[0];

    const getPlayers = () => players;

    const switchPlayer = function() {
        return currentPlayer === players[0] ? players[1] : players[0]
    }

    return { getPlayers, switchPlayer };
}

const GameControl = function() {

}