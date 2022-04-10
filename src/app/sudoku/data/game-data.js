import httpService from "@services/httpService";

import board from "./board-data";
import sudokuActions from "@actions/sudoku-actions";

class Game {
    constructor() {
        this.board = board;
        this.timer = 0;
        this.autoCheck = false;
        this.isPaused = false;
        this.difficulty = "easy";

        this.board.game = this;
    }

    toggleAutoCheck() {
        this.autoCheck = !this.autoCheck;
        board.refreshBoard();
    }

    pause() {
        sudokuActions.pause();
        this.isPaused = true;
    }

    resume() {
        sudokuActions.resume();
        this.isPaused = false;
    }

    /* Play - Pause */
    toggleStatus() {
        sudokuActions.toggle();
        this.isPaused = sudokuActions.getStatus();
    }

    setRecords() {
        const isAuth = localStorage.getItem("x-auth-token");
        if (isAuth) {
            httpService
                .get("http://localhost:3000/sudoku/record")
                .then(({ data }) => {
                    if (data) sudokuActions.updateRecord(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    initGame(difficulty, isStart) {
        if (isStart) this.setRecords();
        this.isPaused = true;
        this.timer = 0;
        sudokuActions.resetStatus();
        document.getElementById("timer").innerText = "00:00";

        if (difficulty === "restart") {
            board.restart();
            setTimeout(() => {
                this.resume();
            }, 200);
        } else {
            sudokuActions.loadingData();
            httpService
                .get(
                    `http://localhost:3000/sudoku/generate?difficulty=${difficulty}`
                )
                .then(({ data }) => {
                    this.difficulty = difficulty;
                    board.createBoard(data);
                    sudokuActions.resetStatus();
                    setTimeout(() => {
                        this.resume();
                    }, 200);
                })
                .catch(function (error) {
                    console.log(error); // setError sudoku actions later
                });
        }
    }

    finishGame() {
        const spentTime = this.timer;
        this.isPaused = true;
        const data = {
            spentTime,
            difficulty: this.difficulty,
        };

        const isAuth = localStorage.getItem("x-auth-token");
        if (isAuth) {
            sudokuActions.loadingData();
            httpService
                .put("http://localhost:3000/sudoku/record", data)
                .then(({ data }) => {
                    sudokuActions.updateRecord({ [this.difficulty]: data });
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    sudokuActions.resetStatus();
                });
        }
    }
}

const game = new Game();

export default game;
