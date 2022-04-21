import { createSlice } from "@reduxjs/toolkit";

const selectedCellSlice = createSlice({
    name: "selectedCell",
    initialState: {
        row: null,
        col: null,
        squareRowBegin: null,
        squareColBegin: null,
        value: null,
    },
    reducers: {
        selectCell: (state, { payload }) => {
            const { row, col, cellValue } = payload;

            state.row = row;
            state.col = col;
            state.value = cellValue;
            state.squareRowBegin = row - (row % 3);
            state.squareColBegin = col - (col % 3);
        },
        updateCurrentCell: (state, { payload }) => {
            return { ...state, value: payload.newValue };
        },
        resetData: (state) => {
            state.row = null;
            state.col = null;
            state.squareRowBegin = null;
            state.squareColBegin = null;
            state.value = null;
        },
    },
});

export default selectedCellSlice.reducer;
export const { selectCell, updateCurrentCell, resetData } =
    selectedCellSlice.actions;
