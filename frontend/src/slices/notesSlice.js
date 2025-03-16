import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myNotes: [],
    favoriteNotes: [],
    notesSharedByMe: [],
    notesSharedWithMe: []
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // notes reducer
        setMyNotes: (state, action) => {
            state.myNotes = action.payload || [];
        },
        pushNewNote: (state, action) => {
            state.myNotes.push(action.payload);
        },

        // favorite notes reducer
        setFavoriteNotes: (state, action) => {
            state.favoriteNotes = action.payload || [];
        },
        pushFavNote: (state, action) => {
            state.favoriteNotes.push(action.payload);
        },
        removeFavNote: (state, action) => {
            state.favoriteNotes = state.favoriteNotes.filter((note) => note._id !== action.payload._id);
        },

        // shared with me notes reducer
        setNotesSharedWithMe: (state, action) => {
            state.notesSharedWithMe = action.payload || [];
        },
        updateNotesSharedWithMe: (state, action) => {
            const index = state.notesSharedWithMe.findIndex(note => note._id === action.payload._id);
            if (index !== -1) {
                state.notesSharedWithMe[index] = action.payload;
            }
        },

        // shared by me notes reducer
        setNotesSharedByMe: (state, action) => {
            state.notesSharedByMe = action.payload || [];
        },
        updateNotesSharedByMe: (state, action) => {
            const index = state.notesSharedByMe.findIndex(note => note._id === action.payload._id);
            if (index !== -1) {
                state.notesSharedByMe[index] = action.payload;
            }
        },
    }
})

export const { setMyNotes, pushNewNote, setFavoriteNotes, pushFavNote, removeFavNote, setNotesSharedWithMe, updateNotesSharedWithMe, setNotesSharedByMe, updateNotesSharedByMe } = notesSlice.actions

export default notesSlice.reducer