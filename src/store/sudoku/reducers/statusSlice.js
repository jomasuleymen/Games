import { createSlice } from "@reduxjs/toolkit";
import game from "@app/sudoku/data/game-data";

const gameStatusSlice = createSlice({
    name: "status",
    initialState: {
        status: game.STATUSES.PLAYING,
    },
    reducers: {
        setStatus: (state, { payload }) => {
            state.status = payload;
        },
    },
});

export default gameStatusSlice.reducer;
export const { setStatus } = gameStatusSlice.actions;
