import { UPDATE_RECORD } from "@types/sudoku";
const record = {
    easy: {
        min: null,
        average: null,
        played: null
    },
    medium: {
        min: null,
        average: null,
        played: null
    },
    hard: {
        min: null,
        average: null,
        played: null
    }
}

export default function cellReducer(state = record, action) {
    switch (action.type) {
        case UPDATE_RECORD:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
