async function setSolution(data, board) {
    const copyData = data.map((row) => [...row]);
    solve(copyData, 0, 0);
    board.solution = copyData;
}

function solve(data, row, col) {
    if (row == 8 && col == 9) {
        board.solution = data;
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

function isValid(data, row, col, value) { // minimize and optimize
    let rowSquare = Math.floor(row / 3) * 3;
    let colSquare = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {
        if (data[row][i] == value && i != col) return false;

        if (data[i][col] == value && i != row) return false;

        if (rowSquare == row && colSquare == col)
            continue;

        if (data[rowSquare][colSquare] == value)
            return false;

        colSquare += 1;

        if ((i + 1) % 3 == 0) {
            rowSquare += 1;
            colSquare = Math.floor(col / 3) * 3;
        }
    }

    return true;
}


function checkForErrors(row, col, currentData, errorData) {
    compute(row, col, currentData, errorData, 1);
}

function revertErrors(row, col, currentData, errorData) {
    compute(row, col, currentData, errorData, -1);
}

function compute(row, col, currentData, errorData, step) {
    const newValue = currentData[row][col];
    if (newValue == 0) return;

    let rowSquare = Math.floor(row / 3) * 3;
    let colSquare = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {
        if (newValue == currentData[i][col] && i != row) {
            errorData[i][col] += step;
            errorData[row][col] += step;
        }

        if (newValue == currentData[row][i] && i != col) {
            errorData[row][i] += step;
            errorData[row][col] += step;
        }

        if (newValue == currentData[rowSquare][colSquare] && rowSquare != row && colSquare != col) {
            errorData[rowSquare][colSquare] += step
            errorData[row][col] += step;
        }
        colSquare += 1;

        if ((i + 1) % 3 == 0) {
            rowSquare += 1;
            colSquare = Math.floor(col / 3) * 3;
        }
    }
}


export { setSolution, checkForErrors, revertErrors };
