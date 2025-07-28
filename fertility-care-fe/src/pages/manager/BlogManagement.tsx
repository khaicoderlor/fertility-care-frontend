import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import {
  ClockIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { IoMdCheckmark } from "react-icons/io";
import { ITEMS_PER_PAGE } from "../../constants/ApplicationConstant";
import type { Blog } from "../../models/Blog";
import axiosInstance from "../../apis/AxiosInstance";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blogs/all-status")

        setBlogs(response.data.data)
      } catch(error) {
        console.log(error)
      }
    }

    fetchBlogs()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Process":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Process":
        return ClockIcon;
      case "Rejected":
        return PencilIcon;
      case "Approved":
        return IoMdCheckmark;
      default:
        return QuestionMarkCircleIcon;
    }
  };

  const updateBlog = async (id: string, status: string) => {
    try {
      await axiosInstance.put(`/blogs/${id}?status=${status}`) 
      const response = await axiosInstance.get(`/blogs/all-status`)

      setBlogs(response.data.data)
    } catch(error) {
      console.log(error)
    }
  }

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Quản lý các bài viết
                  </h1>
                  <p className="text-sm text-gray-600">
                    Quản lý tất cả các bài viết
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                  updateBlogStatus={updateBlog}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium ${
                        currentPage === pageNum
                          ? "bg-teal-600 text-white border-teal-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
