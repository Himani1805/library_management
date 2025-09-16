import React, { useEffect, useState } from "react";
import { BookOpenText, User, ChevronDown, LogOut, Menu, CircleX } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUsername] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login"; // redirect to login after logout
  };

  return (
<div>
            <nav className="">
            <div className="flex justify-between items-center  mx-auto">

              {/* Desktop (hidden on mobile) */}
              <div className="hidden md:block">
                {userName && (
                  <div className="relative">
                    <button
                      className="flex items-center gap-2 text-gray-800 focus:outline-none"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                      <User className="text-cyan-800" />
                      <span className="font-medium uppercase">{userName}</span>
                      <ChevronDown className="text-gray-500 text-sm" />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
                        >
                          <LogOut className="text-cyan-800" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Icon */}
              <div className="block md:hidden text-cyan-800" onClick={() => setOpen(!open)}>
                {open ? <CircleX /> : <Menu />}
              </div>
            </div>

            {/* Mobile Dropdown */}
            {open && (
              <div className="flex flex-col gap-4 mt-4 md:hidden">
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
</div>
  );
};

export default Header;
