import React from "react";

function Cell({ value, row, col }) {
    let classes = "cell ";
    classes += row % 3 == 0 ? "line-top " : "";
    classes += col % 3 == 0 ? "line-left " : "";
    classes += row > 0 && row % 8 == 0 ? "line-bottom " : "";
    classes += col > 0 && col % 8 == 0 ? "line-right " : "";

    return <div className={classes}>{value}</div>;
}

export default Cell;
