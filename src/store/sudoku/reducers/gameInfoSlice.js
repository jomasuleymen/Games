import { createSlice } from "@reduxjs/toolkit";

const gameInfoSlice = createSlice({
    name: "gameInfo",
    initialState: {
        x: 1
    },
    reducers: {
        refreshInfo: (state) => {
            state.x += 1;
        }
    },
});

export default gameInfoSlice.reducer;
export const { refreshInfo } = gameInfoSlice.actions;
