import { createSlice } from "@reduxjs/toolkit";

const gameStatusSlice = createSlice({
    name: "status",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isPause: false,
        isFailed: false,
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
        isLoading: (state, payload) => {
            state.isLoading = payload;
        },
        success: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        failed: (state) => {
            state.isFailed = true;
        },
        reset: (state) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isPause = false;
            state.isFailed = false;
        },
    },
});

export default gameStatusSlice.reducer;
export const { pause, resume, toggle, isLoading, success, reset, failed } =
    gameStatusSlice.actions;
