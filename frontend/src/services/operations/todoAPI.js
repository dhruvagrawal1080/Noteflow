import toast from 'react-hot-toast';
import { apiConnector } from "../apiConnector";
import { setTodos, addTodo, updateTodo, deleteTodo } from "../../slices/todoSlice";
import { todoEndpoints } from '../apis';
const { CREATE_TODO_API, GET_TODOS_API, UPDATE_TODO_API, DELETE_TODO_API } = todoEndpoints;

export const createTodo = (token, todoData, setIsSaving) => {
    return async (dispatch) => {
        const toastId = toast.loading("Creating todo...");
        setIsSaving(true);
        try {
            const response = await apiConnector("POST", CREATE_TODO_API, todoData, { Authorization: `Bearer ${token}` });
            // console.log("CREATE TODO API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(addTodo(response.data.newTodo));
            toast.success("Todo created successfully");
        } catch (err) {
            // console.log("CREATE TODO API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to create todo");
        }
        toast.dismiss(toastId);
        setIsSaving(false);
    };
};

export const getTodos = (token, setIsSaving) => {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching todos...");
        setIsSaving(true);
        try {
            const response = await apiConnector("GET", GET_TODOS_API, null, { Authorization: `Bearer ${token}` });
            // console.log("GET TODOS API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setTodos(response.data.todos));
            toast.success("All todos fetched successfully");
        } catch (err) {
            // console.log("GET TODOS API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to fetch todos");
        }
        toast.dismiss(toastId);
        setIsSaving(false);
    };
};

export const updateTodoApi = (token, todoId, updatedData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Updating todo...");
        try {
            const response = await apiConnector("PUT", UPDATE_TODO_API.replace(':id', todoId), updatedData, { Authorization: `Bearer ${token}` });
            // console.log("UPDATE TODO API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(updateTodo(response.data.updatedTodo));
            toast.success("Todo updated successfully");
        } catch (err) {
            // console.log("UPDATE TODO API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to update todo");
        }
        toast.dismiss(toastId);
    };
};

export const deleteTodoApi = (token, todoId, setIsSaving) => {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting todo...");
        setIsSaving(true);
        try {
            const response = await apiConnector("DELETE", DELETE_TODO_API.replace(':id', todoId), null, { Authorization: `Bearer ${token}` });
            // console.log("DELETE TODO API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(deleteTodo(response.data.deletedTodo));
            toast.success("Todo deleted successfully");
        } catch (err) {
            // console.log("DELETE TODO API ERROR............", err);
            toast.error(err?.response?.data?.message || "Failed to delete todo");
        }
        toast.dismiss(toastId);
        setIsSaving(false);
    };
};
