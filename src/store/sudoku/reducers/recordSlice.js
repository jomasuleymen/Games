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
        isLoaded: false,
    },
    reducers: {
        updateRecord: (state, { payload }) => {
            if (payload) {
                const data = state[payload.difficulty];
                data.min = payload.min;
                data.average = payload.average;
                data.played = payload.played;
            }
        },
        setRecord: (state, { payload }) => {
            if (payload) {
                state.Easy = payload.Easy;
                state.Medium = payload.Medium;
                state.Hard = payload.Hard;
            }
            state.isLoaded = true;
        },
    },
});

export default recordSlice.reducer;
export const { updateRecord, setRecord } = recordSlice.actions;
