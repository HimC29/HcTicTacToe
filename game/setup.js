import { loopCells } from "./utils.js";

export function setupBoard() {
    const board = document.createElement("div");
    board.className = "board";
    document.body.prepend(board);

    loopCells((r, c) => {
        const cell = document.createElement("div");
        cell.classList.add("cell", "hover-cell");
        cell.id = `${r}${c}`;
        board.appendChild(cell);
    });
}