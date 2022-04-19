import React from "react";
import { useNavigate } from "react-router-dom";

import "@styles/games.scss";

function Games() {
    const navigate = useNavigate();

    return (
        <div id="game-categories">
            <div className="game">
                <div
                    className="game-icon"
                    style={{
                        backgroundImage: `url(${require("@components/categories/images/sudoku.png")})`,
                    }}
                    onClick={() => navigate("/sudoku")}
                ></div>
                <div className="game-title">Sudoku</div>
            </div>
            <div className="game">
                <div
                    className="game-icon"
                    style={{
                        backgroundImage: `url(${require("@components/categories/images/sudoku.png")})`,
                    }}
                    onClick={() => navigate("/15puzzle")}
                ></div>
                <div className="game-title">15 Puzzle</div>
            </div>
        </div>
    );
}

export default Games;
