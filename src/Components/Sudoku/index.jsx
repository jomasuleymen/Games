import React from "react";

import Status from "./Status/Status";
import Playground from "./playground/Playground";
import ConfigBlock from "./ToolSide/MenuTools";
import { initGame } from "./gameData";

function Wrapper() {
    const [data, setData] = React.useState(false);
    
    const newGame = React.useCallback(() => {
        initGame()
        .then((gameData) => {
            setData(gameData);
        });
    }, [setData]);
    
        React.useEffect(() => {
            newGame();
        }, []);
        

    return (
        <div className="wrapper">
            <Status />
            <div className="game-body">
                { data ? <Playground data={data} /> : <div>Loading block </div> }
                <ConfigBlock newGame={newGame} />
            </div>
        </div>
    );
}

export default Wrapper;
