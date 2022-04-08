import React from "react";
import {useSelector} from 'react-redux';

import board from "../data/board-data";
import game from '../data/game-data';
import Grid from "./Grid";

import './board.scss';

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

function ResumePause() {
    const isPaused = useSelector(({sudoku}) => sudoku.gameStatus);
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

function Board() {
    return (
        <div id="board">
            <ResumePause />
            <Grid/>
        </div>
    );
}

export default React.memo(Board);
