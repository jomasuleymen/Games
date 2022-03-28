import React from "react";
import Cell from "./Cell";

function getClassName(row, col){
    let className = "cell";
    if (row % 3 == 0) className += " line-top";
    if (col % 3 == 0) className += " line-left";
    if (row > 0 && row % 8 == 0) className += " line-bottom";
    if (col > 0 && col % 8 == 0) className += " line-right";
    return className;
}

function Row({ row, rowIndex }) {
    return (
        <div className="row" >
            {row.map((_, colIndex) => (
                <Cell
                    row={rowIndex}
                    col={colIndex}
                    key={colIndex}
                    className={getClassName(rowIndex, colIndex)}
                />
            ))}
        </div>
    );
}

export default Row;
