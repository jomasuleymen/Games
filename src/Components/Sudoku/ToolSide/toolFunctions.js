import { clearSelectedCell, insertToSelectedCell } from "Utils/sudokuUtils";
import { errNumber, currentData, isReadOnly, answer, notes } from "Components/Sudoku/gameData";
import cellStore from 'Stores/selectedCell';
import { selectCell } from "../../../utils/sudokuUtils";

function eraseSelectedCell() {
    clearSelectedCell();
}

function toggleNoteMode() {
    notes.enabled = !notes.enabled;
}

function giveHint() {
    const { row, col } = cellStore.getState();
    insertToSelectedCell(answer[row][col]);
}

function undo() {
    console.log("Undo");
}

export { eraseSelectedCell, toggleNoteMode, giveHint, undo };
