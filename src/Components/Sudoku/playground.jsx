import React, { useEffect, useReducer, useRef, useCallback } from "react";
import { isReadOnly } from "./gameData";
import { addIfError, subtractIfError } from "Utils/sudokuUtils";

import "Styles/playground.scss";

import Row from "./Row";

function Playground({ data }) {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const selectedCell = useRef({
        row: 0,
        col: 0,
        squareRowBegin: 0,
        squareColBegin: 0,
        value: -1,
    });
    const selectCell = useCallback(
        // dispatch
        (row, col) => {
            selectedCell.current = {
                row,
                col,
                squareRowBegin: Math.floor(row / 3) * 3,
                squareColBegin: Math.floor(col / 3) * 3,
                value: data[row][col],
            };
            forceUpdate();
        },
        [selectedCell, data]
    );

    useEffect(() => {
        selectCell(0, 0);
        window.onkeyup = (ev) => {
            const { row, col } = selectedCell.current;
            if (isReadOnly(row, col)) return; // check in backend with initial data
            const value = data[row][col];

            if (ev.key > 0 && ev.key < 10) {
                const insertedValue = ev.key - "0";
                if (insertedValue == value) return;

                data[row][col] = insertedValue;
                subtractIfError(row, col, value, data);
                addIfError(row, col, insertedValue, data);

                forceUpdate();
            } else if (ev.key == "Delete" || ev.key == "Backspace") {
                data[row][col] = 0;
                subtractIfError(row, col, value, data);
                forceUpdate();
            }
        };

        window.onkeydown = (ev) => {
            let { row, col } = selectedCell.current;
            if (ev.key == "ArrowUp") {
                if (row <= 0) return;
                row -= 1;
            } else if (ev.key == "ArrowDown") {
                if (row >= 8) return;
                row += 1;
            } else if (ev.key == "ArrowRight") {
                if (col >= 8) return;
                col += 1;
            } else if (ev.key == "ArrowLeft") {
                if (col <= 0) return;
                col -= 1;
            } else {
                return;
            }
            selectCell(row, col);
        };
    }, [data]);

    return (
        <div className="playground">
            {data.map((row, rowIdx) => (
                <Row
                    row={row}
                    key={rowIdx}
                    rowIndex={rowIdx}
                    selectCell={selectCell}
                    selectedCell={selectedCell.current}
                />
            ))}
        </div>
    );
}

export default Playground;
