import {
    errNumber,
    currentData,
    isReadOnly,
    answer,
    notes,
    isCellEmpty
} from "Components/Sudoku/gameData";
import cellStore from "Stores/selectedCell";

function insertToSelectedCell(newValue) {
    const { row, col } = cellStore.getState();
    if (isReadOnly(row, col) || newValue < 1 || newValue > 9) return;
    const noteBoard = notes["noteBoard"];

    if (notes.enabled) {
        if (!(row in noteBoard)) noteBoard[row] = {};
        if (!(col in noteBoard[row])) noteBoard[row][col] = Array(9).fill(false);

        if (!isCellEmpty(row, col)) {
            revertErrors(row, col, currentData[row][col]);
            currentData[row][col] = 0;
        }
        noteBoard[row][col][newValue - 1] = !noteBoard[row][col][newValue - 1];
    } else {
        if (row in noteBoard && col in noteBoard[row])
            delete noteBoard[row][col];

        const oldValue = currentData[row][col];
        if (oldValue == newValue) {
            // toggle cell value
            clearSelectedCell();
            return;
        }

        if (!isCellEmpty(row, col)) revertErrors(row, col, oldValue);

        checkForErrors(row, col, newValue);
        currentData[row][col] = newValue;
    }

    selectCell(row, col);
}

function clearSelectedCell() {
    const { row, col } = cellStore.getState();
    const cellValue = currentData[row][col];
    if (isReadOnly(row, col)) return;
    
    const noteBoard = notes["noteBoard"];    
    if (row in noteBoard && col in noteBoard[row]){ // implement in Note class, make readable
        delete noteBoard[row][col];
    }

    if (!isCellEmpty(row, col)){
        revertErrors(row, col, cellValue);
        currentData[row][col] = 0;
    }
    selectCell(row, col);
}

function selectCell(row, col) {
    cellStore.dispatch({
        type: "select",
        payload: {
            row,
            col,
            squareRowBegin: Math.floor(row / 3) * 3,
            squareColBegin: Math.floor(col / 3) * 3,
            value: currentData[row][col],
        },
    });
}

function checkForErrors(row, col, newValue) {
    let rowSquare = Math.floor(row / 3) * 3;
    let colSquare = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {
        if (newValue == currentData[i][col] && i != row) {
            errNumber[i][col] += 1;
            errNumber[row][col] += 1;
        }

        if (newValue == currentData[row][i] && i != col) {
            errNumber[row][i] += 1;
            errNumber[row][col] += 1;
        }

        if (
            newValue == currentData[rowSquare][colSquare] &&
            rowSquare != row &&
            colSquare != col
        ) {
            errNumber[rowSquare][colSquare] += 1;
            errNumber[row][col] += 1;
        }
        colSquare += 1;

        if ((i + 1) % 3 == 0) {
            rowSquare += 1;
            colSquare = Math.floor(col / 3) * 3;
        }
    }
}

function revertErrors(row, col, value) {
    let rowSquare = Math.floor(row / 3) * 3;
    let colSquare = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {
        if (
            value == currentData[i][col] &&
            i != row &&
            currentData[i][col] != 0
        ) {
            errNumber[i][col] -= 1;
        }

        if (
            value == currentData[row][i] &&
            i != col &&
            currentData[row][i] != 0
        ) {
            errNumber[row][i] -= 1;
        }

        if (
            value == currentData[rowSquare][colSquare] &&
            rowSquare != row &&
            colSquare != col &&
            currentData[rowSquare][colSquare] != 0
        )
            errNumber[rowSquare][colSquare] -= 1;

        colSquare += 1;

        if ((i + 1) % 3 == 0) {
            rowSquare += 1;
            colSquare = Math.floor(col / 3) * 3;
        }
    }
    errNumber[row][col] = 0;
}

async function solvePuzzle(data) {
    const copyData = data.map((row) => [...row]);
    solve(copyData, 0, 0);
}

function solve(data, row, col) {
    if (row == 8 && col == 9) {
        for (let rowIndex in data) {
            answer[rowIndex] = [...data[rowIndex]];
        }
        return true;
    }

    if (col == 9) {
        row += 1;
        col = 0;
    }

    if (data[row][col] != 0) {
        return solve(data, row, col + 1);
    }

    for (let i = 1; i < 10; i++) {
        if (isValid(data, row, col, i)) {
            data[row][col] = i;
            if (solve(data, row, col + 1)) return true;
        }
    }
    data[row][col] = 0;
    return false;
}

function isValid(data, row, col, value) {
    // let rowSquare = Math.floor(row / 3) * 3;
    // let colSquare = Math.floor(col / 3) * 3;

    // for (let i = 0; i < 9; i++) {
    //     if (value == data[i][col] || value == data[row][i] || value == data[rowSquare][colSquare]) {
    //         return false;
    //     }

    //     colSquare += 1;

    //     if ((i + 1) % 3 == 0) {
    //         rowSquare += 1;
    //         colSquare = Math.floor(col / 3) * 3;
    //     }
    // }

    for (let i = 0; i < 9; i++) {
        if (data[row][i] == value && i != col) return false;

        if (data[i][col] == value && i != row) return false;
    }

    let rowParentIndex = Math.floor(row / 3) * 3;
    let colParentIndex = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
            if (rowParentIndex + i == row && colParentIndex + j == col)
                continue;

            if (data[rowParentIndex + i][colParentIndex + j] == value)
                return false;
        }
    return true;
}

export { solvePuzzle, selectCell, insertToSelectedCell, clearSelectedCell };
