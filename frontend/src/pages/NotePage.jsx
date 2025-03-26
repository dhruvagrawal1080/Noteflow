import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getNoteById } from "../services/operations/noteAPI";

const NotePage = () => {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = dispatch(getNoteById(noteId, setNote, setLoading));
        setNote(data);
    }, [noteId]);

    if (loading) return <div className="text-center mt-10 text-xl sm:text-3xl">Loading note...</div>;
    if (!note || note.deletedAt) return <div className="text-center mt-10 text-xl sm:text-3xl">Note not found.</div>;

    return (
        <div className="w-full h-[calc(100vh-3.5rem)] flex justify-center bg-gray-100">
            <div className="w-3xl h-[35rem] mt-10 p-6 bg-white rounded-lg shadow-md">
                <p className="text-sm text-gray-500">Created By : {note.createdBy.firstName} {note.createdBy.lastName}</p>
                <p className="text-sm text-gray-500">Email : {note.createdBy.email}</p>
                <h1 className="text-2xl font-bold my-2">{note.title}</h1>
                <div className="border border-gray-200"></div>
                <div className="mt-2 text-lg text-gray-700 h-[22rem] overflow-auto">{note.content}</div>
            </div>
        </div>
    );
};

export default NotePage;
