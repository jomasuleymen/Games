import cellReducer from "./cellReducer";
import gameStatusReducer from "./gameStatusReducer";
import recordReducer from "./record";

import { combineReducers } from "redux";

export default combineReducers({
    selectedCell: cellReducer,
    gameStatus: gameStatusReducer,
    record: recordReducer,
});
