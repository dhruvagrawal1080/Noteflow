import toast from 'react-hot-toast';
import { noteEndpoints } from '../../services/apis';
import { setMyNotes, setFavoriteNotes, pushNewNote, pushFavNote, removeFavNote, setNotesSharedWithMe, updateNotesSharedWithMe, updateNotesSharedByMe, setNotesSharedByMe, setTrashedNotes } from '../../slices/notesSlice';
import { apiConnector } from '../apiConnector';
const { CREATE_NOTE_API, GET_NOTES_API, UPDATE_NOTE_API, FAVORITE_NOTE_API, REMOVE_FAVORITE_NOTE_API, GET_FAVORITE_NOTES_API, SHARE_NOTE_API, UPDATE_SHARE_API, GET_NOTES_SHARED_WITH_ME_API, UPDATE_SHARED_NOTE_API, GET_NOTES_SHARED_BY_ME_API, DELETE_NOTE_API, RESTORE_NOTE_API, GET_TRASHED_NOTES_API } = noteEndpoints;

export const createNote = (token, noteData) => {
    return async (dispatch) => {
        const toastId = toast.loading('Creating note...');
        try {
            const response = await apiConnector('POST', CREATE_NOTE_API, noteData, { Authorization: `Bearer ${token}` });
            console.log("CREATE NOTE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            console.log('here', response?.data?.data);
            dispatch(pushNewNote(response?.data?.data));
            toast.success('Note created successfully');
        }
        catch (err) {
            console.log("CREATE NOTE API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const getNotes = (token) => {
    return async (dispatch) => {
        const toastId = toast.loading('Getting all notes...');
        try {
            const response = await apiConnector('GET', GET_NOTES_API, null, { Authorization: `Bearer ${token}` });
            console.log("GET NOTES API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setMyNotes(response?.data?.data));
            dispatch(setFavoriteNotes(response?.data?.favoriteNotes));
            toast.success('Notes fetched successfully');
        }
        catch (err) {
            console.log("GET NOTES API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const updateNote = (token, noteData, noteId) => {
    return async (dispatch) => {
        const toastId = toast.loading('Updating note...');
        try {
            const response = await apiConnector('PUT', UPDATE_NOTE_API.replace(':id', noteId), noteData, { Authorization: `Bearer ${token}` });
            console.log("UPDATE NOTE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setMyNotes(response?.data?.data));
            dispatch(setFavoriteNotes(response?.data?.favoriteNotes))
            toast.success('Note updated successfully');
        }
        catch (err) {
            console.log("UPDATE NOTE API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to update note");
        }
        toast.dismiss(toastId);
    };
};

// favorite note related api calls

export const favoriteNote = (token, noteId, setFavorite) => {
    return async (dispatch) => {
        const toastId = toast.loading('Adding to favorites...');
        try {
            const response = await apiConnector('POST', FAVORITE_NOTE_API, { noteId }, { Authorization: `Bearer ${token}` });
            console.log("FAVORITE NOTE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Note added to favorites');
            dispatch(pushFavNote(response?.data?.note));
            setFavorite(true);
        } catch (err) {
            console.log("FAVORITE NOTE API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        toast.dismiss(toastId);
    };
};

export const removeFavoriteNote = (token, noteId, setFavorite) => {
    return async (dispatch) => {
        const toastId = toast.loading('Removing from favorites...');
        try {
            const response = await apiConnector('DELETE', REMOVE_FAVORITE_NOTE_API, { noteId }, { Authorization: `Bearer ${token}` });
            console.log("REMOVE FAVORITE NOTE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Note removed from favorites');
            dispatch(removeFavNote(response?.data?.note));
            setFavorite(false);
        } catch (err) {
            console.log("REMOVE FAVORITE NOTE API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        toast.dismiss(toastId);
    };
};

export const getFavoriteNotes = (token) => {
    return async (dispatch) => {
        const toastId = toast.loading('Fetching favorite notes...');
        try {
            const response = await apiConnector('GET', GET_FAVORITE_NOTES_API, null, { Authorization: `Bearer ${token}` });
            console.log("GET FAVORITE NOTES API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setFavoriteNotes(response?.data?.notes));
            toast.success('Favorite notes fetched successfully');
        } catch (err) {
            console.log("GET FAVORITE NOTES API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        toast.dismiss(toastId);
    };
};

// share note related api calls

export const shareNote = (token, noteId, recipientEmail, permission, setLoading) => {
    return async (dispatch) => {
        const toastId = toast.loading('Sharing note...');
        setLoading(true);
        try {
            const response = await apiConnector('POST', SHARE_NOTE_API, { noteId, recipientEmail, permission }, { Authorization: `Bearer ${token}` });
            console.log("SHARE NOTE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setMyNotes(response?.data?.notes));
            dispatch(setFavoriteNotes(response?.data?.favoriteNotes));
            toast.success('Note shared successfully');
        } catch (err) {
            console.log("SHARE NOTE API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        toast.dismiss(toastId);
        setLoading(false);
    };
};

export const updateShare = (token, noteId, recipientEmail, permission, setLoading) => {
    return async (dispatch) => {
        const toastId = toast.loading("Updating sharing permissions...");
        setLoading(true);
        try {
            const response = await apiConnector("PUT", UPDATE_SHARE_API, { noteId, recipientEmail, permission }, { Authorization: `Bearer ${token}` });
            console.log("UPDATE SHARE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Sharing settings updated");

            dispatch(setMyNotes(response?.data?.notes));
            dispatch(setFavoriteNotes(response?.data?.favoriteNotes));
            dispatch(updateNotesSharedByMe(response?.data?.updatedNote))

        } catch (err) {
            console.error("UPDATE SHARE API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to update sharing settings");
        }
        toast.dismiss(toastId);
        setLoading(false);
    };
};

export const getNotesSharedWithMe = (token, setLoading) => {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching shared notes...");
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_NOTES_SHARED_WITH_ME_API, null, { Authorization: `Bearer ${token}` });
            console.log("GET NOTES SHARED WITH ME API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setNotesSharedWithMe(response?.data?.sharedNotes));
            toast.success("Notes shared with you retrieved successfully", {
                style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "400px" }
            });

        } catch (err) {
            console.error("GET NOTES SHARED WITH ME API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to fetch shared with you");
        }
        toast.dismiss(toastId);
        setLoading(false);
    };
};

export const getNotesSharedByMe = (token, setLoading) => {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching notes shared by you...");
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_NOTES_SHARED_BY_ME_API, null, { Authorization: `Bearer ${token}` });
            console.log("GET NOTES SHARED BY ME API RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setNotesSharedByMe(response?.data?.sharedNotes));
            toast.success("Notes shared by you retrieved successfully", {
                style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "400px" }
            });
        } catch (err) {
            console.error("GET NOTES SHARED BY ME API ERROR", err);
            toast.error(err?.response?.data?.message || "Failed to fetch notes shared by you");
        }
        toast.dismiss(toastId);
        setLoading(false);
    };
};

export const updateSharedNote = (token, noteId, updatedData, tab) => {
    return async (dispatch) => {
        const toastId = toast.loading("Updating note...");
        try {
            const response = await apiConnector("PUT", UPDATE_SHARED_NOTE_API.replace(':id', noteId), updatedData, { Authorization: `Bearer ${token}` });
            console.log("UPDATE SHARED NOTE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const updatedNote = response.data.data;
            toast.success("Note updated successfully");

            tab == 'Shared with me' ? dispatch(updateNotesSharedWithMe(updatedNote)) : dispatch(updateNotesSharedByMe(updatedNote));
        } catch (err) {
            console.error("UPDATE SHARED NOTE API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to update the note");
        }
        toast.dismiss(toastId);
    };
};

// delete note related api calls

export const deleteNote = (token, noteId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting note...");
        try {
            const response = await apiConnector("DELETE", DELETE_NOTE_API.replace(':id', noteId), null, { Authorization: `Bearer ${token}` });
            console.log("DELETE NOTE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            dispatch(setTrashedNotes(response.data.trashedNotes));
            dispatch(setMyNotes(response.data.myNotes));
            dispatch(setFavoriteNotes(response.data.favoriteNotes));
        } catch (err) {
            console.error("DELETE NOTE API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to delete the note");
        }
        toast.dismiss(toastId);
    };
};

export const restoreNote = (token, noteId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Restoring note...");
        try {
            const response = await apiConnector("PUT", RESTORE_NOTE_API.replace(':id', noteId), null, { Authorization: `Bearer ${token}` });
            console.log("RESTORE NOTE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            dispatch(setTrashedNotes(response.data.trashedNotes));
            dispatch(setMyNotes(response.data.myNotes));
        } catch (err) {
            console.error("RESTORE NOTE API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to restore the note");
        }
        toast.dismiss(toastId);
    };
};

export const getTrashedNotes = (token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching trashed notes...");
        try {
            const response = await apiConnector("GET", GET_TRASHED_NOTES_API, null, { Authorization: `Bearer ${token}` });
            console.log("GET TRASHED NOTES API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            dispatch(setTrashedNotes(response.data.trashedNotes));
        } catch (err) {
            console.error("GET TRASHED NOTES API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to fetch trashed notes");
        }
        toast.dismiss(toastId);
    };
};
