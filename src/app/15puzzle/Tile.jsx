import React from "react";
import { useSelector } from "react-redux";

function Tile({ value, x, y, onClick, isRightValue }) {
    let { toX, toY, isRight } = useSelector(
        (store) => store.puzzle,
        (left, right) => {
            return right.tileValue !== null && right.tileValue != value;
        }
    );
    if (!toX && !toY) isRight = isRightValue;

    toX = toX === null ? x : toX;
    toY = toY === null ? y : toY;

    const style = {
        "--x": toX,
        "--y": toY,
    };

    return (
        <div
            className={`tail${
                value === 0 ? " blank" : isRight ? " right" : ""
            }`}
            style={style}
            onClick={() => {
                onClick(toY, toX);
            }}
        >
            {value || null}
        </div>
    );
}

export default Tile;
