import { setLoading, setToken } from "../../slices/tokenSlice"
import toast from 'react-hot-toast'
import { apiConnector } from "../../services/apiConnector"
import { authEndpoints } from "../../services/apis"
import { setUser } from "../../slices/userSlice"
const { LOGIN_API, SIGNUP_API, LOGOUT_API, FORGOT_PASSWORD_API, CHANGE_PASSWORD_API, SENDOTP_API, GOOGLE_LOGIN_API } = authEndpoints

export const sendotp = (email, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Sending OTP...');
        try {
            const response = await apiConnector('POST', SENDOTP_API, { email });
            // console.log("SENDOTP API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success('OTP sent successfully');
            navigate('/otp');
        }
        catch (err) {
            // console.log("SENDOTP API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const signup = (signupData, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', SIGNUP_API, signupData);
            // console.log("SIGNUP API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success('Signup successfully');

            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));

            navigate('/dashboard/my-notes');
        }
        catch (err) {
            // console.log("SIGNUP API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const login = (loginData, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', LOGIN_API, loginData);
            // console.log("LOGIN API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success('Login successfully');

            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));

            navigate('/dashboard/my-notes');
        }
        catch (err) {
            // console.log("LOGIN API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const logout = (navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', LOGOUT_API);
            // console.log("LOGOUT API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success('Logout successfully');

            dispatch(setToken(null));
            dispatch(setUser(null));

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate('/');
        }
        catch (err) {
            // console.log("LOGOUT API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const forgotPassword = (email, setEmailSent) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector("POST", FORGOT_PASSWORD_API, { email })
            // console.log("FORGOT PASSWORD API RESPONSE....", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch (err) {
            // console.log("FORGOT PASSWORD API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const changePassword = (password, token, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, { password, token });
            // console.log("CHANGE PASSWORD API RESPONSE....", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully", {
                style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "400px" }
            });
            navigate('/');
        }
        catch (err) {
            // console.log("FORGOT PASSWORD API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const googleLogin = (googleData, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector("POST", GOOGLE_LOGIN_API, { token: googleData });
            // console.log("GOOGLE LOGIN API RESPONSE....", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login successfully");

            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));

            navigate('/dashboard/my-notes');
        }
        catch (err) {
            // console.log("GOOGLE LOGIN API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}