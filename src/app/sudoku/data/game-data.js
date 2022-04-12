import board from "./board-data";
import sudokuActions from "@store/sudoku/sudokuActions";
import {
    loadRecords,
    uploadResult,
    generateSudoku,
    isAuth,
} from "../helpers/services";
class Game {
    #MAX_HINTS = 3;
    #MAX_MISTAKES = 3;

    LEVELS = ["Easy", "Medium", "Hard", "Restart"];

    constructor() {
        this.board = board;
        this.board.game = this;

        this.autoCheck = false;
        this.difficulty = "Easy";
        this.resetGame();
    }

    resetGame() {
        this.timer = 0;
        this.isPaused = false;
        this.usedHints = 0;
        this.mistakes = 0;
        this.isFailed = false;
    }

    toggleAutoCheck() {
        this.autoCheck = !this.autoCheck;
        board.refreshBoard();
    }

    pause() {
        sudokuActions.pauseGame();
        this.isPaused = true;
    }

    resume() {
        sudokuActions.resumeGame();
        this.isPaused = false;
    }

    /* Play - Pause */
    toggleStatus() {
        if (!this.isFailed) {
            sudokuActions.toggleStatus();
            this.isPaused = !this.isPaused;
        }
    }

    madeError() {
        this.mistakes += 1;
        sudokuActions.refreshGameInfo();
        if (this.mistakes >= this.MAX_MISTAKES) {
            this.isPaused = true;
            this.isFailed = true;
            sudokuActions.gameFailed();
        }
    }

    hintUsed() {
        this.usedHints += 1;
        sudokuActions.refreshGameInfo();
    }

    get MAX_HINTS() {
        return this.#MAX_HINTS;
    }

    get MAX_MISTAKES() {
        return this.#MAX_MISTAKES;
    }

    refreshStatusBar() {
        sudokuActions.resetStatus();
        sudokuActions.refreshGameInfo();
        this.isPaused = false;
    }

    async initGame(difficulty, isStart) {
        if (isStart && isAuth) {
            loadRecords().then(({ data }) => {
                if (data) sudokuActions.updateRecord(data);
            });
        }

        this.resetGame();
        this.isPaused = true;
        document.getElementById("timer").innerText = "00:00";

        if (difficulty === "restart") {
            board.restart();
            this.refreshStatusBar();
        } else {
            sudokuActions.loadingData();
            generateSudoku(difficulty).then(({ data }) => {
                this.difficulty = difficulty;
                board.createBoard(data);
                this.refreshStatusBar();
            });
        }
    }

    async finishGame() {
        if (this.mistakes < this.#MAX_MISTAKES) {
            const spentTime = this.timer;
            this.isPaused = true;
            const data = {
                spentTime,
                difficulty: this.difficulty,
            };

            sudokuActions.loadingData();
            uploadResult(data).then(({ data }) => {
                sudokuActions.updateRecord({ [this.difficulty]: data });
                sudokuActions.verified();
            });
        }
    }
}

const game = new Game();

export default game;
