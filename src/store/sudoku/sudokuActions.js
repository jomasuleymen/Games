import {
    selectCell as selectCellReducer,
    updateCells,
} from "./reducers/cellSlice";
import { setStatus } from "./reducers/statusSlice";
import { updateRecord as updateRecordReducer } from "./reducers/recordSlice";
import { refreshInfo } from "./reducers/gameInfoSlice";
import game from "@app/sudoku/data/game-data";
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
const toggleStatus = () => {
    let nextStatus = game.STATUSES.PAUSE;
    if (getCurrentStatus() === nextStatus) nextStatus = game.STATUSES.PLAYING;
    store.dispatch(setStatus(nextStatus));
};

const resumeGame = () => {
    store.dispatch(setStatus(game.STATUSES.PLAYING));
};

const resetStatus = () => {
    store.dispatch(setStatus(game.STATUSES.PLAYING));
};

const loadingData = () => {
    store.dispatch(setStatus(game.STATUSES.LOADING));
};

const dataVerified = () => {
    store.dispatch(setStatus(game.STATUSES.SUCCESS));
};

const gameFailed = () => {
    store.dispatch(setStatus(game.STATUSES.FAILED));
};

const getCurrentStatus = () => {
    return store.getState().sudoku.gameStatus.status;
};

/* Game records */
const updateRecord = (data) => {
    store.dispatch(updateRecordReducer(data));
};

const refreshInfoComponent = () => {
    store.dispatch(refreshInfo());
};

export default {
    toggleStatus,
    resetStatus,
    getCurrentStatus,

    selectCell,
    getSelectedCell,
    refreshBoard,

    loadingData,
    resumeGame,
    dataVerified,

    updateRecord,
    refreshInfoComponent,
    gameFailed,
};
