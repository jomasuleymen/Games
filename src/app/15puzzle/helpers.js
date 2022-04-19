function getInvCount(array) {
    let inv_count = 0;
    let size = array.length;
    for (let i = 0; i < size * size - 1; i++) {
        for (let j = i + 1; j < size * size; j++) {
            if (array[j] && array[i] && array[i] > array[j]) inv_count++;
        }
    }
    return inv_count;
}

function findBlankPosition(puzzle) {
    let size = puzzle.length;
    for (let i = size - 1; i >= 0; i--)
        for (let j = size - 1; j >= 0; j--)
            if (puzzle[i][j] == 0) return size - i;
}

function isSolvable(puzzle) {
    let invCount = getInvCount(puzzle);
    let size = puzzle.length;

    if (size & 1) return !(invCount & 1);
    else {
        let pos = findBlankPosition(puzzle);
        if (pos & 1) return !(invCount & 1);
        else return invCount & 1;
    }
}

export function generateBoard(size) {
    const array = [];
    for (let i = 0; i < size * size; i++) array.push(i);
    array.sort(() => Math.random() - 0.5);

    const board = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) row.push(array[i * size + j]);
        board.push(row);
    }

    if (isSolvable(board)) {
        let oneIndex = 0;
        let twoIndex = 0;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] == 1) oneIndex = [i, j];
                if (board[i][j] == 2) twoIndex = [i, j];
            }
        }

        board[oneIndex[0]][oneIndex[1]] = 2;
        board[twoIndex[0]][twoIndex[1]] = 1;
    }
    return board;
}
