import React, { useEffect } from "react";
import Cell from "./Cell";

const data = [
    [0, 0, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 8, 0],
];

function Playground() {
    useEffect(() => {
        // retrive data from backend
    }, []);

    return (
        <div className="playground">
            {data.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>
                    {
                        row.map((val, colIdx) => { return <Cell value={val} key={colIdx} row={rowIdx} col={colIdx}/>; })
                    }
                </div>
            ))}
        </div>
    );
}

export default Playground;
