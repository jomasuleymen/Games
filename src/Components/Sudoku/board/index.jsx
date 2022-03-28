import React from "react";

import board from "../data/board-data";
import game from '../data/game-data';
import {useSelector} from 'react-redux';
import Row from "./Row";

window.onkeyup = (ev) => {
    if (ev.key > 0 && ev.key < 10) {
        board.insertToSelectedCell(parseInt(ev.key));
    } else if (ev.key == "Delete" || ev.key == "Backspace") {
        board.eraseSelectedCell();
    }
};

window.onkeydown = (ev) => {
    let { row, col } = board.selectedCell;

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

function PlayButton() {
    const isPaused = useSelector(state => state.gameStatus);
    return (
        <div
            id="board_pause"
            style={{display: isPaused ? "flex" : "none"}}
            onClick={() => {
                game.resume();
            }}
        >
            <div className="sign"></div>
        </div>
    );
}

function Rows() {
    return (
        <>
            {board.currentData.map((row, rowIdx) => (
                <Row row={row} key={rowIdx} rowIndex={rowIdx} />
            ))}
        </>
    );
}
function Board() {
    return (
        <div id="board">
            <PlayButton />
            <Rows />
        </div>
    );
}

export default React.memo(Board);
