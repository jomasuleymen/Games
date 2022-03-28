import axios from "axios";

import { setSolution, checkForErrors, revertErrors } from "@utils/sudoku-utils";
import { zeroFilledMatrix } from "@utils/arrayUtils";
import cellStore from "@stores/selectedCell";
import Note from "./note-data";
import History from "./state-data";


class Board {
    static size = 9;
    #solution = []; // make private

    constructor() {
        this.note = new Note();
        this.history = new History();

        this.initialData = zeroFilledMatrix();
        this.errorData = zeroFilledMatrix();
        this.#solution = zeroFilledMatrix();
        this.currentData = [...this.initialData];

        this.copyState = {};

        this.isPaused = false; // to game data
    }

    isReadOnly(row, col) {
        return this.initialData[row][col] != 0;
    }

    setHint(row, col) {
        this.initialData[row][col] = this.#solution[row][col];
        this.history.filterHistory(row, col);
        this.insertToSelectedCell(this.#solution[row][col], true);
    }

    clearBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.#solution[i][j] = 0;
                this.errorData[i][j] = 0;
                this.currentData[i][j] = 0;
            }
        }
        this.note.clear();
        this.history.clear();
    }

    createBoard(newData) {
        this.clearBoard();
        setSolution(newData, this);
        newData.forEach((row, index) => {
            this.initialData[index] = [...row];
            this.currentData[index] = [...row];
        });
        this.refreshBoard();
    }

    /**
     * @param {any[][]} newSolution
     */
    set solution(newSolution) {
        for (let rowIndex in newSolution) {
            this.#solution[rowIndex] = [...newSolution[rowIndex]];
        }
    }

    isValueCorrect(row, col) {
        return this.#solution[row][col] == this.currentData[row][col];
    }

    toggleAutoCheck() {
        this.autoCheck = !this.autoCheck;
        this.refreshBoard();
    }

    /* Play - Pause */
    toggleStatus() {
        this.isPaused = !this.isPaused;
        this.refreshBoard();
    }

    /* Cell functions */
    cellHasNumber(row, col) {
        return this.currentData[row][col] != 0;
    }

    getCellValue(row, col) {
        return this.currentData[row][col];
    }

    hasCellError(row, col) {
        return this.errorData[row][col] > 0;
    }

    setCellValue(row, col, newValue) {
        this.currentData[row][col] = newValue;
    }

    /* Cell functions with refresh board */
    selectCell(row, col) {
        cellStore.dispatch({
            type: "select",
            payload: {
                row,
                col,
                squareRowBegin: Math.floor(row / 3) * 3,
                squareColBegin: Math.floor(col / 3) * 3,
                value: this.getCellValue(row, col),
            },
        });
    }

    refreshBoard() {
        cellStore.dispatch({ type: "refresh" });
    }

    insertToSelectedCell(newValue, isHint, isUndo) {
        const { row, col } = cellStore.getState();
        if (!isHint && (this.isReadOnly(row, col) || newValue < 1 || newValue > 9)) return;

        const oldValue = this.getCellValue(row, col);
        const oldNote = [...this.note.getNote(row, col)];

        if (this.cellHasNumber(row, col)) {
            revertErrors(row, col, this.currentData, this.errorData);
            this.setCellValue(row, col, 0);
        }

        if (isHint || !this.note.isEnabled) {
            this.note.eraseNote(row, col);

            if (isHint || oldValue != newValue) {
                this.setCellValue(row, col, newValue);
                checkForErrors(row, col, this.currentData, this.errorData);
            }
        } else {
            this.note.addNote(row, col, newValue);
        }

        this.refreshBoard();

        if (!isUndo && !isHint)
            this.history.addState(row, col, oldValue, oldNote);
    }

    eraseSelectedCell(isUndo) {
        const { row, col } = cellStore.getState();

        if (this.isReadOnly(row, col)) return;

        const oldValue = this.getCellValue(row, col);
        const oldNote = [...this.note.getNote(row, col)];
        
        this.note.eraseNote(row, col);

        if (this.cellHasNumber(row, col)) {
            revertErrors(row, col, this.currentData, this.errorData);
            this.setCellValue(row, col, 0);
        }

        this.refreshBoard();

        if (!isUndo)
            this.history.addState(row, col, oldValue, oldNote);
    }
}


const board = new Board();

function initGame(difficulty) {
    if (difficulty == 'restart') {
        board.createBoard(board.initialData); // optimize later
    }
    else {
        axios
            .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
            .then((resData) => {
                board.createBoard(resData.data["board"]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export { board, initGame };
