import React, { useState } from "react";
import { useSelector } from "react-redux";
import game from "../data/game-data";

function NewGameBtn() {
    const [showMenu, setShowMenu] = useState(false);
    const gameStatus = useSelector((store) => store.sudoku.gameStatus);

    return (
        <div className="new-game">
            <button
                onClick={() => {
                    setShowMenu(!showMenu);
                }}
            >
                New Game
            </button>
            <div className={`new-game-body ${showMenu ? "" : "hidden"}`}>
                <div className="difficulties">
                    {Object.values(game.LEVELS).map((difficulty, idx) => {
                            return (
                                <div
                                    className="difficulty"
                                    onClick={() => {
                                        game.initGame(difficulty);
                                        setShowMenu(false);
                                    }}
                                    key={idx}
                                >
                                    <span className="new-game-sudoku-icon"></span>
                                    {difficulty}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default NewGameBtn;
