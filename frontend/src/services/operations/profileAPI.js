import toast from 'react-hot-toast'
import { apiConnector } from "../../services/apiConnector"
import { profileEndpoints } from "../../services/apis"
import { setUser } from "../../slices/userSlice"

const { UPDATE_PROFILE_API } = profileEndpoints;

export const updateProfile = (token, userData) => {
    return async (dispatch) => {
        const toastId = toast.loading('Updating profile...');
        try {
            const response = await apiConnector('PUT', UPDATE_PROFILE_API, userData, { Authorization: `Bearer ${token}` });
            console.log("UPDATE PROFILE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.user));
            
            toast.success('Profile updated successfully');
        }
        catch (err) {
            console.log("UPDATE PROFILE API ERROR............", err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
        toast.dismiss(toastId);
    };
};
