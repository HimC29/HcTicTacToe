import { checkWin } from "./checkWin.js";
import { loopCells } from "../utils.js";

function evaluate(board, botSymbol, playerSymbol) {
    if(checkWin(board, botSymbol)) return 1;
    if(checkWin(board, playerSymbol)) return -1;
    return 0;
}

function isBoardFull(board) {
    let full = true;
    loopCells((r, c) => {
        if(!board[r][c]) full = false;
    });
    return full;
}

function minimax(board, depth, isBotTurn, botSymbol, playerSymbol) {
    const score = evaluate(board, botSymbol, playerSymbol);

    if(score !== 0 || isBoardFull(board)) return score;

    if(isBotTurn) {
        let best = -Infinity;
        loopCells((r, c) => {
            if(!board[r][c]) {
                board[r][c] = botSymbol;
                best = Math.max(best,
                    minimax(
                        board, depth + 1,
                        false, botSymbol,
                        playerSymbol
                    )
                );
                // undo move
                board[r][c] = "";
            }
        });
        return best;
    }
    else {
        let best = Infinity;
        loopCells((r, c) => {
            if(!board[r][c]) {
                board[r][c] = playerSymbol;
                best = Math.min(best,
                    minimax(
                        board, depth + 1,
                        true, botSymbol,
                        playerSymbol
                    )
                );
                // undo move
                board[r][c] = "";
            }
        });
        return best;
    }
}

export function hardBot(board, botSymbol) {
    const playerSymbol = botSymbol === "x" ? "o" : "x";
    let bestScore = -Infinity;
    let bestMove = null;
    loopCells((r, c) => {
        if(!board[r][c]) {
            board[r][c] = botSymbol;
            const score = minimax(board, 0, false, botSymbol, playerSymbol);
            board[r][c] = "";

            if(score > bestScore) {
                bestScore = score;
                bestMove = [r, c];
            }
        }
    });
    return bestMove;
}