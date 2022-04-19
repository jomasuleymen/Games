import React from "react";
import { useSelector } from "react-redux";

import Tile from "./Tile";

function Board({ game }) {
    const cells = useSelector((store) => store.puzzle.currentBoard);
    const size = cells.length;

    function moveTileByIndex(y, x) {
        game.moveTileByIndex(y, x);
    }

    return cells.map((row, rowIndex) =>
        row.map((value, colIndex) => (
            <Tile
                value={value}
                key={value}
                x={colIndex}
                y={rowIndex}
                onClick={(y, x) => {
                    moveTileByIndex(y, x);
                }}
                isRightValue={value === rowIndex*size + colIndex + 1}
            />
        ))
    );
}

export default Board;
