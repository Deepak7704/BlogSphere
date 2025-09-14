import { Appbar } from "./Appbar";

interface CompleteBlogProps {
  blog: {
    content: string;
    title: string;
    id: string;
    createdAt: string;
    author: {
      name: string;
      email: string;
    };
  };
}

export const CompleteBlog = ({ blog }: CompleteBlogProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      
      {/* Main content container with proper spacing and max-width */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Article container with enhanced styling */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header section with better typography */}
          <div className="px-8 py-10 border-b border-gray-100">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {blog.title}
            </h1>
            
            {/* Author info with improved styling */}
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-gray-700 font-medium">By {blog.author.name}</span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
          
          {/* Article content with enhanced typography */}
          <div className="px-8 py-10">
            <div className="prose prose-lg prose-gray max-w-none">
              <div 
                className="text-gray-800 leading-relaxed whitespace-pre-line"
                style={{ 
                  fontSize: '18px',
                  lineHeight: '1.75',
                  fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
                }}
              >
                {blog.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};