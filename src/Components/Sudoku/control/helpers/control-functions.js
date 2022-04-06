import board from "@components/sudoku/data/board-data";

function eraseSelectedCell() {
    board.eraseSelectedCell();
}

function toggleNoteMode() {
    board.note.toggle();
}

function giveHint() {
    const { row, col } = board.selectedCell;
    board.setHint(row, col);
}

function undo() {
    const prevState = board.history.popState();
    if (!prevState) return;

    const { row, col } = prevState;
    board.selectCell(row, col);
    if (prevState.value == 0) {
        board.eraseSelectedCell(true);
        board.note.setNote(row, col, prevState.note);
    } else
        board.insertToSelectedCell(prevState.value, false, true);
}

export { eraseSelectedCell, toggleNoteMode, giveHint, undo };
