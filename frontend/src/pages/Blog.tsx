import { useParams } from "react-router-dom";
import { useGetBlog } from "../hooks/Blogs";
import { Appbar } from "../components/Appbar";

// Skeleton component
const BlogSkeleton = () => {
  return (
    <div>
      <Appbar />
      <div className="bg-white shadow-md rounded-lg p-8 space-y-4 animate-pulse">
        {/* Title skeleton */}
        <div className="h-10 bg-gray-300 rounded w-3/4"></div>

        {/* Author & Date skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-4"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

// CompleteBlog component
interface CompleteBlogProps {
  blog: {
    title: string;
    content: string;
    author: { name: string };
    date: string;
  };
}

const CompleteBlog = ({ blog }: CompleteBlogProps) => {
  return (
    <div>
      <Appbar />
      <div className="bg-white shadow-md rounded-lg p-8 space-y-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <div className="flex items-center space-x-2 text-gray-500">
          <span>By {blog.author.name}</span>
          <span>•</span>
          <span>{new Date(blog.date).toLocaleDateString()}</span>
        </div>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </div>
  );
};

// Main Blog page component
export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useGetBlog({ id: id! });

  if (loading) return <BlogSkeleton />;
  if (!blog) return <div className="p-8 text-red-500">Blog not found.</div>;

  return <CompleteBlog blog={blog} />;
};
