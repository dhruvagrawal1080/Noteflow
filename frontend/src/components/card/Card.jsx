import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineEditNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRipple } from "../../customHook/useRipple"; // Import the hook
import { formatTime } from "../../services/formatTime";
import { favoriteNote, removeFavoriteNote } from "../../services/operations/noteAPI";
import Modal from "../Modal";
import ShareNoteDialog from "../ShareNoteDialog";

const Card = ({ note, isFavorite, tab }) => {
    const truncatedTitle = note.title.split(" ").slice(0, 5).join(" ") + (note.title.split(" ").length > 5 ? "..." : "");
    const truncatedContent = note.content.split(" ").slice(0, 15).join(" ") + (note.content.split(" ").length > 15 ? "..." : "");
    const [favorite, setFavorite] = useState(isFavorite);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { ripples, addRipple } = useRipple(); // Get ripples and event handler
    const [modalClickPos, setModalClickPos] = useState({ x: 0, y: 0 }); // State to store click coordinates for modal animation

    // Determine the user's permission
    const { user } = useSelector((state) => state.user);
    const sharedUser = note.sharedWith.find(shared => shared.user._id === user._id);
    const userPermission = sharedUser ? sharedUser.permission : (note.createdBy === user._id ? "edit" : "view");

    const favoriteHandler = () => {
        dispatch(favoriteNote(token, note._id, setFavorite));
    };

    const removeFavoriteHandler = () => {
        dispatch(removeFavoriteNote(token, note._id, setFavorite));
    };

    return (
        <div
            className="relative flex flex-col justify-between bg-white rounded-lg shadow-md border p-4 cursor-pointer mb-6 overflow-hidden"
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

            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#111827]">{truncatedTitle}</h3>
                    <div className="flex items-center gap-2">
                        {/* Capture click coordinates here */}
                        <MdOutlineEditNote
                            size={25}
                            onClick={(e) => {
                                // Capture the click position
                                setModalClickPos({ x: e.clientX, y: e.clientY });
                                setIsModalOpen(true);
                            }}
                        />
                        <IoShareSocialOutline size={20} onClick={() => setIsDialogOpen(true)} />
                    </div>
                </div>

                <p className="text-gray-700 py-2">{truncatedContent}</p>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-[#6B7280]">Updated {formatTime(note.updatedAt)} ago</p>
                {favorite ? (
                    <FaStar color="#FBBF24" size={20} onClick={removeFavoriteHandler} />
                ) : (
                    <FaRegStar size={20} onClick={favoriteHandler} />
                )}
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
        </div>
    );
};

export default Card;
