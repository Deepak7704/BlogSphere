import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();

  // Get user details from localStorage (you can change based on your auth flow)
  const userName = localStorage.getItem("userName") || "Guest User";

  const handleLogout = () => {
    localStorage.removeItem("token");   // remove auth token // clear saved username if stored
    navigate("/signup"); // redirect to signup
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Branding */}
        <Link to="/blogs">
          <div className="text-xl font-bold text-gray-800 cursor-pointer hover:text-gray-900">
            Medium
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Post Button */}
          <Link to="/publish">
            <button className="px-5 py-2 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600 transition-all">
              Post
            </button>
          </Link>

          {/* Notifications */}
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Notifications
          </button>

          {/* Avatar */}
          <Avatar name={userName} />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-800 ml-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
