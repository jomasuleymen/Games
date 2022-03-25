import React from "react";

function NewGame({ newGame }) {
    return (
        <div className="newGame">
            <button onClick={newGame}>New Game</button>
        </div>
    );
}

export default NewGame;
