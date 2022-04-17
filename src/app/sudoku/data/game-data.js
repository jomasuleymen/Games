import board from "./board-data";
import sudokuActions from "@store/sudoku/sudokuActions";
import { loadRecords, uploadResult, generateSudoku } from "../helpers/services";
import toast from "@utils/toast";
import userActions from "@store/auth/userActions";
import STATUSES from "@store/sudoku/gameStatuses";

class Game {
    #MAX_HINTS = 3;
    #MAX_MISTAKES = 3;

    LEVELS = {
        EASY: "Easy",
        MEDIUM: "Medium",
        HARD: "Hard",
        RESTART: "Restart",
    };

    constructor() {
        this.board = board;
        this.board.game = this;

        this.autoCheck = true;
        this.difficulty = this.LEVELS.EASY;
        this.resetGame();
    }

    resetGame() {
        this.timer = 0;
        this.usedHints = 0;
        this.mistakes = 0;
        const timerEl = document.getElementById("timer");
        if (timerEl) timerEl.innerText = "00:00";
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
        sudokuActions.refreshInfoBar();
        if (this.mistakes >= this.MAX_MISTAKES) {
            sudokuActions.gameFailed();
        }
    }

    hintUsed() {
        this.usedHints += 1;
        sudokuActions.refreshInfoBar();
    }

    get MAX_HINTS() {
        return this.#MAX_HINTS;
    }

    get MAX_MISTAKES() {
        return this.#MAX_MISTAKES;
    }

    get isPlaying() {
        return sudokuActions.getCurrentStatus() === STATUSES.PLAYING;
    }

    refreshStatusBar() {
        sudokuActions.resetStatus();
        sudokuActions.refreshInfoBar();
    }

    async initGame(difficulty) {
        if (sudokuActions.getCurrentStatus() === STATUSES.LOADING) return;

        difficulty = difficulty || this.LEVELS.EASY;

        if (!sudokuActions.isRecordLoaded()) {
            loadRecords((response) => {
                sudokuActions.setRecords(response.data);
            });
        }

        this.resetGame();
        if (difficulty === this.LEVELS.RESTART) {
            board.restart();
            this.refreshStatusBar();
        } else {
            sudokuActions.loadingData();
            generateSudoku(difficulty, (response) => {
                this.difficulty = difficulty;
                board.createBoard(response.data);
                this.refreshStatusBar();
            });
        }
    }

    async finishGame() {
        const data = {
            spentTime: this.timer,
            difficulty: this.difficulty,
        };

        if (userActions.isAuth()) {
            sudokuActions.loadingData();
            uploadResult(data, (response) => {
                sudokuActions.updateRecord(this.difficulty, response.data);
                sudokuActions.dataVerified();
            });
        } else {
            sudokuActions.dataVerified();
            toast.warning("Please login for saving your records");
        }
    }
}

const game = new Game();

export default game;
