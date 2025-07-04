import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import { BlogStatus } from "../../constants/BlogTypes";
import type { Blog } from "../../constants/BlogTypes";

interface BlogCardProps {
  blog: Blog
  getFullName: (blog: Blog) => string
  getStatusColor: (status: BlogStatus) => string
  getStatusIcon: (status: BlogStatus) => React.ElementType
  deleteBlog: (id: string) => void
  updateBlogStatus: (id: string, newStatus: BlogStatus) => void
}

export default function BlogCard({
  blog,
  getFullName,
  getStatusColor,
  getStatusIcon,
  deleteBlog,
  updateBlogStatus,
}: BlogCardProps) {
  const StatusIcon = getStatusIcon(blog.status)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Blog Image */}
      {blog.imageUrl && (
        <div className="h-48 bg-gray-200">
          <img
            src={blog.imageUrl || "/placeholder.svg"}
            alt="Blog cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {/* Blog Content */}
      <div className="p-6">
        {/* Author */}
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">{getFullName(blog).charAt(0)}</span>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">{getFullName(blog)}</span>
        </div>
        {/* Content Preview */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>
        {/* Status */}
        <div className="flex items-center mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              blog.status
            )}`}
          >
            <StatusIcon className="w-3 h-3 mr-1" />
            {blog.status}
          </span>
        </div>
        {/* Dates */}
        <div className="text-xs text-gray-500 mb-4 space-y-1">
          <div className="flex items-center">
            <CalendarIcon className="w-3 h-3 mr-1" />
            Tạo: {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
          </div>
          {blog.updatedAt && (
            <div className="flex items-center">
              <ClockIcon className="w-3 h-3 mr-1" />
              Cập nhật: {new Date(blog.updatedAt).toLocaleDateString("vi-VN")}
            </div>
          )}
        </div>
        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <EyeIcon className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteBlog(blog.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
          {/* Quick Status Change */}
          <select
            value={blog.status}
            onChange={(e) => updateBlogStatus(blog.id, e.target.value as BlogStatus)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={BlogStatus.Draft}>Bản nháp</option>
            <option value={BlogStatus.Process}>Đang xử lý</option>
            <option value={BlogStatus.Published}>Xuất bản</option>
            <option value={BlogStatus.Archived}>Lưu trữ</option>
          </select>
        </div>
      </div>
    </div>
  )
}