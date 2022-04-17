import React from "react";

import AutoCheck from "./AutoCheck";
import Info from "./Info";
import Timer from "./Timer";

import "./head.scss";

function Head() {
    return (
        <div className="game-info">
            <AutoCheck />
            <Info />
            <Timer />
        </div>
    );
}

export default Head;
