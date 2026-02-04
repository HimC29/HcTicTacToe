export function createBoardVar() {
    return [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
}

const cellListeners = new Map();

function getRowCol([row, col], board) {
    if (board[row][col]) {
        return;
    }
    return [row, col];
}

export function cellElToRowCol(e) {
    const rowAndCol = e.id.split("");
    return [rowAndCol[0], rowAndCol[1]];
}

export function isValidMove(cell, board) {
    const rowAndCol = getRowCol(cellElToRowCol(cell), board);
    if (!rowAndCol) return false;
    return true;
}

export function updateTurnDisplay(turnIndicator, turn) {
    turnIndicator.textContent = `Player ${turn.toUpperCase()}'s Turn`;
}

export function detectClickOnCell(toDo) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((e) => {
        const listener = () => toDo(e);
        e.addEventListener("click", listener);
        cellListeners.set(e, listener);
    });
}

export function setMove(cell, board, turn) {
    const row = cell[0];
    const col = cell[1];
    board[row][col] = turn; // set the array at the position to X or O

    const cellEl = document.getElementById(`${row}${col}`);

    const icon = document.createElement("p");
    icon.textContent = turn;
    cellEl.appendChild(icon); // add X or Y
}

function endGame() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((e) => {
        const listener = cellListeners.get(e);
        e.removeEventListener("click", listener);
        e.classList.remove("hover-cell");
        e.style.cursor = "default";
    });

    const btn = document.createElement("button");
    btn.className = "back-btn";
    btn.textContent = "BACK";
    document.body.appendChild(btn);
    btn.addEventListener("click", () => {
        window.location.href = "../home/";
    });
}

function highlightCells(cells) {
    cells.forEach(([r, c]) => {
        const cell = document.getElementById(`${r}${c}`);
        if (cell) {
            cell.classList.add("winning-cell");
        }
    });
}

function detectEnd(board) {
    // Check columns
    for (let c = 0; c < 3; c++) {
        if (
            board[0][c] &&
            board[0][c] === board[1][c] &&
            board[1][c] === board[2][c]
        ) {
            highlightCells([[0, c], [1, c], [2, c]]);
            return board[0][c];
        }
    }

    // Check rows
    for (let r = 0; r < 3; r++) {
        if (
            board[r][0] &&
            board[r][0] === board[r][1] &&
            board[r][1] === board[r][2]
        ) {
            highlightCells([[r, 0], [r, 1], [r, 2]]);
            return board[r][0];
        }
    }

    // Check diagonals
    if (board[1][1]) {
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            highlightCells([[0, 0], [1, 1], [2, 2]]);
            return board[1][1];
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            highlightCells([[0, 2], [1, 1], [2, 0]]);
            return board[1][1];
        }
    }

    // If game not over
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (!board[r][c]) return false;
        }
    }

    return "tie";
}

export function handleEndOrContinue(board, turnIndicator, turn) {
    const result = detectEnd(board);
    if (result !== false) {
        switch (result) {
            case "x":
                turnIndicator.textContent = "Player X Wins! 🎉";
                turnIndicator.style.color = "#00d2ff";
                break;
            case "o":
                turnIndicator.textContent = "Player O Wins! 🎉";
                turnIndicator.style.color = "#3a7bd5";
                break;
            case "tie":
                turnIndicator.textContent = "It's a Tie! 🤝";
                turnIndicator.style.color = "#ffffff";
                break;
        }
        endGame();
        return;
    }

    const newTurn = turn === "x" ? "o" : "x";
    updateTurnDisplay(turnIndicator, newTurn);
    return newTurn;
}

export function loopCells(func) {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            func(r, c);
        }
    }
}