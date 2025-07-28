import { XMarkIcon } from "@heroicons/react/24/solid";
import type { Blog } from "../models/Blog";
import { convertTimeAgoLabel } from "../functions/CommonFunction";
import { DEFAULT_AVATAR } from "../constants/ApplicationConstant";

interface BlogDetailPageProps {
  blog: Blog;
  allBlogs: Blog[];
  onClose: () => void; // ✅ Thêm onClose
}

export default function BlogDetailPage({
  blog,
  allBlogs,
  onClose, // ✅ Dùng onClose
}: BlogDetailPageProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* ✅ Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Nội dung */}
        <main className="px-6 py-6">
          <article className="overflow-hidden">
            {blog.imageUrl && (
              <div className="aspect-video overflow-hidden rounded-lg mb-4">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-full">
                  {blog.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {convertTimeAgoLabel(blog.createdAt)}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>

              <div className="flex items-center mb-6">
                <img
                  src={blog.avatarUrl || DEFAULT_AVATAR}
                  alt={blog.fullName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {blog.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {blog.author.address}
                  </p>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-gray-700">
                <p>{blog.content}</p>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
