import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import sudokuReducer from "./sudoku/reducers";

export default configureStore({
    reducer: {
        sudoku: sudokuReducer,
        user: userReducer,
    },
});
