import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { updateDisplayPicture } from '../../services/operations/profileAPI';
import { FiUpload } from "react-icons/fi";

const ImageSection = ({ user }) => {
    const { token } = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const [isEditEnable, setEditEnable] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            previewFile(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleFileUpload = () => {
        if (!imageFile) {
            toast.error('Please select image file');
            return;
        }
        const formData = new FormData();
        formData.append("profileImage", imageFile)
        dispatch(updateDisplayPicture(token, formData, setLoading, setEditEnable))
            .then(() => {
                setImageFile(null); // Reset selected file
            })
            .catch(() => toast.error("Upload failed"))
    }

    const handleCancel = () => {
        setEditEnable(false);
        setImageFile(null);
        setPreviewSource(user?.image);
    };

    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])

    return (
        <div className="flex items-center justify-between rounded-md border bg-white p-8 mt-6">
            <div className="flex items-center gap-x-4">
                <img
                    src={previewSource || user?.image}
                    alt={`profile-${user?.firstName || "User"}`}
                    className="aspect-square w-20 rounded-full object-cover"
                />
                <div>
                    {
                        isEditEnable == false ?
                            (
                                <>
                                    <p className="text-lg font-semibold">
                                        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
                                        {" "}
                                        {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
                                    </p>
                                    <p className="text-sm">{user?.email}</p>
                                </>
                            ) :
                            (
                                <div className="space-y-2">

                                    <p className='text-lg font-semibold text-center'>Change Profile Picture</p>

                                    <div className="flex gap-3">

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/png, image/gif, image/jpeg, image/jpg"
                                        />

                                        <button
                                            onClick={handleClick}
                                            disabled={loading}
                                            className="border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white"
                                        >
                                            Select
                                        </button>

                                        <button
                                            className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'
                                            onClick={handleFileUpload}
                                        >
                                            {
                                                loading ?
                                                    (
                                                        <p>Uploading...</p>
                                                    ) :
                                                    (
                                                        <>
                                                            <p>Upload</p>
                                                            < FiUpload />
                                                        </>
                                                    )
                                            }
                                        </button>

                                    </div>

                                </div>
                            )
                    }
                </div>
            </div>
            <div>
                {
                    isEditEnable == false ?
                        (
                            <button
                                onClick={() => setEditEnable(true)}
                                className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'>
                                Edit
                                <TiEdit />
                            </button>
                        ) :
                        (
                            <button
                                onClick={handleCancel}
                                className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'>
                                Cancel
                            </button>
                        )
                }
            </div>
        </div>
    )
}

export default ImageSection