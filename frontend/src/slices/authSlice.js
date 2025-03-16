import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
    }
})

export const { setSignupData } = authSlice.actions

export default authSlice.reducer