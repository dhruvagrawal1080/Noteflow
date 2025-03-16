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
        noteData.title = title;
        noteData.content = content;
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
            dispatch(updateNote(token, noteData, noteId));
        } else {
            dispatch(updateSharedNote(token, noteId, noteData, tab));
        }
        noteData.title = '';
        noteData.content = '';
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
                        className="bg-white p-6 rounded-lg shadow-2xl w-[50vw] relative"
                        // The modal will start at the click position offset relative to the center, then animate to center.
                        initial={{ opacity: 0, scale: 0.5, x: offsetX, y: offsetY }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, x: offsetX, y: offsetY }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-2 cursor-auto">
                            <p className="text-3xl font-medium">{heading}</p>
                            {permission == 'view' && <p className="underline">View Only</p>}
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={handleClose}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer"
                                >
                                    Cancel
                                </button>
                                {
                                    permission == 'edit' &&
                                    (
                                        <button
                                            onClick={onSave}
                                            className="px-4 py-2 bg-[#2563EB] text-white rounded-md cursor-pointer"
                                        >
                                            {status === 'create' ? 'Save' : 'Update'}
                                        </button>
                                    )
                                }

                            </div>
                        </div>
                        <form>
                            <textarea
                                className="w-full p-2 border-b font-semibold text-3xl outline-none h-[4rem] resize-none"
                                placeholder="Note Title"
                                value={noteData.title}
                                disabled={permission == 'view'}
                                onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                            />
                            <textarea
                                className="w-full p-2 text-lg outline-none h-[20rem] resize-none"
                                placeholder="Start writing your note here..."
                                value={noteData.content}
                                disabled={permission == 'view'}
                                onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
                            />
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
