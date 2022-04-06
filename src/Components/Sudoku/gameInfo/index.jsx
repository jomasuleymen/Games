import React from "react";

import AutoCheck from "./AutoCheck";
import Timer from './Timer';

import "./gameInfo.scss";

function GameInfo() {
    return (
        <div className="game-info">
            <AutoCheck />
            <Timer />
        </div>
    );
}

export default GameInfo;
