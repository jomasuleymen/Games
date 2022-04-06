import axios from "axios";

import board from "./board-data";
import actions from "@actions/sudoku-actions";

class Game {
    constructor() {
        this.board = board;
        this.timer = 0;
        this.autoCheck = false;
        this.isPaused = false;
    }

    toggleAutoCheck() {
        this.autoCheck = !this.autoCheck;
        board.refreshBoard();
    }

    pause() {
        actions.pause();
        this.isPaused = true;
    }

    resume() {
        actions.resume();
        this.isPaused = false;
    }

    /* Play - Pause */
    toggleStatus() {
        actions.toggle();
        this.isPaused = actions.getStatus();
    }

    initGame(difficulty) {
        this.isPaused = true;
        this.timer = 0;
        document.getElementById("timer").innerText = "00:00";

        if (difficulty == "restart") {
            board.restart();
            setTimeout(() => {
                this.resume();
            }, 300);
        } else {
            board.clearBoard();
            axios
                .get(
                    `http://localhost:3000/sudoku/generate?difficulty=${difficulty}`
                )
                .then(({ data: genData }) => {
                    board.createBoard(genData);
                    setTimeout(() => {
                        this.resume();
                    }, 300);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}

const game = new Game();

export default game;
