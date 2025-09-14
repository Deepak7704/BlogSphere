import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks/Blogs";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div>
      <Appbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
            Latest Blogs
          </h1>

          {/* Blog List */}
          <div className="space-y-6">
            {loading
              ? // Skeleton loading placeholders
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-6 border border-gray-200 rounded-lg shadow animate-pulse bg-white"
                  >
                    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                ))
              : // Render actual blog cards
                blogs.map((blog) => (
                  <BlogCard
                    id={blog.id}
                    key={blog.id}
                    authorName={blog.author.name || "Unknown Author"}
                    publishedDate={new Date(blog.createdAt).toLocaleDateString()}
                    title={blog.title || "No Title"}
                    content={blog.content || "No Content"}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};