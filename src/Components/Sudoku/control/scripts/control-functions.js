import { board } from "@components/sudoku/data/board-data";
import cellStore from '@stores/selectedCell';

function eraseSelectedCell() {
    board.eraseSelectedCell();
}

function toggleNoteMode() {
    board.note.toggle();
}

function giveHint() {
    const { row, col } = cellStore.getState();
    board.setHint(row, col);
}

function undo() {
    const prevState = board.history.popState();
    if (!prevState) return;

    const { row, col } = prevState;
    board.selectCell(row, col);
    if (prevState.value == 0){
        board.eraseSelectedCell(true);
        board.note.setCellNote(row, col, prevState.note);
    }else
        board.insertToSelectedCell(prevState.value, false, true);
}

export { eraseSelectedCell, toggleNoteMode, giveHint, undo };
