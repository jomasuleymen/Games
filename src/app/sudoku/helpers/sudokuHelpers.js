async function setSolution(data, board) {
    const start = Date.now();
    const copyData = data.map((row) => [...row]);
    solve(copyData, 0, 0);
    console.log((Date.now() - start) / 1000);
    board.solution = copyData;
}

function solve(data, row, col) {
    if (row == 8 && col == 9) {
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
            data[row][col] = 0;
        }
    }
    return false;
}

function isValid(data, row, col, value) {
    for (let i = 0; i < 9; i++) {
        if (data[row][i] == value) return false;
        if (data[i][col] == value) return false;
    }

    let box_start_row = row - (row % 3);
    let box_start_col = col - (col % 3);

    for (let r = box_start_row; r < box_start_row + 3; r++)
        for (let c = box_start_col; c < box_start_col + 3; c++)
            if (data[r][c] == value) return false;

    return true;
}

function checkForErrors(row, col, currentData, errorData) {
    CheckRevertHelper(row, col, currentData, errorData, 1);
}

function revertErrors(row, col, currentData, errorData) {
    CheckRevertHelper(row, col, currentData, errorData, -1);
}

function CheckRevertHelper(row, col, currentData, errorData, step) {
    const newValue = currentData[row][col];
    if (newValue == 0) return;

    for (let i = 0; i < 9; i++) {
        if (newValue == currentData[i][col] && i != row) {
            errorData[i][col] += step;
            errorData[row][col] += step;
        }

        if (newValue == currentData[row][i] && i != col) {
            errorData[row][i] += step;
            errorData[row][col] += step;
        }
    }

    let box_start_row = row - (row % 3);
    let box_start_col = col - (col % 3);

    for (let r = box_start_row; r < box_start_row + 3; r++)
        for (let c = box_start_col; c < box_start_col + 3; c++)
            if (newValue == currentData[r][c] && r != row && c != col) {
                errorData[r][c] += step;
                errorData[row][col] += step;
            }
}

export { setSolution, checkForErrors, revertErrors };
