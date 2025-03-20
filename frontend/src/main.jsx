import { configureStore } from '@reduxjs/toolkit'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import authReducer from './slices/authSlice.js'
import notesReducer from './slices/notesSlice.js'
import reminderReducer from './slices/reminderSlice.js'
import todoReducer from './slices/todoSlice.js'
import tokenReducer from './slices/tokenSlice.js'
import userReducer from './slices/userSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        token: tokenReducer,
        user: userReducer,
        notes: notesReducer,
        reminder: reminderReducer,
        todo: todoReducer
    },
})

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
            <Toaster />
        </Provider>
    </BrowserRouter>
)
