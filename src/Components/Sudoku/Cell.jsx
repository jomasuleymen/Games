import React, { useEffect, useMemo } from "react";

function Cell({ value, row, col, selectedCell, selectCell, selectedElement }) {
    
    const cellClasses = useMemo(() => {
        const classes = ["cell"];
        if (row % 3 == 0) classes.push("line-top");
        if (col % 3 == 0) classes.push("line-left");
        if (row > 0 && row % 8 == 0) classes.push("line-bottom");
        if (col > 0 && col % 8 == 0) classes.push("line-right");
        return classes;
    }, []);

    const style =
        selectedElement.current != null
            ? {
                  backgroundColor:
                      selectedCell.row == row && selectedCell.col == col
                          ? "rgb(186,222,251)"
                          : row == selectedCell.row ||
                            col == selectedCell.col ||
                            (row >= selectedCell.blockRowBegin &&
                                row <= selectedCell.blockRowBegin + 2 &&
                                col >= selectedCell.blockColBegin &&
                                col <= selectedCell.blockColBegin + 2)
                          ? "rgb(226,235,243)"
                          : value != 0 && value == selectedElement.current.val
                          ? "rgb(194,215,234)"
                          : null,
              }
            : null;

    return (
        <div
            className={cellClasses.join(" ")}
            onClick={(event) => {
                selectedElement.current = event.target;
                selectCell({
                    row,
                    col,
                    blockRowBegin: row - (row % 3),
                    blockColBegin: col - (col % 3),
                });
            }}
            style={style}
        >
            {value != 0 ? value : null}
        </div>
    );
}

export default Cell;
