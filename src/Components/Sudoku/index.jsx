import React from "react";
import { useSelector } from "react-redux";

import GameInfo from "./gameInfo";
import Board from "./board";
import Control from "./control";
import game from "./data/game-data";
import "./sudoku.scss";

function GameBody() {
    const isPaused = useSelector(({ sudoku }) => sudoku.gameStatus); // {sudoku}
    return (
        <div id="game-body" className={`${isPaused ? "pause" : null}`}>
            <Board />
            <Control />
        </div>
    );
}

function Sudoku() {

    React.useEffect(() => {
        game.initGame("easy");
    }, []);

    return (
        <div className="sudoku-game">
            <GameInfo />
            <GameBody />
        </div>
    );
}

export default Sudoku;
