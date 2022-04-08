import { createStore, combineReducers } from "redux";
import cellReducer from "@reducers/sudoku/cellReducer";
import setStatus from "@reducers/sudoku/gameStatusReducer";
import recordReducer from "@reducers/sudoku/record";
import userReducer from "@reducers/userReducer";

const reducers = combineReducers({
    sudoku: combineReducers({
        selectedCell: cellReducer,
        gameStatus: setStatus,
        record: recordReducer
    }),
    user: userReducer
});
export default createStore(reducers);