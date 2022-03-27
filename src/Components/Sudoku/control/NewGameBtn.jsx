import React, { useState } from "react";

function NewGameBtn({ startNewGame }) {

    const [display, setDisplay] = useState(false);

    return (
        <div className="new-game">
            <button onClick={() => { setDisplay(!display) }}>New Game</button>
            <div className={`new-game-body ${display ? '' : 'hidden'}`}>
                <div className="difficulties">
                    <div className="difficulty" onClick={() => { startNewGame('easy'); setDisplay(false) }}><span className="new-game-sudoku-icon"></span>Easy</div>
                    <div className="difficulty" onClick={() => { startNewGame('medium'); setDisplay(false) }}><span className="new-game-sudoku-icon"></span>Medium</div>
                    <div className="difficulty" onClick={() => { startNewGame('hard'); setDisplay(false) }}><span className="new-game-sudoku-icon"></span>Hard</div>
                    <div className="difficulty" onClick={() => { startNewGame('restart'); setDisplay(false) }}><span className="new-game-sudoku-icon"></span>Restart</div>
                </div>
            </div>
        </div>
    );
}

export default NewGameBtn;
