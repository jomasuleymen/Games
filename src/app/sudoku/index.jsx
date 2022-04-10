import React from "react";
import { useSelector } from "react-redux";

import GameInfo from "./gameInfo";
import Board from "./board";
import Control from "./control";
import Recorder from "./recorder";
import "./sudoku.scss";

import game from "./data/game-data";

function GameBody() {
    const { isPause, loadStatus } = useSelector(
        ({ sudoku }) => sudoku.gameStatus
    );
    
    const className = isPause || loadStatus ? "freeze" : null;
    
    return (
        <div id="game-body" className={className}>
            <Board />
            <Control />
        </div>
    );
}

function Sudoku() {
    React.useEffect(() => {
        game.initGame("easy", true);
    }, []);

    return (
        <div className="sudoku">
            <div className="sudoku-game">
                <GameInfo />
                <GameBody />
            </div>
            <div className="sudoku-recorder">
                <Recorder />
            </div>
        </div>
    );
}

export default Sudoku;
