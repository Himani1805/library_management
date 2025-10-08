import React, { useState, useEffect } from "react";
import {
  BookOpenText,
  Menu,
  ChevronDown,
  UserPlus,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [studentDropdown, setStudentDropdown] = useState(false);
  const [userName, setUsername] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  function handleAccount(){
    setStudentDropdown(!studentDropdown)
    navigate("/account")
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <nav className="w-full shadow-md p-3 bg-white">
      <div className="flex justify-between items-center px-5">
        {/* Logo  */}
        <div className="flex items-center gap-2 justify-center">
          {/* <BookOpenText size={30} className="font-lg mr-2 text-cyan-800" /> */}
          <BookOpenText
            size={40}
            className="mr-2 text-cyan-600 drop-shadow-lg hover:text-orange-500 transition"
          />
          <Link to="/" >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-2xl md:text-4xl font-extrabold tracking-wide 
              bg-gradient-to-r from-cyan-500 via-blue-500 to-orange-400 
              text-transparent bg-clip-text drop-shadow-lg"
            >
              TRANZO
            </motion.h1>
          </Link>

        </div>

        {/* Desktop Menu */}
        <div className="w-1/2 md:flex justify-end text-lg hidden ">
          {/* Not logged in → Home/Contact/About/Account */}
          {!userName && (
            <div className="hidden md:flex space-x-10 text-lg">
              <Link className="hover:text-cyan-800" to="/">
                Home
              </Link>
              <Link className="hover:text-cyan-800" to="/contact">
                Contact
              </Link>
              <Link className="hover:text-cyan-800" to="/about">
                About Us
              </Link>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={handleAccount}
                  // onClick={() => setStudentDropdown(!studentDropdown)}
                  className="flex items-center gap-1 hover:text-cyan-800 focus:outline-none"
                >
                  Account <ChevronDown />
                </button>
                {studentDropdown && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 w-40">
                    <Link
                      to="/signup"
                      className="flex gap-2 px-4 py-2 hover:text-cyan-800"
                    >
                      <UserPlus className="text-cyan-800" /> Signup
                    </Link>
                    <Link
                      to="/login"
                      className="flex gap-2 px-4 py-2 hover:text-cyan-800"
                    >
                      <LogIn className="text-cyan-800" /> Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Logged in → Username + Logout */}
          {userName && (
            <div className="relative ">
              <button
                className="flex items-center gap-2 text-gray-800 focus:outline-none"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <User className="text-cyan-800" />
                <span className="font-semibold uppercase hover:text-cyan-800">{userName}</span>
                <ChevronDown className="text-cyan-800 text-sm" />
              </button>
              {userMenuOpen && (
                <div className="text-black absolute left-7 z-10 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 flex items-center gap-2 hover:text-cyan-800"
                  >
                    <LogOut className="text-cyan-800" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden text-cyan-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <span>X</span> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="justify-evenly text-lg flex flex-col gap-4 md:hidden mt-6">
          {/* Not logged in → Home/Contact/About/Account */}
          {!userName && (
            <>
              <Link className="hover:text-cyan-800" to="/">
                Home
              </Link>
              <Link className="hover:text-cyan-800" to="/contact">
                Contact
              </Link>
              <Link className="hover:text-cyan-800" to="/about">
                About Us
              </Link>

              <div className="flex flex-col">
                <span className="font-semibold">Account</span>
                <Link
                  className="hover:text-cyan-800 ml-2 flex gap-2 px-4 py-2"
                  to="/signup"
                >
                  <UserPlus className="text-cyan-800" /> Signup
                </Link>
                <Link
                  className="hover:text-cyan-800 ml-2 flex gap-2 px-4 py-2"
                  to="/login"
                >
                  <LogIn className="text-cyan-800" /> Login
                </Link>
              </div>
            </>
          )}

          {/* Logged in → Username + Logout */}
          {userName && (
            <div>
              <button
                className="flex items-center gap-2 text-gray-800 focus:outline-none"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <User className="text-cyan-800" />
                <span className="font-medium uppercase">{userName}</span>
                <ChevronDown className="text-gray-500 text-sm" />
              </button>
              {userMenuOpen && (
                <div className="ml-6 mt-2 flex flex-col gap-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    <LogOut className="text-cyan-800" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
