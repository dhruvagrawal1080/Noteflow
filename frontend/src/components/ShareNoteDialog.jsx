import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes, FaLink, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { shareNote, updateShare } from "../services/operations/noteAPI";

const ShareNoteDialog = ({ onClose, note }) => {
    const [email, setEmail] = useState("");
    const [permission, setPermission] = useState("view");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.token);
    const { user } = useSelector((state) => state.user);
    const owner = user._id == note.createdBy;
    const sharedUsers = note.sharedWith;
    const noteUrl = `${window.location.origin}/note/${note._id}`;

    const handleShare = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Enter email address');
            return;
        }
        dispatch(shareNote(token, note._id, email, permission, user, setLoading));
    };

    const handleUpdateShare = (sharedUser, newPermission) => {
        if (sharedUser.permission === newPermission) return; // Avoid unnecessary API calls
        dispatch(updateShare(token, note._id, sharedUser.user.email, newPermission, setLoading));
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(noteUrl);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 sm:w-[30rem] max-h-[32rem] p-6 overflow-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Share Note</h2>
                    <button className="text-neutral-500 hover:text-neutral-700" onClick={onClose}>
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                {/* Share via Email (Only owner can share) */}
                {owner && (
                    <>
                        <form onSubmit={handleShare} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <select
                                    value={permission}
                                    onChange={(e) => setPermission(e.target.value)}
                                    className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    disabled={loading}
                                >
                                    <option value="view">Can view</option>
                                    <option value="edit">Can edit</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Share
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-300"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-4 text-sm text-neutral-500">Or share via</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Social Media Sharing */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <a
                        href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20note!&url=${encodeURIComponent(noteUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 cursor-pointer"
                    >
                        <FaTwitter className="text-2xl text-blue-600" />
                        <span className="text-sm">Twitter</span>
                    </a>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(noteUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 cursor-pointer"
                    >
                        <FaFacebook className="text-2xl text-blue-600" />
                        <span className="text-sm">Facebook</span>
                    </a>
                    <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(noteUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 cursor-pointer"
                    >
                        <FaLinkedin className="text-2xl text-blue-600" />
                        <span className="text-sm">LinkedIn</span>
                    </a>
                    <button
                        onClick={handleCopyLink}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 cursor-pointer"
                    >
                        <FaLink className="text-2xl text-blue-600" />
                        <span className="text-sm">Copy Link</span>
                    </button>
                </div>

                {/* Show shared users */}
                {sharedUsers.length > 1 && (
                    <div className="mt-6 pt-6 border-t border-neutral-200">
                        <h3 className="text-sm font-semibold mb-3">People with access</h3>
                        <div className="space-y-3">
                            {sharedUsers.filter(sharedUser => sharedUser.user._id !== user._id).map((sharedUser) => (
                                <div key={sharedUser._id} className="flex flex-wrap gap-2 items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={sharedUser.user.image}
                                            className="w-8 h-8 rounded-full"
                                            alt="avatar"
                                            loading="lazy"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/40"}
                                        />
                                        <div>
                                            <p className="text-sm font-medium">
                                                {sharedUser.user.firstName.charAt(0).toUpperCase() + sharedUser.user.firstName.slice(1)}
                                                {" "}
                                                {sharedUser.user.lastName.charAt(0).toUpperCase() + sharedUser.user.lastName.slice(1)}
                                            </p>
                                            <p className="text-xs text-neutral-500">{sharedUser.user.email}</p>
                                        </div>
                                    </div>
                                    {owner && (
                                        <select
                                            className="text-sm px-2 py-1 border border-neutral-300 rounded-lg cursor-pointer"
                                            value={sharedUser.permission}
                                            onChange={(e) => handleUpdateShare(sharedUser, e.target.value)}
                                            disabled={loading}
                                        >
                                            <option value="edit">Can edit</option>
                                            <option value="view">Can view</option>
                                            <option value="remove">Remove</option>
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShareNoteDialog;

