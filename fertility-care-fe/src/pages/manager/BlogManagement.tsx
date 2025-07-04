import React, { useState } from "react";
import Sidebar from "./Sidebar";
import BlogFilters from "./BlogFilters";
import BlogCard from "./BlogCard";
import { PlusIcon } from "@heroicons/react/24/solid";
import { BlogStatus } from "../../constants/BlogTypes";
import type { Blog } from "../../constants/BlogTypes";
import {
  CheckCircleIcon,
  ClockIcon,
  PencilIcon,
  XMarkIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Footer from "../../components/Footer";


export default function BlogManagement() {
  // State cho modal tạo mới
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>("");
  // State cho filter trạng thái
  const [statusFilter, setStatusFilter] = useState<BlogStatus | "all">("all");

  // Dummy data cho ví dụ
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Blog 1",
      content: "Nội dung blog 1",
      status: BlogStatus.Published,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: { firstName: "Nguyen", lastName: "A" },
      imageUrl: "",
    },
    {
      id: "2",
      title: "Blog 2",
      content: "Nội dung blog 2",
      status: BlogStatus.Process,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: { firstName: "Tran", lastName: "B" },
      imageUrl: "",
    },
    {
      id: "3",
      title: "Blog 3",
      content: "Nội dung blog 3",
      status: BlogStatus.Draft,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: { firstName: "Le", lastName: "C" },
      imageUrl: "",
    },
    {
      id: "4",
      title: "Blog 4",
      content: "Nội dung blog 4",
      status: BlogStatus.Archived,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: { firstName: "Pham", lastName: "D" },
      imageUrl: "",
    },

    {
      id: "4",
      title: "Blog 4",
      content: "Nội dung blog 4",
      status: BlogStatus.Archived,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: { firstName: "Pham", lastName: "D" },
      imageUrl: "",
    },

    {
      id: "4",
      title: "Blog 4",
      content: "Nội dung blog 4",
      status: BlogStatus.Archived,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: { firstName: "Pham", lastName: "D" },
      imageUrl: "",
    },
    // ... thêm blog khác nếu muốn
  ]);

  // Lọc blog theo search và status
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Lấy tên đầy đủ
  const getFullName = (blog: Blog) =>
    `${blog.author.lastName} ${blog.author.firstName}`;

  // Màu trạng thái
  const getStatusColor = (status: BlogStatus) => {
    switch (status) {
      case BlogStatus.Published:
        return "bg-green-100 text-green-800";
      case BlogStatus.Process:
        return "bg-yellow-100 text-yellow-800";
      case BlogStatus.Draft:
        return "bg-gray-100 text-gray-800";
      case BlogStatus.Archived:
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  // Icon trạng thái
  const getStatusIcon = (status: BlogStatus) => {
    switch (status) {
      case BlogStatus.Published:
        return CheckCircleIcon;
      case BlogStatus.Process:
        return ClockIcon;
      case BlogStatus.Draft:
        return PencilIcon;
      case BlogStatus.Archived:
        return XMarkIcon;
      default:
        return QuestionMarkCircleIcon;
    }
  };

  // Xóa blog
  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  // Cập nhật trạng thái blog
  const updateBlogStatus = (id: string, newStatus: BlogStatus) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: newStatus, updatedAt: new Date() } : b
      )
    );
  };

  return (
    <>
      {/* // Header sẽ nằm ở đây */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />     

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Quản lý Blog</h1>
                  <p className="text-sm text-gray-600">
                    Quản lý tất cả các bài viết blog của bạn
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Tạo Blog Mới
                </button>
              </div>
            </div>
          </header>

          {/* Filters */}
          <BlogFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Blog List */}
          <main className="flex-1 overflow-auto p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  getFullName={getFullName}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                  deleteBlog={deleteBlog}
                  updateBlogStatus={updateBlogStatus}
                />
              ))}
            </div>
            {/* Empty State giữ nguyên */}
          </main>

          {/* Modal tạo blog mới */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Tạo Blog Mới</h2>
                {/* Form tạo blog mới ở đây */}
                <button
                  className="mt-4 px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowCreateModal(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}