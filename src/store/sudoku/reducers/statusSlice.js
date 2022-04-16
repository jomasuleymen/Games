import { createSlice } from "@reduxjs/toolkit";
import STATUSES from '@store/sudoku/gameStatuses';

const gameStatusSlice = createSlice({
    name: "status",
    initialState: {
        status: STATUSES.PLAYING,
    },
    reducers: {
        setStatus: (state, { payload }) => {
            state.status = payload;
        },
    },
});

export default gameStatusSlice.reducer;
export const { setStatus } = gameStatusSlice.actions;
