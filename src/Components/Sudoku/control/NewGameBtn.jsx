import React, { useState } from "react";
import game from "../data/game-data";

function NewGameBtn() {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="new-game">
            <button onClick={() => { setShowMenu(!showMenu) }}>New Game</button>
            <div className={`new-game-body ${showMenu ? '' : 'hidden'}`}>
                <div className="difficulties">
                    <div className="difficulty" onClick={() => { game.initGame('easy'); setShowMenu(false) }}><span className="new-game-sudoku-icon"></span>Easy</div>
                    <div className="difficulty" onClick={() => { game.initGame('medium'); setShowMenu(false) }}><span className="new-game-sudoku-icon"></span>Medium</div>
                    <div className="difficulty" onClick={() => { game.initGame('hard'); setShowMenu(false) }}><span className="new-game-sudoku-icon"></span>Hard</div>
                    <div className="difficulty" onClick={() => { game.initGame('restart'); setShowMenu(false) }}><span className="new-game-sudoku-icon"></span>Restart</div>
                </div>
            </div>
        </div>
    );
}

export default NewGameBtn;
