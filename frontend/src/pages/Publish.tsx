import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Please fill in both title and content before publishing.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("No authentication token found. Please login again.");
        navigate("/signin");
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/blogs`, {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Blog published successfully:", response.data);

      const blogId = response.data.id;

      // Redirect to the newly created blog page
      navigate(`/blog/${blogId}`);
    } catch (error: any) {
      console.error("Error publishing blog:", error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Authentication failed. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/signin");
      } else {
        alert(error.response?.data?.message || "Failed to publish blog");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 space-y-6">
          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title..."
            className="w-full text-2xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"
          />

          {/* Content editor */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            rows={12}
            className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />

          {/* Publish button */}
          <div className="flex justify-end">
            <button
              onClick={handlePublish}
              disabled={loading}
              className={`px-6 py-2 rounded-lg shadow transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};