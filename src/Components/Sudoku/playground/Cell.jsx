import React, { useMemo } from "react";
import { errNumber, currentData, isReadOnly, gameId, notes } from "../gameData";
import { useSelector } from "react-redux";
import { selectCell } from "Utils/sudokuUtils";

function getCellColor(row, col, value, selectedCell) {
    if (errNumber[row][col] > 0) return "rgb(247,207,214)";

    if (
        col == selectedCell.col ||
        row == selectedCell.row ||
        (row >= selectedCell.squareRowBegin &&
            row <= selectedCell.squareRowBegin + 2 &&
            col >= selectedCell.squareColBegin &&
            col <= selectedCell.squareColBegin + 2)
    )
        return "rgb(226,235,243)";

    if (value != 0 && value == selectedCell.value) return "rgb(194,215,234)";
    return null;
}

function Cell({ row, col }) {
    const selectedCell = useSelector((state) => state);
    const isThisCellSelected =
        row == selectedCell.row && col == selectedCell.col;

    const cellClasses = useMemo(() => {
        let classes = "cell";
        if (row % 3 == 0) classes += " line-top";
        if (col % 3 == 0) classes += " line-left";
        if (row > 0 && row % 8 == 0) classes += " line-bottom";
        if (col > 0 && col % 8 == 0) classes += " line-right";
        return classes;
    }, []);

    const readOnly = useMemo(() => {
        return isReadOnly(row, col);
    }, [gameId]);

    const cell =
        notes['noteBoard'][row] && notes['noteBoard'][row][col] ? (
            <div className="noteMode">
                {notes['noteBoard'][row][col].map((isNumberEntered, index) => {
                    return (
                        <div
                            className="noteNum"
                            key={index}
                            style={{ color: isNumberEntered ? "grey" : "transparent" }}
                        >
                            {index+1}
                        </div>
                    );
                })}
            </div>
        ) : currentData[row][col] || null;
    return (
        <div
            className={cellClasses}
            onClick={() => {
                if (isThisCellSelected) return;
                selectCell(row, col);
            }}
            style={{
                backgroundColor: isThisCellSelected
                    ? "rgb(186,222,251)"
                    : getCellColor(
                          row,
                          col,
                          currentData[row][col],
                          selectedCell
                      ),
                color: readOnly ? "black" : "rgb(51, 120, 225)",
            }}
        >
            {cell}
        </div>
    );
}

export default Cell;
