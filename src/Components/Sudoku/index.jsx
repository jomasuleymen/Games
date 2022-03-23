import React from "react";

import Status from "./status";
import Playground from "./playground";
import ConfigBlock from "./configBlock";
import { initialData, allZero } from "./data";

import "Styles/sudoku.scss";

function Wrapper(){
    const [data, setData] = React.useState(allZero);
    
    React.useEffect(() => {
        const copyData = initialData.map((row) => row.slice()); // save bone of initial data
        setData(copyData);
    }, []);

    return (
        <div className="wrapper">
             <Status />
             <div className="game-body">
                <Playground data={data} />
                <ConfigBlock />
             </div>
        </div>
    )
}

export default Wrapper;