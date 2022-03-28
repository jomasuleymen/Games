import React from "react";

import GameInfo from "./gameInfo";
import Board from "./board";
import Control from "./control";
import { useSelector } from "react-redux";
import game from "./data/game-data";
import "@styles/board.scss";

function GameBody() {
    const isPaused = useSelector((state) => state.gameStatus);
    return (
        <div id="game-body" className={`${isPaused ? "pause" : null}`}>
            <Board />
            <Control />
        </div>
    );
}

function Playground() {
    React.useEffect(() => {
        game.initGame("easy");
    }, []);

    return (
        <div className="game">
            <GameInfo />
            <GameBody />
        </div>
    );
}

export default Playground;
