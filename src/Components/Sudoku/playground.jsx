import React, { useEffect, useRef, useState } from "react";

import Cell from "./Cell";

let randomData = [
    [0, 0, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 1, 0, 0, 2, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 2, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 3, 0, 0, 0, 0, 0, 8, 1],
];

const initData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function Playground() {
    const [selectedCell, selectCell] = useState({
        row: 0,
        col: 0,
        blockRowBegin: 0,
        blockColBegin: 0,
    });

    const [data, setData] = useState(initData);
    const selectedElement = useRef(null);

    useEffect(() => {
        setData(randomData);
        document.addEventListener("keypress", (ev) => {
            if (ev.key > 0 && ev.key <= 9 && selectedElement.current != null) {
                selectedElement.current.innerText = ev.key;
            }
        });
    }, []);

    return (
        <div className="playground">
            {data.map((row, rowIdx) => (
                <div className="row" key={rowIdx}>
                    {row.map((val, colIdx) => (
                        <Cell
                            value={val}
                            key={`${rowIdx}${colIdx}`}
                            row={rowIdx}
                            col={colIdx}
                            selectedCell={selectedCell}
                            selectCell={selectCell}
                            selectedElement={selectedElement}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Playground;
