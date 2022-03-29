import React from "react";
import Cell from "./Cell";
import { zeroFilledMatrix } from "@utils/arrayUtils";

function getClassName(row, col) {
    let className = "cell";
    if (row % 3 == 0) className += " line-top";
    if (col % 3 == 0) className += " line-left";
    if (row > 0 && row % 8 == 0) className += " line-bottom";
    if (col > 0 && col % 8 == 0) className += " line-right";
    return className;
}

function Grid() {
    return (
        <div id="grid">
            {zeroFilledMatrix().map((row, rowIndex) =>
                row.map((_, colIndex) => (
                    <Cell
                        row={rowIndex}
                        col={colIndex}
                        key={colIndex}
                        className={getClassName(rowIndex, colIndex)}
                    />
                ))
            )}
        </div>
    );
}

export default Grid;
