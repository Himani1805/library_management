import React from 'react'
import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className='w-1/4 flex flex-col gap-2 bg-teal-800 h-screen'>
        <Link to={"/dashboard"} ><LayoutDashboard />Dashboard</Link>
        <Link to={"/books"} ></Link>
         <Link to={"/myBooks"} ></Link>

      
    </div>
  )
}

export default Sidebar;

