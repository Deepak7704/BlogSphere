import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Appbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get user details from localStorage (you can change based on your auth flow)
  const userName = localStorage.getItem("userName") || "Guest User";

  const handleLogout = () => {
    localStorage.removeItem("token");   // remove auth token
    navigate("/signup"); // redirect to signup
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          {/* Logo / Branding */}
          <Link to="/blogs">
            <div className="text-lg sm:text-xl font-bold text-gray-800 cursor-pointer hover:text-gray-900">
              Blog Sphere
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Post Button */}
            <Link to="/publish">
              <button className="px-4 sm:px-5 py-2 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600 transition-all">
                Post
              </button>
            </Link>

            {/* Avatar */}
            <Avatar name={userName} />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          >
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-4 border-t border-gray-100`}>
          <div className="flex flex-col space-y-3 pt-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 px-2">
              <Avatar name={userName} />
              <span className="text-sm font-medium text-gray-700 truncate">
                {userName}
              </span>
            </div>

            {/* Post Button */}
            <Link to="/publish" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all">
                Create Post
              </button>
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all text-left"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
