import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        }
    }
})

export const { setLoading, setUser } = userSlice.actions;
export default userSlice.reducer;