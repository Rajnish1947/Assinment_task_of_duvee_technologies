



import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  IoCloseOutline,
  IoLogOutOutline,
  IoPersonCircleOutline,
  IoMenuOutline,
} from "react-icons/io5";

import {
  MdOutlineDashboard,
  MdAddTask,
  MdFormatListBulleted,
  MdOutlineChat,
  MdFingerprint,
} from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef();

  //  Logout (clean)
  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login");
  };

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gradient-to-r from-sky-900 to-sky-800 text-white shadow-lg shadow-blue-500/30"
      : "text-gray-700 hover:bg-gray-100";

  return (
    <>
      {/* --- Top Navbar --- */}
      <nav className="bg-gradient-to-r from-sky-900 to-sky-800 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-40">
        <div className="flex items-center gap-4">
          {user && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 hover:bg-white/10 rounded-full"
            >
              <IoMenuOutline size={38} />
            </button>
          )}

          <h1
            className="text-2xl font-black cursor-pointer uppercase italic"
            onClick={() =>
              navigate(

                "/employees")

            }
          >
            Company<span className="text-yellow-500">Portal</span>
          </h1>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end py-2 px-4 border-l border-white/10">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1.5">
                System Access
              </p>
              <div className="flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <p className="text-xs font-black uppercase tracking-wider text-sky-400">
                  {user.role}
                </p>
              </div>
            </div>

            <IoPersonCircleOutline size={45} className="text-white hidden sm:block" />
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 ${sidebarOpen ? "block" : "hidden"
          }`}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
      >
        {/* Header */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <IoPersonCircleOutline size={45} />
            <button onClick={() => setSidebarOpen(false)}>
              <IoCloseOutline size={30} />
            </button>
          </div>

          <p className="mt-3 font-bold">
            Welcome,{" "}
            <span className="text-blue-600">{user?.name}</span>
          </p>
        </div>

        {/* Links */}
        <div className="p-4 flex flex-col gap-2">


          <SidebarLink to="/employees" icon={<MdOutlineDashboard />} text="Dashboard" activeClass={isActive("/employees")} />
          <SidebarLink to="/assign" icon={<MdAddTask />} text="Assign Task" activeClass={isActive("/assign")} />
          <SidebarLink to="/tasklist" icon={<MdFormatListBulleted />} text="All Tasks" activeClass={isActive("/tasklist")} />
          <SidebarLink to="/attendance" icon={<MdFingerprint />} text="Attendance" activeClass={isActive("/attendance")} />



        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-6 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full border-2 border-red-500 text-red-500 py-2 rounded-xl hover:bg-red-500 hover:text-white"
          >
            <IoLogOutOutline />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

// Sidebar Link
const SidebarLink = ({ to, icon, text, activeClass }) => (
  <Link
    to={to}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl ${activeClass}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-bold">{text}</span>
  </Link>
);

export default Navbar;