import React from "react";
import { useSelector } from "react-redux";

import game from "@app/sudoku/data/game-data";

function Status() {
    const { isPause } = useSelector(({ sudoku }) => sudoku.gameStatus);

    return (
        <div
            id="status-icon"
            onClick={() => {
                game.toggleStatus();
            }}
        >
            <div
                className={`play-pause-icon ${
                    isPause ? "icon-play" : "icon-pause"
                }`}
            ></div>
        </div>
    );
}

export default Status;
