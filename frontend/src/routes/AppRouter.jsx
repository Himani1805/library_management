import React from 'react'
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Books from '../pages/Books';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboardStudent" element={<Dashboard />} />

            {/* <Route path="/admin" element={<About />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboardStudent" element={<Dashboard />} />

        </Routes>
    )
}

export default AppRouter;
