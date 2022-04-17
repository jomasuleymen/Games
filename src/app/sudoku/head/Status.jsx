import React from "react";

import game from "@app/sudoku/data/game-data";

function Status({ isPause, isToggable }) {
    return (
        <div
            id="status-icon"
            onClick={isToggable ? () => game.toggleStatus() : null}
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
