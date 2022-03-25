import React, { useEffect } from "react";
import cellStore from "Stores/selectedCell";
import {
    selectCell,
    insertToSelectedCell,
    clearSelectedCell,
} from "Utils/sudokuUtils";
import "Styles/playground.scss";

import Row from "./Row";

window.onkeyup = (ev) => {
    if (ev.key > 0 && ev.key < 10) {
        insertToSelectedCell(parseInt(ev.key));
    } else if (ev.key == "Delete" || ev.key == "Backspace") {
        clearSelectedCell();
    }
};

window.onkeydown = (ev) => {
    let { row, col } = cellStore.getState();

    switch (ev.key) {
        case "ArrowUp": {
            if (row > 0) row -= 1;
            break;
        }

        case "ArrowRight": {
            if (col < 8) col += 1;
            break;
        }

        case "ArrowDown": {
            if (row < 8) row += 1;
            break;
        }

        case "ArrowLeft": {
            if (col > 0) col -= 1;
            break;
        }

        default:
            return;
    }
    selectCell(row, col);
};
function Playground({ data }) {
    useEffect(() => {
        selectCell(0, 0);
    }, [data]);

    return (
        <div className="playground">
            {data.map((row, rowIdx) => (
                <Row row={row} key={rowIdx} rowIndex={rowIdx} />
            ))}
        </div>
    );
}

export default Playground;
