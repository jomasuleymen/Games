import axios from "axios";

import board from "./board-data";
import stores from "@stores/stores";

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
        stores.dispatch({ type: 'pause' });
        this.isPaused = true;
    }

    resume() {
        stores.dispatch({ type: 'resume' });
        this.isPaused = false;
    }

    /* Play - Pause */
    toggleStatus() {
        stores.dispatch({ type: 'toggle' });
        this.isPaused = stores.getState().gameStatus;
    }

    initGame(difficulty) {
        document.getElementById('timer').innerText = '00:00';
        this.isPaused = true;
        this.timer = 0;
        
        if (difficulty == "restart") {
            board.restart();
            setTimeout(() => {
                this.resume();
            }, 300);
        } else {
            board.clearBoard();
            axios
                .get(
                    `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
                )
                .then((resData) => {
                    board.createBoard(resData.data["board"]);
                    setTimeout(() => {
                        this.resume();
                    }, 300);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
}

const game = new Game();

export default game;
