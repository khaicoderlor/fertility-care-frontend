"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { FaClockRotateLeft } from "react-icons/fa6";
import Header from "../components/Header";
import { ITEMS_PER_PAGE } from "../constants/ApplicationConstant";
import type { Blog } from "../models/Blog";
import axiosInstance from "../apis/AxiosInstance";
import { convertTimeAgoLabel } from "../functions/CommonFunction";
import BlogDetailPage from "./BlogDetailPage";

const categories = ["Tất cả", "IVF", "IUI", "Dịch vụ hiếm muộn", "Khác"];

const dateRangeOptions = [
  { label: "Tất cả", value: "12" },
  { label: "Tháng trước", value: "1" },
  { label: "3 tháng trước", value: "3" },
  { label: "6 tháng trước", value: "6" },
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedAuthorType, setSelectedAuthorType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [mockBlogs, setMockBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog>();

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

    // Date range filtering
    let matchesDateRange = true;
    if (selectedDateRange !== "all") {
      const blogDate = new Date(blog.createdAt);
      const now = new Date();
      let monthsBack = 0;

      switch (selectedDateRange) {
        case "1month":
          monthsBack = 1;
          break;
        case "3months":
          monthsBack = 3;
          break;
        case "6months":
          monthsBack = 6;
          break;
      }

      if (monthsBack > 0) {
        const cutoffDate = new Date(
          now.getFullYear(),
          now.getMonth() - monthsBack,
          now.getDate()
        );
        matchesDateRange = blogDate >= cutoffDate;
      }
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesDateRange
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
            src="https://ivfta.com/wp-content/uploads/2023/03/tu-van-kham-vo-sinh-hiem-muon.jpg" //{blog.imageUrl || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-full">
              {blog.category}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaClockRotateLeft className="w-3 h-3 mr-1" />
            {convertTimeAgoLabel(blog.createdAt)}
          </div>
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
              src="data:image/jpeg;base64,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" //{blog.userProfile.avatar || "/placeholder.svg"}
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

            {/* Date Range Filter */}
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
            </div>
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
                setSelectedDateRange("all");
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
                setSelectedDateRange("all");
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
      {selectedBlog && <BlogDetailPage blog={selectedBlog} allBlogs={mockBlogs}/>}
      <Footer />
    </div>
  );
}
