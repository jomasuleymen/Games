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
            state.row = payload.row;
            state.col = payload.col;
            state.value = payload.cellValue;
            state.squareRowBegin = payload.row - (payload.row % 3);
            state.squareColBegin = payload.col - (payload.col % 3);
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
