import React from 'react';
import { BsFillBellFill } from "react-icons/bs";
import { FaStar, FaTrash } from "react-icons/fa";
import { FaNoteSticky, FaShareNodes } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ setSidebarOpen }) => {
    const { user } = useSelector((state) => state.user);
    return (
        <div className='h-full sidebar-shadow'>

            {/* Close Button for Mobile */}
            <div className='flex justify-between items-center px-6 pt-2 lg:hidden'>
                <h2 className="text-xl font-semibold">Menu</h2>
                <button onClick={() => setSidebarOpen(false)} className="text-2xl">
                    <IoClose />
                </button>
            </div>

            <div className='flex flex-col gap-4 px-6 pt-5 lg:pt-10 pb-5 border-b-1 border-[#E5E7EB]'>
                <NavLink
                    to="/dashboard/my-notes"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`} >
                    <FaNoteSticky size={20} />
                    <p className='text-xl'>My Notes</p>
                </NavLink>
                <NavLink
                    to="/dashboard/sharedNotes"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <FaShareNodes size={20} />
                    <p className='text-xl'>Shared Notes</p>
                </NavLink>
                <NavLink
                    to="/dashboard/todoList"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <LuListTodo size={20} />
                    <p className='text-xl'>To-Do List</p>
                </NavLink>
                <NavLink
                    to="/dashboard/remainders"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-20 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <BsFillBellFill size={20} />
                    <p className='text-xl'>Remainders</p>
                </NavLink>
                <NavLink
                    to="/dashboard/favorites"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <FaStar size={20} />
                    <p className='text-xl'>Favorites</p>
                </NavLink>
                <NavLink
                    to="/dashboard/trash"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-4 rounded-md py-2 pl-4 pr-10 hover:bg-[#f3f4f6] ${isActive ? 'bg-[#f3f4f6]' : ''}`}>
                    <FaTrash size={20} />
                    <p className='text-xl'>Trash</p>
                </NavLink>
            </div>

            <div className='flex items-center px-4 pt-4 gap-x-2 overflow-hidden'>
                <img
                    src={user.image}
                    alt="user"
                    loading='lazy'
                    className='aspect-square rounded-full w-12 object-cover'
                />
                <div className='flex flex-col'>
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