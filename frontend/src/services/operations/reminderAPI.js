import { addReminder, deleteReminder, setReminders } from "../../slices/reminderSlice";
import { apiConnector } from "../apiConnector";
import { reminderEndpoints } from "../apis";
import toast from 'react-hot-toast';

const { CREATE_REMINDER_API, GET_REMINDERS_API, DELETE_REMINDER_API } = reminderEndpoints;

export const createReminder = (token, reminderData) => {
    return async (dispatch) => {
        const toastId = toast.loading('Creating reminder...');
        try {
            const response = await apiConnector('POST', CREATE_REMINDER_API, reminderData, { Authorization: `Bearer ${token}` });
            console.log("CREATE REMINDER API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(addReminder(response.data.reminder));
            toast.success('Reminder created successfully');
        } catch (err) {
            console.log("CREATE REMINDER API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to create reminder");
        }
        toast.dismiss(toastId);
    };
};

export const getReminders = (token) => {
    return async (dispatch) => {
        const toastId = toast.loading('Fetching reminders...');
        try {
            const response = await apiConnector('GET', GET_REMINDERS_API, null, { Authorization: `Bearer ${token}` });
            console.log("GET REMINDERS API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setReminders(response.data.reminders));
            toast.success('Reminders fetched successfully');
        } catch (err) {
            console.log("GET REMINDERS API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to fetch reminders");
        }
        toast.dismiss(toastId);
    };
};

export const removeReminder = (token, reminderId) => {
    return async (dispatch) => {
        const toastId = toast.loading('Deleting reminder...');
        try {
            const response = await apiConnector('DELETE', DELETE_REMINDER_API.replace(":reminderId", reminderId), null, { Authorization: `Bearer ${token}` });
            console.log("DELETE REMINDER API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(deleteReminder(response.data.reminder));
            toast.success('Reminder deleted successfully');
        } catch (err) {
            console.log("DELETE REMINDER API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to delete reminder");
        }
        toast.dismiss(toastId);
    };
};
