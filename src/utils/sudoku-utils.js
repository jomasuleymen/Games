import {
    board
} from "@components/sudoku/data/board-data";

async function solvePuzzle(data) {
    const copyData = data.map((row) => [...row]);
    solve(copyData, 0, 0);
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

function isValid(data, row, col, value) {
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

export { solvePuzzle };
