import {
    setSolution,
    checkForErrors,
    revertErrors,
} from "@app/sudoku/helpers/sudokuHelpers";
import { zeroFilledMatrix } from "@utils/arrayUtils";
import sudokuActions from "@store/sudoku/sudokuActions";

import Note from "./note-data";
import History from "./state-history";

class Board {
    #solution = zeroFilledMatrix();

    constructor() {
        this.note = new Note();
        this.history = new History();

        this.initialData = zeroFilledMatrix();
        this.currentData = zeroFilledMatrix();
        this.errorData = zeroFilledMatrix();

        this.errorsNum = 0;
        this.game = null;
    }

    isReadOnly(row, col) {
        return this.initialData[row][col] != 0;
    }

    setHint() {
        const { row, col } = this.selectedCell;
        if (
            !this.isReadOnly(row, col) &&
            this.game.usedHints < this.game.MAX_HINTS &&
            this.game.isPlaying
        ) {
            this.initialData[row][col] = this.#solution[row][col];
            this.history.filterHistory(row, col);
            this.insertToSelectedCell(this.#solution[row][col], true);
            this.game.hintUsed();
        }
    }

    createBoard(newBoardData) {
        newBoardData.forEach((row, index) => {
            this.currentData[index] = [...row];
            this.initialData[index] = [...row];
            this.errorData[index] = Array(9).fill(0);
        });

        this.note.clear();
        this.history.clear();

        sudokuActions.selectCell(0, 0);
        this.refreshBoard();

        if (newBoardData !== this.initialData) {
            setSolution(newBoardData, this);
        }
    }

    restart() {
        this.createBoard(this.initialData);
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

    /* Cell functions with refreshing board */
    selectCell(row, col) {
        if (this.game.isPlaying)
            sudokuActions.selectCell(row, col, this.getCellValue(row, col));
    }

    refreshBoard() {
        sudokuActions.refreshBoard();
    }

    insertToSelectedCell(newValue, isHint, isUndo) {
        const { row, col } = this.selectedCell;
        if (
            (!isHint &&
                (this.isReadOnly(row, col) || newValue < 1 || newValue > 9)) ||
            !this.game.isPlaying
        )
            return;

        const oldValue = this.getCellValue(row, col);
        const oldNote = [...this.note.getNote(row, col)];

        if (this.cellHasNumber(row, col)) {
            revertErrors(row, col, this.currentData, this.errorData);
            this.setCellValue(row, col, 0);
        }

        if (this.note.isEnabled && !isHint) {
            this.note.addNote(row, col, newValue);
        } else {
            this.note.eraseNote(row, col);

            if (isHint || oldValue != newValue) {
                this.setCellValue(row, col, newValue);
                checkForErrors(row, col, this.currentData, this.errorData);

                if (!isUndo)
                    if (newValue === this.#solution[row][col]) {
                        this.checkDataForSolution();
                    } else {
                        this.game.madeError();
                    }
            }
        }

        this.refreshBoard();

        if (!isUndo && !isHint)
            this.history.addState(row, col, oldValue, oldNote);
    }

    eraseSelectedCell(isUndo) {
        const { row, col } = this.selectedCell;

        if (this.isReadOnly(row, col) || !this.game.isPlaying) return;

        const oldValue = this.getCellValue(row, col);
        const oldNote = [...this.note.getNote(row, col)];

        this.note.eraseNote(row, col);

        if (this.cellHasNumber(row, col)) {
            revertErrors(row, col, this.currentData, this.errorData);
            this.setCellValue(row, col, 0);
        }

        this.refreshBoard();
        if (!isUndo) this.history.addState(row, col, oldValue, oldNote);
    }

    loadPrevState() {
        if (!this.game.isPlaying) return;

        const prevState = this.history.popState();
        if (!prevState) return;

        const { row, col } = prevState;

        this.selectCell(row, col);
        if (prevState.notes) {
            this.eraseSelectedCell(true);
            this.note.setNote(row, col, prevState.notes);
        } else if (prevState.value == 0) this.eraseSelectedCell(true);
        else this.insertToSelectedCell(prevState.value, false, true);
    }

    get selectedCell() {
        return sudokuActions.getSelectedCell();
    }

    /* logic */

    checkDataForSolution() {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                if (this.#solution[i][j] != this.currentData[i][j]) return;

        this.game.finishGame();
    }
}

const board = new Board();

export default board;
