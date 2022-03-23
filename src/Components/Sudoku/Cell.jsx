import React, { useMemo } from "react";
import { isReadOnly, errNumber } from "./data";

function Cell({ value, row, col, backgroundColor, click, isSelected }) {
    const cellClasses = useMemo(() => {
        const classes = ["cell"];
        if (row % 3 == 0) classes.push("line-top");
        if (col % 3 == 0) classes.push("line-left");
        if (row > 0 && row % 8 == 0) classes.push("line-bottom");
        if (col > 0 && col % 8 == 0) classes.push("line-right");
        return classes;
    }, []);

    const readOnly = useMemo(() => {
        return isReadOnly(row, col);
    }, []);

    return (
        <div
            className={cellClasses.join(" ")}
            onClick={click}
            style={{
                backgroundColor:
                    !isSelected && errNumber[row][col] > 0
                        ? "rgb(247,207,214)"
                        : backgroundColor,
                color: readOnly ? "black" : "rgb(51, 120, 225)",
            }}
        >
            {value || null}
        </div>
    );
}

export default Cell;
