import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(state.token));
        }
    }
})

export const { setLoading, setToken } = tokenSlice.actions

export default tokenSlice.reducer