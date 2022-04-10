import { setSolution, checkForErrors, revertErrors } from "@utils/sudoku-utils";
import { zeroFilledMatrix } from "@utils/arrayUtils";
import actions from "@actions/sudoku-actions";

import Note from "./note-data";
import History from "./state-data";

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
        this.initialData[row][col] = this.#solution[row][col];
        this.history.filterHistory(row, col);
        this.insertToSelectedCell(this.#solution[row][col], true);
    }

    createBoard(newBoardData) {
        newBoardData.forEach((row, index) => {
            this.currentData[index] = [...row];
            this.initialData[index] = [...row];
            this.errorData[index] = Array(9).fill(0);
        });

        this.note.clear();
        this.history.clear();

        this.selectCell(0, 0);

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
        actions.selectCell(row, col, this.getCellValue(row, col));
    }

    refreshBoard() {
        actions.refreshBoard();
    }

    insertToSelectedCell(newValue, isHint, isUndo) {
        const { row, col } = this.selectedCell;
        if (
            !isHint &&
            (this.isReadOnly(row, col) || newValue < 1 || newValue > 9)
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

                if (newValue === this.#solution[row][col]) {
                    this.checkDataForSolution();
                }
            }
        }

        this.refreshBoard();

        if (!isUndo && !isHint)
            this.history.addState(row, col, oldValue, oldNote);
    }

    eraseSelectedCell(isUndo) {
        const { row, col } = this.selectedCell;

        if (this.isReadOnly(row, col)) return;

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
        return actions.getSelectedCell();
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
