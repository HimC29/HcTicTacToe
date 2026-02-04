import { checkWin } from "./checkWin.js";

export function mediumBot(board, botSymbol) {
    const playerSymbol = botSymbol === "x" ? "o" : "x";
    const emptyCells = [];

    // Collect all empty board positions
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (!board[r][c]) {
                emptyCells.push([r, c]);
            }
        }
    }

    // 1. Try to win for the bot
    for (const [r, c] of emptyCells) {
        board[r][c] = botSymbol;
        if (checkWin(board, botSymbol)) {
            board[r][c] = null;
            return [r, c];
        }
        board[r][c] = null;
    }

    // 2. Block the opponent from winning
    for (const [r, c] of emptyCells) {
        board[r][c] = playerSymbol;
        if (checkWin(board, playerSymbol)) {
            board[r][c] = null;
            return [r, c];
        }
        board[r][c] = null;
    }

    // 3. Otherwise, pick a random empty cell
    if (emptyCells.length === 0) {
        return null;
    }
    const choice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return choice;
}