import React, { useState } from "react";
import {
  BookOpenText,
  Menu,
  ChevronDown,
  UserPlus,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../utils/hooks/useAuth";

// Reusable Dropdown Component
const Dropdown = ({ label, icon, children, isOpen, toggle }) => (
  <div className="relative">
    <button onClick={toggle} className="flex items-center gap-2 hover:text-cyan-800 focus:outline-none">
      {icon} <span>{label}</span> <ChevronDown className="text-gray-500 text-sm" />
    </button>
    {isOpen && (
      <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-10">
        {children}
      </div>
    )}
  </div>
);

// Navigation Links
const NavLinks = ({ role }) => (
  <>
    <Link className="hover:text-cyan-800" to={`/${role === "admin" ? "admin" : "dashboard"}`}>Home</Link>
    <Link className="hover:text-cyan-800" to="/contact">Contact</Link>
    <Link className="hover:text-cyan-800" to="/about">About</Link>
  </>
);

// Mobile Menu
const MobileMenu = ({ isAuthenticated, username, role, toggleUserDropdown, userDropdownOpen, handleLogout }) => (
  <div className="md:hidden mt-6 flex flex-col gap-4 text-lg px-5">
    <NavLinks role={role} />
    {!isAuthenticated ? (
      <div className="flex flex-col">
        <span className="font-semibold">Account</span>
        <Link to="/signup" className="ml-2 flex gap-2 px-4 py-2 hover:text-cyan-800">
          <UserPlus className="text-cyan-800" /> Signup
        </Link>
        <Link to="/login" className="ml-2 flex gap-2 px-4 py-2 hover:text-cyan-800">
          <LogIn className="text-cyan-800" /> Login
        </Link>
      </div>
    ) : (
      <div className="flex flex-col">
        <button onClick={toggleUserDropdown} className="flex items-center gap-2 text-gray-800 focus:outline-none">
          <User className="text-cyan-800" />
          <span className="font-medium uppercase">{username}</span>
          <ChevronDown className="text-gray-500 text-sm" />
        </button>
        {userDropdownOpen && (
          <div>
            <p>{username}</p>
            <button onClick={handleLogout} className="mt-2 flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md">
              <LogOut className="text-cyan-800" /> Logout
            </button>
          </div>
        )}
      </div>
    )}
  </div>
);

const Navbar = () => {
  const { authData } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAuthenticated = authData?.isAuthenticated;
  const role = authData?.user?.role;
  const username = authData?.user?.userName;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <nav className="w-full shadow-md p-3 pr-20 bg-white">
      <div className="flex justify-between items-center px-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <BookOpenText size={40} className="mr-2 text-cyan-600 drop-shadow-lg hover:text-orange-500 transition" />
          <Link to={`/${role === "admin" ? "admin" : "dashboard"}`}>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-2xl md:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-500 via-blue-500 to-orange-400 text-transparent bg-clip-text drop-shadow-lg"
            >
              TRANZO
            </motion.h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-lg items-center">
          <NavLinks role={role} />
          {!isAuthenticated ? (
            <Dropdown
              label="Account"
              icon={<User />}
              isOpen={accountDropdownOpen}
              toggle={() => setAccountDropdownOpen(!accountDropdownOpen)}
            >
              <Link to="/signup" className="flex gap-2 px-4 py-2 hover:text-cyan-800">
                <UserPlus className="text-cyan-800" /> Signup
              </Link>
              <Link to="/login" className="flex gap-2 px-4 py-2 hover:text-cyan-800">
                <LogIn className="text-cyan-800" /> Login
              </Link>
            </Dropdown>
          ) : (
            <Dropdown
              label={username}
              icon={<User className="text-cyan-800" />}
              isOpen={userDropdownOpen}
              toggle={() => setUserDropdownOpen(!userDropdownOpen)}
            >
              <p className="px-4 py-2">{username}</p>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 flex items-center gap-2 hover:text-cyan-800">
                <LogOut className="text-cyan-800" /> Logout
              </button>
            </Dropdown>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-cyan-800" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <span>X</span> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          username={username}
          role={role}
          toggleUserDropdown={() => setUserDropdownOpen(!userDropdownOpen)}
          userDropdownOpen={userDropdownOpen}
          handleLogout={handleLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;