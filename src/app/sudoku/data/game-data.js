import board from "./board-data";
import sudokuActions from "@store/sudoku/sudokuActions";
import { loadRecords, uploadResult, generateSudoku } from "../helpers/services";
class Game {
    #MAX_HINTS = 3;
    #MAX_MISTAKES = 3;

    LEVELS = ["Easy", "Medium", "Hard", "Restart"];
    STATUSES = {
        LOADING: "loading",
        PAUSE: "pause",
        FAILED: "failed",
        SUCCESS: "success",
        PLAYING: "playing",
    };

    constructor() {
        this.board = board;
        this.board.game = this;

        this.autoCheck = false;
        this.difficulty = this.LEVELS[0];
        this.resetGame();
    }

    resetGame() {
        this.timer = 0;
        this.usedHints = 0;
        this.mistakes = 0;
    }

    toggleAutoCheck() {
        this.autoCheck = !this.autoCheck;
        board.refreshBoard();
    }

    /* Play - Pause */
    toggleStatus() {
        sudokuActions.toggleStatus();
    }

    resume() {
        sudokuActions.resumeGame();
    }

    madeError() {
        this.mistakes += 1;
        sudokuActions.refreshInfoComponent();
        if (this.mistakes >= this.MAX_MISTAKES) {
            this.isFailed = true;
            sudokuActions.gameFailed();
        }
    }

    hintUsed() {
        this.usedHints += 1;
        sudokuActions.refreshInfoComponent();
    }

    get MAX_HINTS() {
        return this.#MAX_HINTS;
    }

    get MAX_MISTAKES() {
        return this.#MAX_MISTAKES;
    }

    get isPaused() {
        return sudokuActions.getCurrentStatus() === this.STATUSES.PAUSE;
    }

    refreshStatusBar() {
        sudokuActions.resetStatus();
        sudokuActions.refreshInfoComponent();
    }

    async initGame(difficulty, isStart) {
        if (isStart) {
            loadRecords().then((response) => {
                if (response && response.data)
                    sudokuActions.updateRecord(response.data);
            });
        }

        this.resetGame();
        document.getElementById("timer").innerText = "00:00";

        if (difficulty === "Restart") {
            board.restart();
            this.refreshStatusBar();
        } else {
            sudokuActions.loadingData();
            generateSudoku(difficulty).then((response) => {
                if (response && response.data) {
                    this.difficulty = difficulty;
                    board.createBoard(response.data);
                    this.refreshStatusBar();
                }
            });
        }
    }

    async finishGame() {
        if (this.mistakes < this.#MAX_MISTAKES) {
            const spentTime = this.timer;
            const data = {
                spentTime,
                difficulty: this.difficulty,
            };

            sudokuActions.loadingData();
            uploadResult(data).then((response) => {
                if (response && response.data) {
                    sudokuActions.updateRecord(response.data);
                    sudokuActions.dataVerified();
                }
            });
        }
    }
}

const game = new Game();

export default game;
