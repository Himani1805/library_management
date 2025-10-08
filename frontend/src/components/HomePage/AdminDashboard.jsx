import React from 'react'
import { Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    BookOpen, 
    Bookmark, 
    Users, 
    Settings 
} from 'lucide-react';
import Books from '../../pages/Books';
import EditBooks from '../book/EditBooks';
import UserManagement from '../../pages/UserManagement';
// import Settings from '../../pages/Settings';

const AdminDashboard = () => {
    return (
        <div className='h-screen flex'>
            {/* Sidebar */}
            <div className='w-1/4 flex flex-col gap-2 bg-cyan-800 px-6 py-12 text-white text-lg font-medium'>
                
                <Link to="/admin" className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                    <LayoutDashboard /> Dashboard
                </Link>

                <Link to="/books" className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                    <BookOpen /> Books
                </Link>

                <Link to="/myBooks" className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                    <Bookmark /> My Books
                </Link>

                <Link to="/userManagement" className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                    <Users /> User Management
                </Link>

                <Link to="/settings" className='flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition'>
                    <Settings /> Settings
                </Link>
            </div>

            {/* Main Content */}
            <div className='w-3/4 flex flex-col gap-2 bg-gray-100'>
            <Books />
                 <h1 className='text-2xl font-bold text-gray-700'>Welcome to Admin Dashboard</h1> 
            </div>
            
                  {/* Main Content */}
            {/* <div className='w-3/4 flex flex-col bg-gray-100 overflow-auto'>
                <Routes>
                    <Route path="/" element={<div className="p-6"><h1 className="text-2xl font-bold text-gray-700">Welcome to Admin Dashboard</h1></div>} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/userManagement" element={<UserManagement />} />
                    <Route path="/settings" element={<Settings />} />
                   
                </Routes>
            </div> */}
        </div>
    )
}

export default AdminDashboard;
