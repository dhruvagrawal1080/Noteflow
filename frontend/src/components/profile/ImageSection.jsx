import React, { useState } from 'react'
import { TiEdit } from "react-icons/ti";

const ImageSection = ({ user }) => {
    const [isEditEnable, setEditEnable] = useState(false);
    return (
        <div className="flex items-center justify-between rounded-md border bg-white p-8 mt-6">
            <div className="flex items-center gap-x-4">
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName || "User"}`}
                    className="aspect-square w-20 rounded-full object-cover"
                />
                <div>
                    <p className="text-lg font-semibold">
                        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
                        {" "}
                        {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
                    </p>
                    <p className="text-sm">{user?.email}</p>
                </div>
            </div>
            <div>
                {
                    isEditEnable == false ?
                        (
                            <button
                                onClick={() => setEditEnable(prev => !prev)}
                                className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'>
                                Edit
                                <TiEdit />
                            </button>
                        ) :
                        (
                            <div className='flex items-center gap-2'>
                                <button className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'>
                                    Save
                                </button>
                                <button className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'>
                                    Cancel
                                </button>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default ImageSection