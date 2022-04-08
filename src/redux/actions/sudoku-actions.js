import {
    SELECT_CELL,
    PAUSE,
    RESUME,
    TOGGLE,
    UPDATE_RECORD,
} from "@types/sudoku";
import stores from "@stores/stores";

const selectCell = (row, col, cellValue) => {
    stores.dispatch({
        type: SELECT_CELL,
        payload: {
            row,
            col,
            squareRowBegin: Math.floor(row / 3) * 3,
            squareColBegin: Math.floor(col / 3) * 3,
            value: cellValue,
        },
    });
};

const pause = () => {
    stores.dispatch({ type: PAUSE });
};

const resume = () => {
    stores.dispatch({ type: RESUME });
};

const toggle = () => {
    stores.dispatch({ type: TOGGLE });
};

const getSelectedCell = () => {
    return stores.getState().sudoku.selectedCell;
};

const getStatus = () => {
    return stores.getState().sudoku.gameStatus;
};

const updateRecord = (data) => {
    stores.dispatch({ type: UPDATE_RECORD, payload: data });
};

export default {
    selectCell,
    pause,
    resume,
    toggle,
    getSelectedCell,
    getStatus,
    updateRecord,
};
