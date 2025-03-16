import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const { loading } = useSelector((state) => state.token);
    return (
        <div className='h-[calc(100vh-3.5rem)] flex justify-center items-center'>
            {
                loading ?
                    (
                        <div className='spinner-black'></div>
                    ) :
                    (
                        <div className='flex h-full w-full'>
                            <div className='h-full'>
                                <Sidebar />
                            </div>

                            <div className='h-full bg-gray-100 w-full'>
                                <Outlet />
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Dashboard