import { createSlice } from "@reduxjs/toolkit";

const selectedCellSlice = createSlice({
    name: "selectedCell",
    initialState: {
        row: 0,
        col: 0,
        squareRowBegin: 0,
        squareColBegin: 0,
        value: -1,
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
    },
});

export default selectedCellSlice.reducer;
export const { selectCell, updateCurrentCell } = selectedCellSlice.actions;
