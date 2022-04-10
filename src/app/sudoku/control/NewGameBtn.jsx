import React, { useMemo, useState } from "react";
import game from "../data/game-data";

function NewGameBtn() {
    const [showMenu, setShowMenu] = useState(false);

    const menu = useMemo(() => {
        return ["Easy", "Medium", "Hard", "Restart"];
    }, []);

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
                    {menu.map((difficulty, idx) => {
                        return (
                            <div
                                className="difficulty"
                                onClick={() => {
                                    game.initGame(
                                        difficulty.toLocaleLowerCase()
                                    );
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
