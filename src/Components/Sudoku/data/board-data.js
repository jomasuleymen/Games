import axios from "axios";

import { solvePuzzle as setSolution } from "@utils/sudoku-utils";
import cellStore from "@stores/selectedCell";
import Note from "./note-data";
import History from "./state-data";

class Board {
    static size = 9;
    _solution = [];

    constructor() {
        this.note = new Note();
        this.history = new History();

        this.initialData = [];
        this.errNumber = [];
        this._solution = [];
        this.gameId = 0;
        this.autoCheck = false;
        this.status = 'play';

        for (let i = 0; i < 9; i++) {
            this.initialData.push(Array(9).fill(0));
            this.errNumber.push(Array(9).fill(0));
            this._solution.push(Array(9).fill(0));
        }

        this.currentData = [...this.initialData];
    }

    get data() {
        return this.currentData;
    }

    isReadOnly(row, col) {
        return this.initialData[row][col] != 0;
    }

    setHint(row, col) {
        this.initialData[row][col] = this._solution[row][col];
        this.history.filterHistory(row, col);
        this.insertToSelectedCell(this._solution[row][col], true);
    }

    clearBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this._solution[i][j] = 0;
                this.errNumber[i][j] = 0;
                this.currentData[i][j] = 0;
            }
        }
        this.note.clear();
        this.history.clear();
    }

    createBoard(newData) {
        this.clearBoard();
        newData.forEach((row, index) => {
            this.initialData[index] = [...row];
            this.currentData[index] = [...row];
        });
        setSolution(this.initialData);
        this.gameId += 1;
        this.selectCell(0, 0);
    }

    insertToSelectedCell(newValue, isHint, isUndo) {
        const { row, col } = cellStore.getState();
        if (!isHint && (this.isReadOnly(row, col) || newValue < 1 || newValue > 9)) return;

        const oldValue = this.getCellValue(row, col);
        const oldNote = this.note.getCellNote(row, col);
        
        if (this.cellHasNumber(row, col)) {
            this.setCellValue(row, col, 0);
            this.revertErrors(row, col, oldValue);
        }

        if (!isHint && this.note.isEnabled) {
            this.note.addCellNote(row, col, newValue);
        } else {
            this.note.eraseSelectedCellNote(row, col, isUndo);
            
            if (isHint || oldValue != newValue) {
                this.checkForErrors(row, col, newValue);
                this.setCellValue(row, col, newValue);
            }
        }
        
        this.selectCell(row, col);

        if (!isUndo && !isHint)
            this.history.addState(row, col, oldValue, oldNote);
    }

    eraseSelectedCell(isUndo) {
        const { row, col } = cellStore.getState();

        if (this.isReadOnly(row, col)) return;

        const oldValue = this.getCellValue(row, col);
        const oldNote = this.note.getCellNote(row, col);
        this.note.eraseSelectedCellNote(row, col);
        
        if (this.cellHasNumber(row, col)) {
            this.setCellValue(row, col, 0);
            this.revertErrors(row, col, oldValue);
        }
        
        this.selectCell(row, col);

        if (!isUndo)
            this.history.addState(row, col, oldValue, oldNote);
    }

    cellHasNumber(row, col) {
        return this.currentData[row][col] != 0;
    }

    checkForErrors(row, col, newValue) {
        let rowSquare = Math.floor(row / 3) * 3;
        let colSquare = Math.floor(col / 3) * 3;

        for (let i = 0; i < 9; i++) {
            if (newValue == this.currentData[i][col]) {
                this.errNumber[i][col] += 1;
                this.errNumber[row][col] += 1;
            }

            if (newValue == this.currentData[row][i]) {
                this.errNumber[row][i] += 1;
                this.errNumber[row][col] += 1;
            }

            if (newValue == this.currentData[rowSquare][colSquare]) {
                this.errNumber[rowSquare][colSquare] += 1;
                this.errNumber[row][col] += 1;
            }
            colSquare += 1;

            if ((i + 1) % 3 == 0) {
                rowSquare += 1;
                colSquare = Math.floor(col / 3) * 3;
            }
        }
    }

    revertErrors(row, col, value) {
        if (value == 0) return;

        let rowSquare = Math.floor(row / 3) * 3;
        let colSquare = Math.floor(col / 3) * 3;

        for (let i = 0; i < 9; i++) {
            if (value == this.currentData[i][col]) {
                this.errNumber[i][col] -= 1;
            }

            if (value == this.currentData[row][i]) {
                this.errNumber[row][i] -= 1;
            }

            if (value == this.currentData[rowSquare][colSquare])
                this.errNumber[rowSquare][colSquare] -= 1;

            colSquare += 1;

            if ((i + 1) % 3 == 0) {
                rowSquare += 1;
                colSquare = Math.floor(col / 3) * 3;
            }
        }
        this.errNumber[row][col] = 0;
    }

    getCellValue(row, col) {
        return this.currentData[row][col];
    }

    setCellValue(row, col, newValue) {
        return (this.currentData[row][col] = newValue);
    }

    hasCellError(row, col) {
        return this.errNumber[row][col] > 0;
    }

    /**
     * @param {any[][]} solution
     */
    set solution(newSolution) {
        for (let rowIndex in newSolution) {
            this._solution[rowIndex] = [...newSolution[rowIndex]];
        }
    }

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

    isValueRight(row, col) {
        return this._solution[row][col] == this.currentData[row][col];
    }

    toggleAutoCheck() {
        this.autoCheck = !this.autoCheck;
        const { row, col } = cellStore.getState();
        this.selectCell(row, col);
    }

    toggleStatus(){
        const { row, col} = cellStore.getState();
        if (this.status == 'play'){
            this.copyState = {
                currentData: this.currentData.map(row => [...row]),
                solution: this._solution.map(row => [...row]),
                errNumber: this.errNumber.map(row => [...row]),
                note: {...this.note.note},
                history: [...this.history.history],
            }
            this.clearBoard();
            this.status = 'pause';
        }else{
            this.currentData = this.copyState.currentData;
            this._solution = this.copyState.solution;
            this.errNumber = this.copyState.errNumber;
            this.note.note = this.copyState.note;
            this.history.history = this.copyState.history;
            this.status = 'play';
        }

        this.selectCell(row, col);
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
