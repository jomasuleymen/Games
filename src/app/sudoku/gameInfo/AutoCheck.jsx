import React from "react";

import game from "@app/sudoku/data/game-data";

function AutoCheck() {
    return (
        <div className="auto-check">
            <span className="text">Auto-Check for Mistakes</span>
            <input type="checkbox" id="checkMistakes" />
            <label
                htmlFor="checkMistakes"
                onClick={() => {
                    game.toggleAutoCheck();
                }}
            ></label>
        </div>
    );
}

export default AutoCheck;
