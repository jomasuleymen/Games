import { createSlice } from "@reduxjs/toolkit";
import { formatTime } from "@utils/timeUtils";

const updateLevelRecord = (state, difficulty, newRecord) => {
    const currentRecord = state[difficulty];
    currentRecord.min = newRecord.min && formatTime(newRecord.min);
    currentRecord.average = newRecord.average && formatTime(newRecord.average);
    currentRecord.played = newRecord.played && formatTime(newRecord.played);
};

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
            const { difficulty, newRecord } = payload;
            updateLevelRecord(state, difficulty, newRecord);
        },
        setRecord: (state, { payload }) => {
            for (let difficulty in payload) {
                updateLevelRecord(state, difficulty, payload[difficulty]);
            }

            state.isLoaded = true;
        },
    },
});

export default recordSlice.reducer;
export const { updateRecord, setRecord } = recordSlice.actions;
