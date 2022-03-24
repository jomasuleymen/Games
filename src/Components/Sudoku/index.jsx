import React from "react";

import Status from "./Status";
import Playground from "./Playground";
import ConfigBlock from "./MenuTools";
import { initialData, initGame } from "./gameData";

function Wrapper() {
    const [data, setData] = React.useState(initialData);

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
                <Playground data={data} />
                <ConfigBlock />
            </div>
        </div>
    );
}

export default Wrapper;
