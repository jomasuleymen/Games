import {
    selectCell as selectCellReducer,
    updateCurrentCell,
    resetData,
} from "./reducers/cellSlice";
import { setStatus } from "./reducers/statusSlice";
import {
    updateRecord as updateRecordReducer,
    setRecord,
} from "./reducers/recordSlice";
import { refreshInfo } from "./reducers/gameInfoSlice";
import store from "@store/store";
import STATUSES from "@store/sudoku/gameStatuses";

/* Cell actions */
const selectCell = (row, col, cellValue) => {
    store.dispatch(selectCellReducer({ row, col, cellValue }));
};

const getSelectedCell = () => {
    return store.getState().sudoku.selectedCell;
};

const updateCell = (newValue) => {
    store.dispatch(updateCurrentCell({ newValue }));
};

const resetCells = () => {
    store.dispatch(resetData());
};

/* Game statuses */
const toggleStatus = () => {
    let nextStatus = STATUSES.PAUSE;
    if (getCurrentStatus() === nextStatus) nextStatus = STATUSES.PLAYING;
    store.dispatch(setStatus(nextStatus));
};

const resumeGame = () => {
    store.dispatch(setStatus(STATUSES.PLAYING));
};

const resetStatus = () => {
    store.dispatch(setStatus(STATUSES.PLAYING));
};

const loadingData = () => {
    store.dispatch(setStatus(STATUSES.LOADING));
};

const dataVerified = () => {
    store.dispatch(setStatus(STATUSES.SUCCESS));
};

const gameFailed = () => {
    store.dispatch(setStatus(STATUSES.FAILED));
};

const getCurrentStatus = () => {
    return store.getState().sudoku.gameStatus.status;
};

/* Game records */
const updateRecord = (difficulty, newRecord) => {
    store.dispatch(updateRecordReducer({ difficulty, newRecord }));
};

const setRecords = (data) => {
    store.dispatch(setRecord(data));
};

const refreshInfoBar = () => {
    store.dispatch(refreshInfo());
};

const isRecordLoaded = () => {
    return store.getState().sudoku.record.isLoaded;
};

export default {
    toggleStatus,
    resetStatus,
    getCurrentStatus,
    resetCells,

    selectCell,
    getSelectedCell,
    updateCell,

    loadingData,
    resumeGame,
    dataVerified,

    updateRecord,
    setRecords,

    refreshInfoBar,
    gameFailed,
    isRecordLoaded,
};
