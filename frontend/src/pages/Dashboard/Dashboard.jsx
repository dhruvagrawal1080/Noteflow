import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiMenu } from 'react-icons/fi';

const Dashboard = () => {
    const { loading } = useSelector((state) => state.token);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className='h-[calc(100vh-3.5rem)] flex flex-col md:flex-row'>
            {
                loading ?
                    (
                        <div className='flex justify-center items-center w-full h-full'>
                            <div className='spinner-black'></div>
                        </div>
                    ) :
                    (
                        <div className='flex h-full w-full relative'>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 text-xl fixed z-1 top-14 left-0 bg-gray-200 rounded-md"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <FiMenu />
                            </button>

                            < div className={`fixed lg:static h-full bg-white  transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-70 z-50 shadow-lg`}>
                                <Sidebar setSidebarOpen={setSidebarOpen} />
                            </div >

                            <div className='h-full bg-gray-100 w-full relative'>
                                <Outlet />
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Dashboard

