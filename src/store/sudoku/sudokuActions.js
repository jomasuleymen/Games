import {
    selectCell as selectCellReducer,
    updateCells,
} from "./reducers/cellSlice";
import {
    pause,
    resume,
    toggle,
    isLoading,
    success,
    reset,
} from "./reducers/statusSlice";
import { updateRecord as updateRecordReducer } from "./reducers/recordSlice";

import store from "@store/store";

/* Cell actions */
const selectCell = (row, col, cellValue) => {
    store.dispatch(selectCellReducer({ row, col, cellValue }));
};

const getSelectedCell = () => {
    return store.getState().sudoku.selectedCell;
};

const refreshBoard = () => {
    store.dispatch(updateCells());
};

/* Game statuses */
const pauseGame = () => {
    store.dispatch(pause());
};

const resumeGame = () => {
    store.dispatch(resume());
};

const toggleStatus = () => {
    store.dispatch(toggle());
};

const resetStatus = () => {
    store.dispatch(reset());
};

const loadingData = () => {
    store.dispatch(isLoading(true));
};

const loadedData = () => {
    store.dispatch(isLoading(false));
};

const verified = () => {
    store.dispatch(success());
}

const getStatus = () => {
    return store.getState().sudoku.gameStatus;
};

/* Game records */
const updateRecord = (data) => {
    store.dispatch(updateRecordReducer(data));
};

export default {
    pauseGame,
    resumeGame,
    toggleStatus,
    resetStatus,
    getStatus,

    selectCell,
    getSelectedCell,
    refreshBoard,

    loadingData,
    loadedData,
    verified,

    updateRecord,
};
