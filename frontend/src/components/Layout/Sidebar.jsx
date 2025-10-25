import React from 'react'
import { Link } from 'react-router-dom'

import {
    LayoutDashboard,
    BookOpen,
    Bookmark,
    Users,
    Settings
} from 'lucide-react';
import useAuth from '../../utils/hooks/useAuth';

export default function Sidebar() {
    const { authData } = useAuth()
    return (
        <div className='h-screen flex flex-col gap-2 bg-cyan-800 px-6 py-12 text-white text-lg font-medium'>

            <Link to={`${authData.user?.role === "admin" ? "/admin" : "/dashboard"}`} className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                <LayoutDashboard /> Dashboard
            </Link>

            <Link to="/books" className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                <BookOpen /> Books
            </Link>

            <Link to="/my-books" className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                <Bookmark /> My Books
            </Link>

            {
                authData.user?.role === "admin" && <Link to="/userManagement" className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                    <Users /> User Management
                </Link>
            }

            <Link to="/settings" className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                <Settings /> Settings
            </Link>
        </div>
    )
}
