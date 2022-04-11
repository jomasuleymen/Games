import { createSlice } from "@reduxjs/toolkit";

const recordSlice = createSlice({
    name: "record",
    initialState: {
        easy: {
            min: null,
            average: null,
            played: null,
        },
        medium: {
            min: null,
            average: null,
            played: null,
        },
        hard: {
            min: null,
            average: null,
            played: null,
        },
    },
    reducers: {
        updateRecord: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export default recordSlice.reducer;
export const { updateRecord } = recordSlice.actions;
