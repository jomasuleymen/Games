import { SELECT_CELL } from "@types/sudoku";

const selectedCell = {
    row: 0,
    col: 0,
    squareRowBegin: 0,
    squareColBegin: 0,
    value: -1,
};

export default function cellReducer(state = selectedCell, action) {
    switch (action.type) {
        case SELECT_CELL:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}
