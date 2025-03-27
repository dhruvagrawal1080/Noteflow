import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote, updateSharedNote } from "../services/operations/noteAPI";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, status, heading, title, content, noteId, permission, clickPos, tab = false }) => {
    const [noteData, setNoteData] = useState({
        title: title,
        content: content
    });

    const [isDirty, setIsDirty] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.token);

    useEffect(() => {
        setIsDirty(noteData.title !== title || noteData.content !== content);
    }, [noteData]);

    useEffect(() => {
        setNoteData({ title, content });
        setIsDirty(false);
    }, [title, content, isOpen]);

    const handleClose = () => {
        if (isDirty) {
            if (!window.confirm("You have unsaved changes. Are you sure you want to close?")) {
                return;
            }
        }
        setNoteData({ title, content });
        setIsDirty(false);
        onClose();
    };

    const onSave = () => {
        if (!noteData.title || !noteData.content) {
            toast.error('Provide both title and content');
            return;
        }

        if (status === 'create') {
            dispatch(createNote(token, noteData));
        } else if (status === 'update' && !tab) {
            if (!isDirty) {
                if (window.confirm("You have not change anything.")) {
                    return;
                }
            }
            dispatch(updateNote(token, noteData, noteId));
        } else {
            dispatch(updateSharedNote(token, noteId, noteData, tab));
        }
        setNoteData({ title: '', content: '' });
        setIsDirty(false);
        onClose();
    };

    // Calculate the offset from the center of the viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    // If clickPos is not provided, default to center (0,0 offset)
    const offsetX = clickPos ? clickPos.x - centerX : 0;
    const offsetY = clickPos ? clickPos.y - centerY : 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    {/* Modal Content */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-2xl w-full sm:w-[50vw] relative overflow-auto"
                        // The modal will start at the click position offset relative to the center, then animate to center.
                        initial={{ opacity: 0, scale: 0.5, x: offsetX, y: offsetY }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, x: offsetX, y: offsetY }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex flex-wrap items-center justify-between mb-3 cursor-auto">
                            <p className="text-lg sm:text-xl md:text-2xl font-medium">{heading}</p>
                            {permission === 'view' && <p className="underline text-sm sm:text-base">View Only</p>}
                        </div>

                        {/* Note Form */}
                        <form>
                            <textarea
                                className="w-full p-2 border-b border-gray-400 font-bold text-lg sm:text-xl md:text-2xl outline-none h-[4rem] resize-none"
                                placeholder="Note Title"
                                value={noteData.title}
                                disabled={permission === 'view'}
                                onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                            />
                            <textarea
                                className="w-full p-2 text-base sm:text-lg outline-none h-[15rem] sm:h-[20rem] md:h-[25rem] resize-none"
                                placeholder="Start writing your note here..."
                                value={noteData.content}
                                disabled={permission === 'view'}
                                onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
                            />
                        </form>

                        {/* Buttons */}
                        <div className="flex flex-wrap justify-start sm:justify-end space-x-2 mt-3">
                            <button
                                onClick={handleClose}
                                className="px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-md text-sm sm:text-base cursor-pointer"
                            >
                                Cancel
                            </button>
                            {
                                permission === 'edit' && (
                                    <button
                                        onClick={onSave}
                                        className="px-3 sm:px-4 py-2 bg-[#2563EB] text-white rounded-md text-sm sm:text-base cursor-pointer"
                                    >
                                        {status === 'create' ? 'Save' : 'Update'}
                                    </button>
                                )
                            }
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
