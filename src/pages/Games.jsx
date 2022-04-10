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
                        backgroundImage: `url(${require("@styles/images/sudoku.png")})`,
                    }}
                    onClick={() => navigate("/sudoku")}
                ></div>
                <div className="game-title">Sudoku</div>
            </div>
        </div>
    );
}

export default Games;
