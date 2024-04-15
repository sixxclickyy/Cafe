import { createSlice } from "@reduxjs/toolkit";

export const userIDSlice = createSlice({
    name: 'userID',
    initialState: null,
    reducers: {
        setUserID: (state, action) => {
            return action.payload;
        }
    }
});

export const { setUserID } = userIDSlice.actions;

export default userIDSlice.reducer; 