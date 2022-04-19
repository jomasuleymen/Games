import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import sudokuReducer from "./sudoku/reducers";
import puzzleReducer from "./15puzzle/puzzleReducer";
export default configureStore({
    reducer: {
        sudoku: sudokuReducer,
        user: userReducer,
        puzzle: puzzleReducer
    },
});
