import { createSlice } from "@reduxjs/toolkit";

const gameStatusSlice = createSlice({
    name: "status",
    initialState: {
        loadStatus: null,
        isPause: false,
    },
    reducers: {
        pause: (state) => {
            state.isPause = true;
        },
        resume: (state) => {
            state.isPause = false;
        },
        toggle: (state) => {
            state.isPause = !state.isPause;
        },
        loading: (state) => {
            state.loadStatus = "loading";
        },
        loaded: (state) => {
            state.loadStatus = "loaded";
        },
        reset: (state) => {
            state.loadStatus = null;
            state.isPause = false;
        },
    },
});

export default gameStatusSlice.reducer;
export const { pause, resume, toggle, loading, loaded, reset } =
    gameStatusSlice.actions;
