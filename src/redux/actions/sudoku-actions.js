import { selectCell as selectCellReducer, updateCells } from "@reducers/sudoku/cellReducer";
import {
    pause as pauseGame,
    resume as resumeGame,
    toggle as toggleStatus,
    loading,
    loaded,
    reset,
} from "@reducers/sudoku/gameStatusReducer";
import { updateRecord as updateRecordReducer } from "@reducers/sudoku/record";

import store from "@store";

const selectCell = (row, col, cellValue) => {
    store.dispatch(selectCellReducer({ row, col, cellValue }));
};

const refreshBoard = () => {
    store.dispatch(updateCells());
}

const pause = () => {
    store.dispatch(pauseGame());
};

const resume = () => {
    store.dispatch(resumeGame());
};

const toggle = () => {
    store.dispatch(toggleStatus());
};

const getSelectedCell = () => {
    return store.getState().sudoku.selectedCell;
};

const getStatus = () => {
    return store.getState().sudoku.gameStatus;
};

const updateRecord = (data) => {
    store.dispatch(updateRecordReducer(data));
};

const resetStatus = () => {
    store.dispatch(reset());
};

const loadingData = () => {
    store.dispatch(loading());
};
const loadedData = () => {
    store.dispatch(loaded());
};

export default {
    selectCell,
    pause,
    resume,
    toggle,
    getSelectedCell,
    getStatus,
    updateRecord,
    resetStatus,
    loadingData,
    loadedData,
    refreshBoard
};
