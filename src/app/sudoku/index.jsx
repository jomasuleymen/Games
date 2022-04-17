import React from "react";
import { useSelector } from "react-redux";

import Head from "./head";
import Board from "./board";
import Control from "./control";
import Recorder from "./recorder";

import "./sudoku.scss";

import game from "./data/game-data";
import STATUSES from "@store/sudoku/gameStatuses";

function GameBody() {
    const { status } = useSelector(({ sudoku }) => sudoku.gameStatus);
    const className = status !== STATUSES.PLAYING ? "freeze" : null;

    return (
        <div id="game-body" className={className}>
            <Board />
            <Control />
        </div>
    );
}

function Sudoku() {
    React.useEffect(() => {
        game.initGame();
    }, []);

    return (
        <div className="sudoku">
            <div className="game">
                <Head />
                <GameBody />
            </div>
            <div className="sudoku-recorder">
                <Recorder />
            </div>
        </div>
    );
}

export default Sudoku;
