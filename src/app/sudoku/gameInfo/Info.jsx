import React from "react";
import { useSelector } from "react-redux";
import game from "../data/game-data";

function Info() {
    useSelector((state) => state.sudoku.gameInfo);

    return (
        <div className="info-bar">
            <div className="info">
                Difficulty <span>{game.difficulty}</span>
            </div>
            <div className="info">
                Mistakes{" "}
                <span>
                    {game.mistakes}/{game.MAX_MISTAKES}
                </span>
            </div>
            <div className="info">
                Hints{" "}
                <span>
                    {game.usedHints}/{game.MAX_HINTS}
                </span>
            </div>
        </div>
    );
}

export default Info;
