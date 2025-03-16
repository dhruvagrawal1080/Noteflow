import React, { useState } from 'react'
import { HiPencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/authApi';

const Navbar = () => {
    const { token } = useSelector((state) => state.token);
    const { user } = useSelector((state) => state.user);
    const [tab, showTab] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout(navigate));
    }

    return (
        <div className='flex justify-between items-center shadow-md relative'>
            <div className={`modal absolute h-screen w-screen top-0 ${tab == false && 'hidden'}`} onClick={() => showTab(false)}></div>

            <div className='flex items-center justify-between w-[85%] mx-auto py-3 h-[3.5rem]'>

                <NavLink to={'/'} className='flex items-center gap-2'>
                    <HiPencilSquare size={30} color={'#2563eb'} />
                    <p className='text-xl font-bold'>NoteFlow</p>
                </NavLink>

                <div className='flex items-center gap-16'>
                    <NavLink to={'/'}
                        className={({ isActive }) => `hover:text-[#2563eb] hover:border-b-2 transition-all duration-50 ${isActive ? 'text-[#2563eb] border-b-2 font-semibold' : 'text-black'}`}
                    >Home</NavLink>

                    <NavLink to={'/about'}
                        className={({ isActive }) => `hover:text-[#2563eb] hover:border-b-2 transition-all duration-50 ${isActive ? 'text-[#2563eb] border-b-2 font-semibold' : 'text-black'}`}
                    >About</NavLink>

                    <NavLink to={'/contact'}
                        className={({ isActive }) => `hover:text-[#2563eb] hover:border-b-2 transition-all duration-50 ${isActive ? 'text-[#2563eb] border-b-2 font-semibold' : 'text-black'}`}
                    >Contact</NavLink>
                </div>

                <div>
                    {
                        token ?
                            (
                                <div className='flex items-center gap-2'>

                                    <p>{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()} {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()}</p>

                                    <div className='relative flex justify-center cursor-pointer' onClick={() => showTab(!tab)}>
                                        <img src={user.image} className='rounded-full w-10 bg-black p-0.5' loading='lazy' />
                                        <div className='bg-green-500 w-2 aspect-square rounded-full absolute right-7 bottom-0.5'>
                                        </div>

                                        {
                                            tab &&
                                            (
                                                <div className='flex flex-col items-center'>
                                                    <div className='relative'>
                                                        <div className='w-5 rotate-45 bg-[#dad7d7] aspect-square absolute top-11 right-2 z-1 border'></div>
                                                    </div>
                                                    <div className='absolute top-[3.25rem] -left-10 border rounded-lg bg-[#dad7d7] flex flex-col items-center z-50'>
                                                        <Link to={'/dashboard/my-profile'} className='cursor-pointer text-xl border-b w-full text-center px-4 py-1'>Profile</Link>
                                                        <Link to={'/dashboard/My-notes'} className='cursor-pointer text-xl text-center px-4 py-1 border-b'>Dashboard</Link>
                                                        <div className='cursor-pointer text-xl text-center px-4 py-1' onClick={logoutHandler}>Logout</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>
                            ) :
                            (
                                <div className='flex gap-4'>
                                    <NavLink to={'/login'}
                                        className={({ isActive }) => `border px-4 py-1 rounded-md hover:text-[#2563eb] ${isActive ? 'bg-[#2563eb] text-white border-2 font-semibold hover:text-white' : ''}`}
                                    >Login</NavLink>
                                    <NavLink to={'/signup'}
                                        className={({ isActive }) => `border px-4 py-1 rounded-md hover:text-[#2563eb] ${isActive ? 'bg-[#2563eb] text-white border-2 font-semibold hover:text-white' : ''}`}
                                    >Sign Up</NavLink>
                                </div>
                            )
                    }
                </div>

            </div>

        </div>
    )
}

export default Navbar