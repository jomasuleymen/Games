import { errNumber, answer, currentData } from "Components/Sudoku/gameData";

function insertToCell(rowIndex, colIndex, newValue){

}

function clearCell(rowIndex, colIndex){

}



function addIfError(row, col, value, data) {
    let rowSquare = Math.floor(row/3)*3;
    let colSquare = Math.floor(col/3)*3;

    for (let i = 0; i < 9; i++) {
        if (value == data[i][col] && i != row) {
            errNumber[i][col] += 1;
            errNumber[row][col] += 1;
        }

        if (value == data[row][i] && i != col) {
            errNumber[row][i] += 1;
            errNumber[row][col] += 1;
        }

        if (
            value == data[rowSquare][colSquare] &&
            rowSquare != row &&
            colSquare != col
        ) {
            errNumber[rowSquare][colSquare] += 1;
            errNumber[row][col] += 1;
        }
        colSquare += 1;

        if ((i + 1) % 3 == 0) {
            rowSquare += 1;
            colSquare = Math.floor(col/3)*3;
        }
    }
}

function subtractIfError(row, col, value, data) {
    let rowSquare = Math.floor(row/3)*3;
    let colSquare = Math.floor(col/3)*3;

    for (let i = 0; i < 9; i++) {
        if (value == data[i][col] && i != row) {
            errNumber[i][col] -= 1;
        }

        if (value == data[row][i] && i != col) {
            errNumber[row][i] -= 1;
        }

        if (
            value == data[rowSquare][colSquare] &&
            rowSquare != row &&
            colSquare != col
        )
            errNumber[rowSquare][colSquare] -= 1;

        colSquare += 1;

        if ((i + 1) % 3 == 0) {
            rowSquare += 1;
            colSquare = Math.floor(col/3)*3;
        }
    }
    errNumber[row][col] = 0;
}

async function solvePuzzle(data) {
    const copyData = data.map((row) => [...row])
    solve(copyData, 0, 0);
}

function isValid(data, row, col, value) {
    let rowSquare = Math.floor(row/3)*3;
    let colSquare = Math.floor(col/3)*3;

    for (let i = 0; i < 9; i++) {
        if (value == data[i][col] || value == data[row][i]) {
            return false;
        }

        if (value == data[rowSquare][colSquare]) {
            return false;
        }
        colSquare += 1;

        if ((i + 1) % 3 == 0) {
            rowSquare += 1;
            colSquare = Math.floor(col/3)*3;
        }
    }
    return true;
}

async function solve(data, row, col) {
    if (row == 8 && col == 9) {
        for(let rowIndex in data){
            answer[rowIndex] = [...data[rowIndex]];
        }
        return true;
    }

    if (col == 9) {
        col = 0;
        row += 1;
    }

    if (data[row][col] != 0) {
        return solve(data, row, col + 1);
    }

    for (let i = 1; i < 10; i++) {
        if (isValid(data, row, col, i)) {
            data[row][col] = i;
            const res = solve(data, row, col + 1);
            if (res) return true;
            data[row][col] = 0;
        }
    }
    return false;
}

export { addIfError, subtractIfError, solvePuzzle };
