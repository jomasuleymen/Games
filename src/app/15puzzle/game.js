import { moveTile, setBoard } from "@store/15puzzle/puzzleReducer";
import store from "@store/store";

import { generateBoard } from "./helpers";

class Game {
    #SIZE;
    #solved;
    #boardElement;

    constructor() {
        this.#SIZE = 4;
        this.newGame();
    }

    newGame() {
        this.board = generateBoard(this.#SIZE);
        this.updateTiles();
        this.#solved = false;
    }

    setBoardElement(boardElement) {
        this.#boardElement = boardElement;
        boardElement.style.setProperty("--grid-size", this.#SIZE);
    }

    setGridSize(size) {
        if (size > 3 && size < 9 && size !== this.#SIZE) {
            this.#SIZE = size;
            this.#boardElement.style.setProperty("--grid-size", size);
            this.newGame();
        }
    }

    updateTiles() {
        const array = [];
        for (let i = 0; i < this.#SIZE; i++) {
            array.push([...this.board[i]]);
        }
        store.dispatch(setBoard(array));
    }

    checkSolution() {
        for (let i = 0; i < this.#SIZE; i++) {
            for (let j = 0; j < this.#SIZE; j++) {
                if (this.board[i][j] != this.#SIZE * i + j + 1);
            }
        }
        this.#solved = true;
    }

    getBlankPosition() {
        for (let i = 0; i < this.#SIZE; i++)
            for (let j = 0; j < this.#SIZE; j++)
                if (this.board[i][j] == 0) return [i, j];
    }

    moveTile(direction) {
        if (this.#solved) return;
        const [blankY, blankX] = this.getBlankPosition();

        let tileY = blankY;
        let tileX = blankX;

        switch (direction) {
            case directions.DOWN: {
                if (blankY <= 0) return;
                tileY -= 1;
                break;
            }
            case directions.UP: {
                if (blankY >= this.#SIZE - 1) return;
                tileY += 1;
                break;
            }
            case directions.RIGHT: {
                if (blankX <= 0) return;
                tileX -= 1;
                break;
            }
            case directions.LEFT: {
                if (blankX >= this.#SIZE - 1) return;
                tileX += 1;
                break;
            }
        }

        this.board[blankY][blankX] = this.board[tileY][tileX];
        this.board[tileY][tileX] = 0;
        store.dispatch(
            moveTile({
                row: blankY,
                col: blankX,
                value: this.board[blankY][blankX],
                isRight:
                    this.board[blankY][blankX] ===
                    blankY * this.#SIZE + blankX + 1,
            })
        );
    }

    moveTileByIndex(row, col){
        if (row + 1 < this.#SIZE && this.board[row+1][col] == 0) this.moveDown();
        else if (row - 1 >= 0 && this.board[row-1][col] == 0) this.moveUp();
        else if (col + 1 < this.#SIZE && this.board[row][col+1] == 0) this.moveRight();
        else if (col - 1 >= 0 && this.board[row][col-1] == 0) this.moveLeft();
    }

    moveDown() {
        this.moveTile(directions.DOWN);
    }
    moveUp() {
        this.moveTile(directions.UP);
    }
    moveRight() {
        this.moveTile(directions.RIGHT);
    }
    moveLeft() {
        this.moveTile(directions.LEFT);
    }

    clearData() {
        store.dispatch(setBoard(null));
    }
}

export default Game;

export const directions = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
};
