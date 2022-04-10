import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import board from "../data/board-data";
import game from "../data/game-data";
import Grid from "./Grid";
import { setOnkeyDown, setOnkeyUp } from "@utils/windowListeners";

import "./board.scss";

const onkeyup = (ev) => {
    if (ev.key > 0 && ev.key < 10) {
        board.insertToSelectedCell(parseInt(ev.key));
    } else if (ev.key == "Delete" || ev.key == "Backspace") {
        board.eraseSelectedCell();
    }
};

const onkeydown = (ev) => {
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
    return (
        <div
            id="board_pause"
            onClick={() => {
                game.resume();
            }}
        >
            <div className="sign"></div>
        </div>
    );
}

function Loader({ data: loadStatus }) {
    let className = "circle-loader";
    if (loadStatus == "loaded") className += " load-complete";
    return (
        <div className={className}>
            <div
                className="checkmark"
                style={{ display: loadStatus == "loaded" ? "block" : "none" }}
            ></div>
        </div>
    );
}

function BoardStatus() {
    const { isPause, loadStatus } = useSelector(
        ({ sudoku }) => sudoku.gameStatus
    );

    if (loadStatus) return <Loader loadStatus={loadStatus} />;
    if (isPause) return <ResumePause />;
    return null;
}

function Board() {

    useEffect(() => {
        const resetKeyUp = setOnkeyUp(onkeyup);
        const resetKeyDown = setOnkeyDown(onkeydown);

        return () => {
            resetKeyDown();
            resetKeyUp();
        }
    }, [])

    return (
        <div id="board" className="finish">
            <BoardStatus />
            <Grid />
        </div>
    );
}

export default React.memo(Board);
