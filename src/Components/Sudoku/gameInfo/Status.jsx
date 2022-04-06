import React from "react";
import game from "@components/sudoku/data/game-data";
import { useSelector } from "react-redux";

function Status() {
    const isPaused = useSelector(({sudoku}) => sudoku.gameStatus);

    return (
        <div
            id="status-icon"
            onClick={() => {
                game.toggleStatus();
            }}
        >
            <div
                className={`play-pause-icon ${
                    isPaused ? "icon-play" : "icon-pause"
                }`}
            ></div>
        </div>
    );
}

export default Status;
