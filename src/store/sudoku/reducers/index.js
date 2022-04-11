import cellReducer from "./cellSlice";
import statusReducer from "./statusSlice";
import recordReducer from "./recordSlice";

import { combineReducers } from "redux";

export default combineReducers({
    selectedCell: cellReducer,
    gameStatus: statusReducer,
    record: recordReducer,
});
