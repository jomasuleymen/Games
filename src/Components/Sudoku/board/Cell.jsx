import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import board from "@components/sudoku/data/board-data";
import game from "@components/sudoku/data/game-data";

function getCellColor(row, col, value, selectedCell) {
    if (board.hasCellError(row, col)) return "rgb(247,207,214)";

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

function Cell({ row, col, className }) {
    const selectedCell = useSelector((state) => state.selectedCell);
    const isThisCellSelected =
        row == selectedCell.row && col == selectedCell.col;

    const cell = useMemo(() => {
        return board.note.noteCount(row, col) > 0 ? (
            <div className="noteMode">
                {board.note.getNote(row, col).map((isNumberEntered, index) => {
                    return (
                        <div
                            className="noteNum"
                            key={index}
                            style={{
                                color: isNumberEntered ? "grey" : "transparent",
                            }}
                        >
                            {index + 1}
                        </div>
                    );
                })}
            </div>
        ) : (
            board.getCellValue(row, col) || null
        );
    }, [board.note.noteCount(row, col), board.getCellValue(row, col)]);

    return (
        <div
            className={className}
            onClick={() => {
                if (isThisCellSelected) return;
                board.selectCell(row, col);
            }}
            style={{
                backgroundColor: isThisCellSelected
                    ? "rgb(186,222,251)"
                    : getCellColor(
                          row,
                          col,
                          board.getCellValue(row, col),
                          selectedCell
                      ),
                color: board.isReadOnly(row, col)
                    ? "black"
                    : game.autoCheck && !board.isValueCorrect(row, col)
                    ? "rgb(231,101,117)"
                    : "rgb(51, 120, 225)",
            }}
        >
            {cell}
        </div>
    );
}

export default Cell;
