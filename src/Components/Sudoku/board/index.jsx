import React from "react";

import selectedCell from "@stores/selectedCell";

import { board } from "../data/board-data";

import Row from "./Row";

window.onkeyup = (ev) => {
    if (ev.key > 0 && ev.key < 10) {
        board.insertToSelectedCell(parseInt(ev.key));
    } else if (ev.key == "Delete" || ev.key == "Backspace") {
        board.eraseSelectedCell();
    }
};

window.onkeydown = (ev) => {
    let { row, col } = selectedCell.getState();

    switch (ev.key) {
        case "ArrowUp": {
            if (row > 0) row -= 1;
            break;
        }

        case "ArrowRight": {
            if (col < 8) col += 1;
            break;
        }

        case "ArrowDown": {
            if (row < 8) row += 1;
            break;
        }

        case "ArrowLeft": {
            if (col > 0) col -= 1;
            break;
        }

        default:
            return;
    }
    board.selectCell(row, col);
};
function Board() {
    return (
        <div id="board">
            <div id="board_pause" onClick={ () => { 
                document.getElementsByClassName('status-icon')[0].click();
             }}>
                <div className="sign"></div>
            </div>
            {board.currentData.map((row, rowIdx) => (
                <Row row={row} key={rowIdx} rowIndex={rowIdx} />
            ))}
        </div>
    );
}

export default Board;
