import React from 'react'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
    return (
        <div className='flex'>
            <div className=' min-w-[270px]'>
                <Sidebar />
            </div>
            <div className='w-[80%] h-screen'>
                {children}
            </div>
        </div>
    )
}
