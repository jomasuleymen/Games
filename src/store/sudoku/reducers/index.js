import { combineReducers } from "redux";

import cellReducer from "./cellSlice";
import statusReducer from "./statusSlice";
import recordReducer from "./recordSlice";
import gameInfoSlice from './gameInfoSlice';

export default combineReducers({
    selectedCell: cellReducer,
    gameStatus: statusReducer,
    record: recordReducer,
    gameInfo: gameInfoSlice
});
