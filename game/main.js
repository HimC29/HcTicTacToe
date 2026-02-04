import { setupBoard } from "./setup.js"
import {
    createBoardVar,
    cellElToRowCol,
    isValidMove,
    updateTurnDisplay,
    detectClickOnCell,
    setMove,
    handleEndOrContinue
} from "./utils.js";
import { easyBot } from "./bots/easy.js";
import { mediumBot } from "./bots/medium.js";
import { hardBot } from "./bots/hard.js";

function passAndPlay() {
    let board = createBoardVar();
    let turn = "x";

    const turnIndicator = document.getElementById("turn");
    updateTurnDisplay(turnIndicator, turn);

    detectClickOnCell((e) => {
        if (!isValidMove(e, board)) return;
        setMove(cellElToRowCol(e), board, turn);
        // set turn to new turn and handle end or continuing
        turn = handleEndOrContinue(board, turnIndicator, turn);
    });
}

function playWithRobot(difficulty) {
    let board = createBoardVar();
    let turn = "x";
    const player = Math.random() < 0.5 ? "x" : "o";
    const bot = player === "x" ? "o" : "x";
    let botFunc;
    if(difficulty == "0") botFunc = easyBot;
    else if(difficulty == "1") botFunc = mediumBot;
    else if(difficulty == "2") botFunc = hardBot;

    const botMove = () => {
        const cell = botFunc(board, bot);
        // No valid move (board full or error) or game already over
        if (!cell || !turn) return;
        setMove(cell, board, turn);
        turn = handleEndOrContinue(board, turnIndicator, turn);
    };

    const turnIndicator = document.getElementById("turn");
    updateTurnDisplay(turnIndicator, turn);
    
    // if bot turn is first then let robot make a move
    if(bot === "x") {
        setTimeout(botMove(), 200);
    }
    // why do some people start the game with O?
    // doesn't the rules say X goes first?

    detectClickOnCell((e) => {
        if(turn !== player || !isValidMove(e, board)) return;
        setMove(cellElToRowCol(e), board, turn);

        // set turn to new turn and handle end or continuing
        turn = handleEndOrContinue(board, turnIndicator, turn);
        // let bot move after 0.6 second
        
        setTimeout(botMove, 600);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const gamemode = localStorage.getItem("gamemode");
    if (gamemode === null) {
        window.location.href = "../home/";
        return;
    }
    localStorage.removeItem("gamemode");
    setupBoard();    
    if(gamemode == "0") passAndPlay();
    else if(gamemode == "1") {
        const difficulty = localStorage.getItem("difficulty");
        if(difficulty) {
            playWithRobot(difficulty);
            localStorage.removeItem("difficulty");
        }
    };
});
