import React from "react";

import Status from "./status";
import Playground from "./playground";
import ConfigBlock from "./configBlock";

import "Styles/sudoku.scss";

function Wrapper(){
    return (
        <div className="wrapper">
             <Status />
             <div className="game-body">
                <Playground />
                <ConfigBlock />
             </div>
        </div>
    )
}

export default Wrapper;