import React from "react";

import Status from "./Status/Status";
import Playground from "./playground/Playground";
import ConfigBlock from "./ToolSide/MenuTools";
import { initGame } from "./gameData";

function Wrapper() {
    const [data, setData] = React.useState(false);

    React.useEffect(() => {
        initGame()
            .then((gameData) => {
                setData(gameData);
            });
    }, []);

    return (
        <div className="wrapper">
            <Status />
            <div className="game-body">
                { data ? <Playground data={data} /> : <div>Loading block </div> }
                <ConfigBlock />
            </div>
        </div>
    );
}

export default Wrapper;
