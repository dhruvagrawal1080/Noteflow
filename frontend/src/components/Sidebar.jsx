import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaNoteSticky } from "react-icons/fa6";
import { FaShareNodes } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { BsFillBellFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <div className='h-full sidebar-shadow'>

            <div className='flex flex-col gap-4 px-6 pt-10 pb-5 border-b-1 border-[#E5E7EB]'>
                <NavLink to="/dashboard/my-notes" className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`} >
                    <FaNoteSticky size={20} />
                    <p className='text-xl'>My Notes</p>
                </NavLink>
                <NavLink to="/dashboard/sharedNotes" className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <FaShareNodes size={20} />
                    <p className='text-xl'>Shared Notes</p>
                </NavLink>
                <NavLink to="/dashboard/todoList" className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <LuListTodo size={20} />
                    <p className='text-xl'>To-Do List</p>
                </NavLink>
                <NavLink to="/dashboard/remainders" className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-20 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <BsFillBellFill size={20} />
                    <p className='text-xl'>Remainders</p>
                </NavLink>
                <NavLink to="/dashboard/favorites" className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <FaStar size={20} />
                    <p className='text-xl'>Favorites</p>
                </NavLink>
                <NavLink to="/dashboard/trash" className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <FaTrash size={20} />
                    <p className='text-xl'>Trash</p>
                </NavLink>
            </div>

            <div className='flex px-4 pt-4 gap-x-2'>
                <img
                    src={user.image}
                    alt="user"
                    loading='lazy'
                    className='aspect-square rounded-full w-12'
                />
                <div className=''>
                    <p className='font-semibold'>
                        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
                        {" "}
                        {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
                    </p>
                    <p className='text-[#6B7280] text-sm'>{user.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar