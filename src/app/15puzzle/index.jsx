import React, { useEffect, useRef, useState } from "react";

import Board from "./Board";

import "./15puzzle.scss";
import Game from "./game";
import useKeyUpDown from "@utils/hooks/useKeyUpDown";

function GridInput({ game }) {
    const [gridSize, setGridSize] = useState(4);

    return (
        <div className="grid-input">
            <input
                type="number"
                id="grid-size"
                value={gridSize}
                onChange={(ev) => {
                    const value = ev.target.value;
                    if (value < 9 && value !== gridSize) {
                        game.setGridSize(value);
                        setGridSize(value);
                    }
                }}
            />
            <div className="arrows">
                <button
                    className="arrow"
                    onClick={() => {
                        if (gridSize < 8) {
                            game.setGridSize(gridSize + 1);
                            setGridSize(gridSize + 1);
                        }
                    }}
                >
                    +
                </button>
                <button
                    className="arrow"
                    onClick={() => {
                        if (gridSize > 4) {
                            game.setGridSize(gridSize - 1);
                            setGridSize(gridSize - 1);
                        }
                    }}
                >
                    -
                </button>
            </div>
        </div>
    );
}

function Timer({ game }) {
    const ref = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            if (!game.isSolved) {
                ref.current.innerText = `${game.time} sec`;
                game.time += 1;
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="timer" ref={ref}>
            0 sec
        </div>
    );
}

function Arrows({ game }) {
    return (
        <div className="control-arrows">
            <div className="control-arrow hidden"></div>
            <div className="control-arrow" onClick={() => game.moveUp()}>↑</div>
            <div className="control-arrow hidden"></div>
            <div className="control-arrow" onClick={() => game.moveLeft()}>←</div>
            <div className="control-arrow" onClick={() => game.moveDown()}>↓</div>
            <div className="control-arrow" onClick={() => game.moveRight()}>→</div>
        </div>
    );
}

function Puzzle() {
    const game = new Game();
    const ref = useRef();

    useKeyUpDown(null, (ev) => {
        switch (ev.key) {
            case "ArrowUp": {
                game.moveUp();
                break;
            }
            case "ArrowDown": {
                game.moveDown();
                break;
            }
            case "ArrowLeft": {
                game.moveLeft();
                break;
            }
            case "ArrowRight": {
                game.moveRight();
                break;
            }
            default:
                return;
        }
    });

    React.useEffect(() => {
        game.setBoardElement(ref.current);

        return () => {
            game.clearData();
        };
    }, []);

    return (
        <div id="puzzle-game">
            <div id="header">
                <button
                    className="new-game"
                    onClick={() => {
                        game.newGame();
                    }}
                >
                    New game
                </button>
                <GridInput game={game}></GridInput>
                <h1 className="title">15 Puzzle</h1>
                <Timer game={game} />
            </div>
            <div id="board" ref={ref}>
                {game.board.map((row) =>
                    row.map((value) => <div className="cell" key={value}></div>)
                )}
                <Board game={game} />
            </div>
            <Arrows game={game} />
        </div>
    );
}
export default Puzzle;
