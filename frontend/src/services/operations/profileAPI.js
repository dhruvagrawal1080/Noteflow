import toast from 'react-hot-toast'
import { apiConnector } from "../../services/apiConnector"
import { profileEndpoints } from "../../services/apis"
import { setUser } from "../../slices/userSlice"

const { UPDATE_PROFILE_API, UPDATE_PROFILE_PICTURE_API } = profileEndpoints;

export const updateProfile = (token, userData) => {
    return async (dispatch) => {
        const toastId = toast.loading('Updating profile...');
        try {
            const response = await apiConnector('PUT', UPDATE_PROFILE_API, userData, { Authorization: `Bearer ${token}` });
            // console.log("UPDATE PROFILE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.user));

            toast.success('Profile updated successfully');
        }
        catch (err) {
            // console.log("UPDATE PROFILE API ERROR............", err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
        toast.dismiss(toastId);
    };
};

export const updateDisplayPicture = (token, formData, setLoading, setEditEnable) => {
    return async (dispatch) => {
        const toastId = toast.loading("Updating profile picture...");
        setLoading(true);
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE_API, formData, { Authorization: `Bearer ${token}` });
            // console.log("UPDATE PROFILE PICTURE API RESPONSE:", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Update failed");
            }

            toast.success("Profile picture updated successfully!", {
                style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "400px" }
            });
            dispatch(setUser(response.data.user));
            setEditEnable(false);
        }
        catch (err) {
            // console.error("UPDATE PROFILE PICTURE API ERROR:", err);
            toast.error(err?.response?.data?.message || "Could not update profile picture");
        }
        toast.dismiss(toastId);
        setLoading(false);
    };
}