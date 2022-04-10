import { createStore, combineReducers } from "redux";
import userReducer from "@reducers/userReducer";
import sudokuReducer from "@reducers/sudoku";

const reducers = combineReducers({
    sudoku: sudokuReducer,
    user: userReducer,
});
export default createStore(reducers);
