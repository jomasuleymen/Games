import board from "@components/sudoku/data/board-data";

function eraseSelectedCell() {
    board.eraseSelectedCell();
}

function toggleNoteMode() {
    board.note.toggle();
}

function giveHint() {
    board.setHint();
}

function undo() {
    board.loadPrevState();
}

export { eraseSelectedCell, toggleNoteMode, giveHint, undo };
