import React from "react";

import Cell from "./Cell";

function getCellColor(row, col, value, selectedCell) {
    if (selectedCell.value == -1) return null;
    if (selectedCell.row == row && selectedCell.col == col)
        return "rgb(186,222,251)";
    if (
        col == selectedCell.col ||
        (row >= selectedCell.squareRowBegin &&
            row <= selectedCell.squareRowBegin + 2 &&
            col >= selectedCell.squareColBegin &&
            col <= selectedCell.squareColBegin + 2)
    )
        return "rgb(226,235,243)";

    if (value != 0 && value == selectedCell.value) return "rgb(194,215,234)";
    return null;
}

function Row({ row, rowIndex, selectedCell, selectCell }) {
    const style = {
        backgroundColor:
            selectedCell.value != -1 && selectedCell.row == rowIndex
                ? "rgb(226,235,243)"
                : null,
    };

    return (
        <div className="row" style={style}>
            {row.map((value, colIndex) => (
                <Cell
                    value={value}
                    row={rowIndex}
                    col={colIndex}
                    key={colIndex}
                    isSelected={selectedCell.row == rowIndex && selectedCell.col == colIndex}
                    backgroundColor={getCellColor(
                        rowIndex,
                        colIndex,
                        value,
                        selectedCell
                    )}
                    click={() => {
                        if (
                            rowIndex == selectedCell.row &&
                            colIndex == selectedCell.col
                        )
                            return;
                        selectCell(rowIndex, colIndex);
                    }}
                />
            ))}
        </div>
    );
}

export default Row;
