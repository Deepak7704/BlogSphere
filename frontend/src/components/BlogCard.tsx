import { Link } from "react-router-dom"

interface BlogCardProps {
  authorName: string
  title: string
  content: string
  publishedDate: string
  id: string
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border border-slate-300 rounded-lg p-4 shadow-sm bg-white max-w-xl mx-auto my-4 cursor-pointer">
        {/* Author Section */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar name={authorName} />
          <div className="text-sm text-slate-600">
            <span className="font-medium">{authorName}</span>
            <span className="ml-2 text-gray-400">• {publishedDate}</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-xl font-bold mb-2">{title}</div>

        {/* Content Preview */}
        <div className="text-md text-gray-700 mb-3">
          {content.slice(0, 100) + "..."}
        </div>

        {/* Read Time */}
        <div className="text-sm text-gray-500">
          {`${Math.ceil(content.length / 500)} min read`}
        </div>
      </div>
    </Link>
  )
}

export function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-800 font-bold">
      {initials}
    </div>
  )
}