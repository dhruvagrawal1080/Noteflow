import React, { useState } from "react";
import { FaRegStar, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useRipple } from "../../customHook/useRipple"; // Import the hook
import { formatTime } from "../../services/formatTime";
import { deleteNote, favoriteNote, removeFavoriteNote, restoreNote } from "../../services/operations/noteAPI";
import Modal from "../Modal";
import ShareNoteDialog from "../ShareNoteDialog";
import { MdOutlineRestorePage } from "react-icons/md";
import DeleteForeverDialog from "../DeleteForeverDialog";

const Card = ({ note, isFavorite, tab, isTrashPage = false }) => {
    const truncatedTitle = note.title.length > 50 ? `${note.title.slice(0, 50)}...` : note.title;
    const truncatedContent = note.content.length > 120 ? `${note.content.slice(0, 120)}...` : note.content;

    const [favorite, setFavorite] = useState(isFavorite);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { ripples, addRipple } = useRipple(); // Get ripples and event handler
    const [modalClickPos, setModalClickPos] = useState({ x: 0, y: 0 }); // State to store click coordinates for modal animation

    const [isDeleteForeverDialogOpen, setDeleteForeverDialogOpen] = useState(false);

    // Determine the user's permission
    const { user } = useSelector((state) => state.user);
    const sharedUser = note.sharedWith.find(shared => shared.user._id === user._id);
    const userPermission = sharedUser ? sharedUser.permission : (note.createdBy === user._id ? "edit" : "view");

    const owner = user._id == note.createdBy;

    const favoriteHandler = () => {
        dispatch(favoriteNote(token, note._id, setFavorite));
    };

    const removeFavoriteHandler = () => {
        dispatch(removeFavoriteNote(token, note._id, setFavorite));
    };

    const handleDeleteNote = () => {
        dispatch(deleteNote(token, note._id));
    }

    const handlePermanentDeleteNote = () => {
        setDeleteForeverDialogOpen(true);
    }

    const handleRestoreNote = () => {
        dispatch(restoreNote(token, note._id));
    }

    return (
        <div
            className="relative flex flex-col bg-white rounded-lg shadow-md border p-4 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg md:w-auto w-full overflow-hidden"
            onClick={(e) => addRipple(e)}
        >
            {/* Ripple Effect */}
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute ripple-effect"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}

            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#111827] break-words word-break break-all">{truncatedTitle}</h3>
                    <div className="flex items-center gap-2">
                        {/* Capture click coordinates here */}
                        {
                            isTrashPage == false ?
                                (
                                    <>
                                        <LuPencil
                                            size={20}
                                            className="hover:text-blue-600"
                                            onClick={(e) => {
                                                // Capture the click position
                                                setModalClickPos({ x: e.clientX, y: e.clientY });
                                                setIsModalOpen(true);
                                            }}
                                        />
                                        <IoShareSocialOutline size={20} onClick={() => setIsDialogOpen(true)} />
                                        {
                                            owner &&
                                            (
                                                <FaRegTrashAlt
                                                    size={20}
                                                    className="hover:text-red-600"
                                                    onClick={handleDeleteNote}
                                                />
                                            )
                                        }
                                    </>
                                ) :
                                (
                                    <>
                                        <MdOutlineRestorePage
                                            size={23}
                                            className="hover:text-green-600"
                                            onClick={handleRestoreNote}
                                        />
                                        <FaRegTrashAlt
                                            size={20}
                                            className="hover:text-red-600"
                                            onClick={handlePermanentDeleteNote}
                                        />
                                    </>
                                )
                        }
                    </div>
                </div>

                <p className="text-gray-700 py-2 text-sm break-words word-break break-all">{truncatedContent}</p>
            </div>

            {/* Footer (Updated Time & Favorite) */}
            <div className="flex items-center justify-between text-sm mt-2">
                <p className="text-[#6B7280]">Updated {formatTime(note.updatedAt)} ago</p>
                {
                    !isTrashPage &&
                    <>
                        {
                            favorite ?
                                (
                                    <FaStar color="#FBBF24" size={20} className="cursor-pointer" onClick={removeFavoriteHandler} />
                                ) :
                                (
                                    <FaRegStar size={20} className="cursor-pointer" onClick={favoriteHandler} />
                                )
                        }
                    </>
                }
            </div>

            {/* Pass the click position to the Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                status={'update'}
                heading={'Update note'}
                title={note.title}
                content={note.content}
                noteId={note._id}
                permission={userPermission}
                clickPos={modalClickPos}
                tab={tab}
            />

            {
                isDialogOpen &&
                <ShareNoteDialog
                    onClose={() => setIsDialogOpen(false)}
                    note={note}
                />
            }

            {
                <DeleteForeverDialog
                    isOpen={isDeleteForeverDialogOpen}
                    onClose={() => setDeleteForeverDialogOpen(false)}
                    onConfirm={() => dispatch(deleteNote(token, note._id))}
                />
            }
        </div>
    );
};

export default Card;
