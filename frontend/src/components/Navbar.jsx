import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 2000,
    });

    setTimeout(() => {
        navigate("/");
    }, 500);
};
  return (
    <nav className="bg-slate-800 text-white">
     <div className="flex justify-between items-center px-6 py-5 h-14">
       {/* Logo */}
<div className="logo text-2xl md:text-2xl font-bold tracking-tight cursor-pointer select-none">
  <span className="text-white-500">Key</span>
  <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
    Nest
  </span>
</div>

       
        {/* Logout Button */}
<button
  onClick={handleLogout}
  className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H9m4 8H5a2 2 0 01-2-2V6a2 2 0 012-2h8"
    />
  </svg>

  <span>Logout</span>
</button>
      </div>
    </nav>
  );
};

export default Navbar;

