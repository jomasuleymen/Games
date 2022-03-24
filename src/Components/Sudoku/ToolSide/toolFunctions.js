import { clearSelectedCell } from "Utils/sudokuUtils";

function eraseSelectedCell() {
    clearSelectedCell();
}

function toggleNoteMode() {
    console.log("Toggle note");
}

function giveHint() {
    console.log("Hint");
}

function undo() {
    console.log("Undo");
}

export { eraseSelectedCell, toggleNoteMode, giveHint, undo };
