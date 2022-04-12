import React from "react";
import { useSelector } from "react-redux";
import game from "../data/game-data";

function Info() {
    useSelector((state) => state.sudoku.gameInfo);

    return (
        <div className="info-bar">
            <div className="difficulty-info">Difficulty {game.difficulty}</div>
            <div className="errors-count">
                Mistakes {game.mistakes}/{game.MAX_MISTAKES}
            </div>
            <div className="hint-count">
                Hints {game.usedHints}/{game.MAX_HINTS}
            </div>
        </div>
    );
}

export default Info;
