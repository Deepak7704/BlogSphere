import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
interface Blog{
    content:string
    title:string
    id:string
    author:{
        name:string
    }
    date:string
}
export const useBlogs = () =>{
    const[loading,setLoading] = useState(true);
    const[blogs,setBlogs] = useState<Blog[]>([]);
    useEffect(()=>{
        const fetchBlogs = async () => {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
                setBlogs(response.data.blogs);
                setLoading(false);
            }catch(err){
                alert("Failed to fetch blogs. Please try again later");
            }
        }
        fetchBlogs();
    },[])
    return {
        loading,
        blogs
    }
}
interface CompleteBlog{
    id:string
}
export const useGetBlog = ({id} : CompleteBlog) => {
    const[loading,setLoading] = useState(true);
    const[blog,setBlog] = useState<Blog>();
    useEffect(()=>{
        const fetchBlogs = async () => {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
                setBlog(response.data.blog);
                setLoading(false);
            }catch(err){
                alert("Failed to fetch blogs. Please try again later");
            }
        }
        fetchBlogs();
    },[id])
    return {
        loading,
        blog
    }
}