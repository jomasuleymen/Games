import { createSlice } from "@reduxjs/toolkit";

const recordSlice = createSlice({
    name: "record",
    initialState: {
        Easy: {
            min: null,
            average: null,
            played: null,
        },
        Medium: {
            min: null,
            average: null,
            played: null,
        },
        Hard: {
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
