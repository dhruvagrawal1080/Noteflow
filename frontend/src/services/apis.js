// const BASE_URL = import.meta.env.VITE_BACKEND_URL;
// const BASE_URL = 'https://noteflow-api.vercel.app/api';
const BASE_URL = 'https://noteflow-api.onrender.com/api';

// Auth endpoints
export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGOUT_API: BASE_URL + "/auth/logout",
    FORGOT_PASSWORD_API: BASE_URL + "/auth/forgot-password",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    GOOGLE_LOGIN_API: BASE_URL + "/auth/google-login",
}

// Note endpoints
export const noteEndpoints = {
    CREATE_NOTE_API: BASE_URL + "/note/createNote",
    GET_NOTES_API: BASE_URL + "/note/getNotes",
    GET_NOTE_BY_ID_API: BASE_URL + "/note/:id",
    UPDATE_NOTE_API: BASE_URL + "/note/updateNote/:id",
    FAVORITE_NOTE_API: BASE_URL + "/note/favoriteNote",
    REMOVE_FAVORITE_NOTE_API: BASE_URL + "/note/removeFavoriteNote",
    GET_FAVORITE_NOTES_API: BASE_URL + "/note/getFavoriteNotes",
    SHARE_NOTE_API: BASE_URL + "/note/shareNote",
    UPDATE_SHARE_API: BASE_URL + "/note/updateShare",
    GET_NOTES_SHARED_WITH_ME_API: BASE_URL + "/note/shared-with-me",
    GET_NOTES_SHARED_BY_ME_API: BASE_URL + "/note/shared-by-me",
    UPDATE_SHARED_NOTE_API: BASE_URL + "/note/update-shared-note/:id",
    DELETE_NOTE_API: BASE_URL + "/note/delete-note/:id",
    RESTORE_NOTE_API: BASE_URL + "/note/restore-note/:id",
    GET_TRASHED_NOTES_API: BASE_URL + "/note/getTrashedNotes",
}

// Reminder endpoints
export const reminderEndpoints = {
    CREATE_REMINDER_API: BASE_URL + "/reminder/createReminder",
    GET_REMINDERS_API: BASE_URL + "/reminder/getReminders",
    DELETE_REMINDER_API: BASE_URL + "/reminder/deleteReminder/:reminderId",
}

// Profile endpoints
export const profileEndpoints = {
    UPDATE_PROFILE_API: BASE_URL + "/profile/update-profile",
    UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/update-profile-picture",
}

// Todo endpoints
export const todoEndpoints = {
    CREATE_TODO_API: BASE_URL + "/todo/createTodo",
    GET_TODOS_API: BASE_URL + "/todo/getTodos",
    UPDATE_TODO_API: BASE_URL + "/todo/updateTodo/:id",
    DELETE_TODO_API: BASE_URL + "/todo/deleteTodo/:id",
}

// Contact endpoints
export const contactEndpoints = {
    CONTACT_API: BASE_URL + "/reach/contact"
}