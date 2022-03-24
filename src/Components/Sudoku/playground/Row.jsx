import React from "react";
import Cell from "./Cell";

function Row({ row, rowIndex }) {
    return (
        <div className="row" >
            {row.map((value, colIndex) => (
                <Cell
                    row={rowIndex}
                    col={colIndex}
                    isReadOnly={value != 0}
                    key={colIndex}
                />
            ))}
        </div>
    );
}

export default Row;
