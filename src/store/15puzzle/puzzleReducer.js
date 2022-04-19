import { createSlice } from "@reduxjs/toolkit";

const puzzleSlice = createSlice({
    name: "15puzzle",
    initialState: {
        tileValue: null,
        toX: null,
        toY: null,
        isRight: false,
        currentBoard: [[]],
    },
    reducers: {
        moveTile: (state, { payload }) => {
            state.tileValue = payload.value;
            state.toX = payload.col;
            state.toY = payload.row;
            state.isRight = payload.isRight;
        },
        setBoard: (state, { payload }) => {
            state.toX = null;
            state.toY = null;
            state.tileValue = null;
            state.isRight = false;
            state.currentBoard = payload || [[]];
        },
    },
});

export default puzzleSlice.reducer;
export const { moveTile, setBoard } = puzzleSlice.actions;
