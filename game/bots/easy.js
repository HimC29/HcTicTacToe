export function easyBot(board, botSymbol) {
    const emptyCells = [];

    // Collect all empty board positions
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (!board[r][c]) {
                emptyCells.push([r, c]);
            }
        }
    }

    // If there are no empty cells, there is no valid bot move
    if (emptyCells.length === 0) {
        return null;
    }

    // Pick a random empty position
    const choice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return choice;
}