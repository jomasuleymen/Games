import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, { payload }) => {
            return payload;
        },
    },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
