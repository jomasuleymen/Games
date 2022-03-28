import { createStore, combineReducers } from "redux";
import cellReducer from "@reducers/cellReducer";
import setStatus from "@reducers/gameStatusReducer";

const reducers = combineReducers({
    selectedCell: cellReducer,
    gameStatus: setStatus
});

export default createStore(reducers);