import React from "react";

import GameInfo from "./gameInfo";
import Board from "./board";
import Control from "./control";

import { initGame } from "./data/board-data";
import "@styles/board.scss";

function Playground() {
    const newGame = React.useCallback((difficulty) => {
        initGame(difficulty);
    }, []);

    React.useEffect(() => {
        newGame('easy');
    }, []);

    return (
        <div className="game">
            <GameInfo />
            <div className="game-body">
                <Board />
                <Control startNewGame={newGame} />
            </div>
        </div>
    );
}

export default Playground;
