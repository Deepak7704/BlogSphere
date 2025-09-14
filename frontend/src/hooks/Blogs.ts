import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Blog {
    content: string
    title: string
    id: string
    createdAt: string
    author: {
        name: string
        email: string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("No authentication token found. Please login again.");
                    return;
                }

                const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (err: any) {
                console.error("Error fetching blogs:", err);
                if (err.response?.status === 401 || err.response?.status === 403) {
                    alert("Authentication failed. Please login again.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userName");
                    window.location.href = "/signin";
                } else {
                    alert("Failed to fetch blogs. Please try again later");
                }
                setLoading(false);
            }
        }
        fetchBlogs();
    }, [])
    
    return {
        loading,
        blogs
    }
}

interface CompleteBlogParams {
    id: string
}

export const useGetBlog = ({ id }: CompleteBlogParams) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("No authentication token found. Please login again.");
                    return;
                }

                const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setBlog(response.data.blog);
                setLoading(false);
            } catch (err: any) {
                console.error("Error fetching blog:", err);
                if (err.response?.status === 401 || err.response?.status === 403) {
                    alert("Authentication failed. Please login again.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userName");
                    window.location.href = "/signin";
                } else if (err.response?.status === 404) {
                    alert("Blog not found.");
                } else {
                    alert("Failed to fetch blog. Please try again later");
                }
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id])
    
    return {
        loading,
        blog
    }
}