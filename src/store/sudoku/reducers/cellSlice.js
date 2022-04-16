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
        updateCells: (state) => {
            return {
                ...state,
            };
        },
    },
});

export default selectedCellSlice.reducer;
export const { selectCell, updateCells } = selectedCellSlice.actions;
