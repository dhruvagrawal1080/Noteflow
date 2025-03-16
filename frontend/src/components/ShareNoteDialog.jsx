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

    const handleShare = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Enter email address');
            return;
        }
        dispatch(shareNote(token, note._id, email, permission, setLoading));
    };

    const handleUpdateShare = (sharedUser, newPermission) => {
        if (sharedUser.permission === newPermission) return; // Avoid unnecessary API calls
        dispatch(updateShare(token, note._id, sharedUser.user.email, newPermission, setLoading));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-auto">
            <div className="bg-white rounded-lg shadow-xl w-[30rem] max-h-[31.625rem] p-6 overflow-auto">


                {/* Header */}
                < div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl">Share Note</h2>
                    <button className="text-neutral-500 hover:text-neutral-700 cursor-pointer" onClick={onClose}>
                        <FaTimes className="text-xl" />
                    </button>
                </div>
                {
                    owner &&
                    (
                        <>
                            {/* Share via Email */}
                            <form onSubmit={handleShare}>
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
                                    />
                                    <select
                                        value={permission}
                                        onChange={(e) => setPermission(e.target.value)}
                                        className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 cursor-pointer"
                                        disabled={loading}
                                    >
                                        <option value="view">Can view</option>
                                        <option value="edit">Can edit</option>
                                    </select>
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-[#2563EB] text-white py-2 rounded-lg cursor-pointer">
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
                    )
                }

                {/* Social Media Sharing */}
                <div className="grid grid-cols-4 gap-4">
                    <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 cursor-pointer">
                        <FaTwitter className="text-2xl text-[#2563EB]" />
                        <span className="text-sm">Twitter</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 cursor-pointer">
                        <FaFacebook className="text-2xl text-[#2563EB]" />
                        <span className="text-sm">Facebook</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 cursor-pointer">
                        <FaLinkedin className="text-2xl text-[#2563EB]" />
                        <span className="text-sm">LinkedIn</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 cursor-pointer">
                        <FaLink className="text-2xl text-[#2563EB]" />
                        <span className="text-sm">Copy Link</span>
                    </button>
                </div>

                {
                    (sharedUsers.length > 1) &&
                    (
                        <>
                            {/* Current Permissions */}
                            <div className="mt-6 pt-6 border-t border-neutral-200">
                                <h3 className="text-sm mb-3">People with access</h3>
                                <div className="space-y-3">
                                    {sharedUsers.filter(sharedUser => sharedUser.user._id !== user._id).map((sharedUser) => (
                                        <div key={sharedUser._id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=${sharedUser.user.email}`}
                                                    className="w-8 h-8 rounded-full"
                                                    alt="avatar"
                                                    loading="lazy"
                                                />
                                                <div>
                                                    <p className="text-sm">
                                                        {sharedUser.user.firstName.charAt(0).toUpperCase() + sharedUser.user.firstName.slice(1)}
                                                        {" "}
                                                        {sharedUser.user.lastName.charAt(0).toUpperCase() + sharedUser.user.lastName.slice(1)}
                                                    </p>
                                                    <p className="text-xs text-neutral-500">{sharedUser.user.email}</p>
                                                </div>
                                            </div>
                                            <select
                                                className={`text-sm px-2 py-1 border border-neutral-300 rounded-lg cursor-pointer ${!owner && 'hidden'}`}
                                                value={sharedUser.permission}
                                                onChange={(e) => handleUpdateShare(sharedUser, e.target.value)}
                                                disabled={loading}
                                            >
                                                <option value="edit">Can edit</option>
                                                <option value="view">Can view</option>
                                                <option value="remove">Remove</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )
                }
            </div >
        </div >
    );
};

export default ShareNoteDialog;
