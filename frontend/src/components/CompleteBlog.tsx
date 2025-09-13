import { Appbar } from "./Appbar";

// CompleteBlog.tsx
interface CompleteBlogProps {
  blog: {
    title: string;
    content: string;
    author: { name: string };
    date: string;
  };
}

export const CompleteBlog = ({ blog }: CompleteBlogProps) => {
  return (
    <div>
        <Appbar/>
        <div className="bg-white shadow-md rounded-lg p-8 space-y-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <div className="flex items-center space-x-2 text-gray-500">
            <span>By {blog.author.name}</span>
            <span>•</span>
            <span>{blog.date}</span>
        </div>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
        </div>
        </div>
    </div>
  );
};
