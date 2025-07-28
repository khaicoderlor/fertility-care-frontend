"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ITEMS_PER_PAGE } from "../constants/ApplicationConstant";
import type { Blog } from "../models/Blog";
import axiosInstance from "../apis/AxiosInstance";
import BlogDetailPage from "./BlogDetailPage";
import { convertBlogCategory } from "./doctor/DoctorPost";

const categories = ["Tất cả", "IVF", "IUI", "Dịch vụ hiếm muộn", "Khác"];

// const dateRangeOptions = [
//   { label: "Tất cả", value: "12" },
//   { label: "Tháng trước", value: "1" },
//   { label: "3 tháng trước", value: "3" },
//   { label: "6 tháng trước", value: "6" },
// ];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedAuthorType, setSelectedAuthorType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  // const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [mockBlogs, setMockBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get("/blogs")
        setMockBlogs(response.data.data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchBlog()
  }, [])

  // Filter blogs based on search term, category, author type, and status
  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.fullName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || blog.status === selectedStatus;
    

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus 
    );
  });

  // Sort blogs by date (latest first)
  const sortedBlogs = filteredBlogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalPages = Math.ceil(sortedBlogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = sortedBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const convertValueCategories = (type: string): string => {
    switch (type) {
      case "Dịch vụ hiếm muộn":
        return "InfoFertility"
      case "Khác":
        return "Other"
      case "IVF":
        return "IVF"
      case "IUI":
        return "IUI"
      default:
        return ""      
    }
  }

  const BlogCard = ({ blog }: { blog: Blog }) => (
    <article onClick={() => setSelectedBlog(blog)} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300">
      {blog.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={blog.imageUrl} 
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-full">
              {convertBlogCategory(blog.category)}
            </span>
          </div>
          {/* <div className="flex items-center text-sm text-gray-500">
            <FaClockRotateLeft className="w-3 h-3 mr-1" />
            {convertTimeAgoLabel(blog.createdAt)}
          </div> */}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-teal-600 cursor-pointer transition-colors line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {blog.content}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src={blog.avatarUrl}
              alt={blog.fullName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {blog.fullName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {blog.createdAt}
            </p>
            {blog.updatedAt && (
              <p className="text-xs text-gray-400">
                Cập nhật lần cuối {blog.updatedAt}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Nhập thông tin tác giả, chủ đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thể loại
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={convertValueCategories(category)}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theo tháng
              </label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div> */}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {paginatedBlogs.length} bài viết tìm thấy
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedAuthorType !== "All" && ` by ${selectedAuthorType}s`}
            </span>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedAuthorType("All");
                setSelectedStatus("All");
              }}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Xóa tất cả thông tin lọc
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        {paginatedBlogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-gray-600 mb-6">
              Thử sử dụng bộ lọc sẽ cho kết quả khả thi.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedAuthorType("All");
                setSelectedStatus("All");
              }}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
        <div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
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
        </div>
      </main>
      {selectedBlog && <BlogDetailPage blog={selectedBlog} allBlogs={mockBlogs} onClose={() => setSelectedBlog(null)}
/>}
      <Footer />
    </div>
  );
}
