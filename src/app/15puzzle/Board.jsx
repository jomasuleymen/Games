import React from "react";
import { useSelector } from "react-redux";
import game from "./game";

import Tile from "./Tile";

function Board() {
    const cells = useSelector((store) => store.puzzle.currentBoard);
    const size = cells.length;

    return cells.map((row, rowIndex) =>
        row.map((value, colIndex) => (
            <>
                <div className="cell" key={`${rowIndex}${colIndex}`}></div>
                <Tile
                    value={value}
                    key={value}
                    x={colIndex}
                    y={rowIndex}
                    onClick={(y, x) => {
                        game.moveTileByIndex(y, x);
                    }}
                    isRightValue={value === rowIndex * size + colIndex + 1}
                />
            </>
        ))
    );
}

export default Board;
