import { setSolution, checkForErrors, revertErrors } from "@utils/sudoku-utils";
import { zeroFilledMatrix } from "@utils/arrayUtils";
import actions from "@actions/sudoku-actions";

import Note from "./note-data";
import History from "./state-data";


class Board {
    #solution = [];

    constructor() {
        this.note = new Note();
        this.history = new History();

        this.initialData = zeroFilledMatrix();
        this.errorData = zeroFilledMatrix();
        this.#solution = zeroFilledMatrix();
        this.currentData = [...this.initialData];

        this.copyState = {};
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
        this.selectCell(0, 0);
    }

    createBoard(newData) {
        setSolution(newData, this);
        newData.forEach((row, index) => {
            this.initialData[index] = [...row];
            this.currentData[index] = [...row];
        });
        this.selectCell(0, 0);
    }

    restart(){
        this.initialData.forEach((row, index) => {
            this.currentData[index] = [...row];
            this.errorData[index] = Array(9).fill(0);
        });
        this.note.clear();
        this.history.clear();
        this.selectCell(0, 0);
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
        const { row, col } = this.selectedCell;
        const oldValue = this.getCellValue(row, col);

        if (this.isReadOnly(row, col)) return;

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

    get selectedCell(){
        return actions.getSelectedCell();
    }
}


const board = new Board();

export default board;
