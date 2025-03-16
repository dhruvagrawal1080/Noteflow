import React from 'react';
import { TiEdit } from "react-icons/ti";

const EditBtn = ({ isEditEnable, setEditEnable }) => {
    return (
        <button
            className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'
            onClick={() => setEditEnable(prev => !prev)}
        >
            <p>{isEditEnable == false ? 'Edit' : 'Cancel'}</p>
            <TiEdit />
        </button>
    )
}

export default EditBtn