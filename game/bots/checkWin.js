export function checkWin(board, p) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === p && board[i][1] === p && board[i][2] === p) return true;
        if (board[0][i] === p && board[1][i] === p && board[2][i] === p) return true;
    }

    if (board[0][0] === p && board[1][1] === p && board[2][2] === p) return true;
    if (board[0][2] === p && board[1][1] === p && board[2][0] === p) return true;

    return false;
}

