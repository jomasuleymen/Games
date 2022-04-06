import { createStore, combineReducers } from "redux";
import cellReducer from "@reducers/sudoku/cellReducer";
import setStatus from "@reducers/sudoku/gameStatusReducer";
import userReducer from "@reducers/userReducer";

const reducers = combineReducers({
    sudoku: combineReducers({
        selectedCell: cellReducer,
        gameStatus: setStatus
    }),
    user: userReducer
});
export default createStore(reducers);