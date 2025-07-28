import { useEffect, useState } from "react";
import type { Blog } from "../../models/Blog";
import axiosInstance from "../../apis/AxiosInstance";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";
import Swal from "sweetalert2";
import { Pencil, Image as ImageIcon, Plus } from "lucide-react";

export const convertStatusPost = (status: string) => {
  switch (status) {
    case "Rejected":
      return "Vi phạm";
    case "Approved":
      return "Đã phê duyệt";
    case "Process":
      return "Đang chờ xử lí";
    default:
      return "Không xác định";
  }
};

export const convertBlogCategory = (category: string) => {
  switch (category) {
    case "IVF":
      return "IVF";
    case "IUI":
      return "IUI";
    case "InfoFertility":
      return "Dịch vụ hiếm muộn";
    case "Other":
      return "Khác";
    default:
      return "Không xác định";
  }
};

export default function DoctorPost() {
  const { userProfileId, doctorId } = useCompetenceAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const [showFormAddBlog, setShowFormAddBlog] = useState(false);
  const [showFormEditFile, setShowFormEditFile] = useState<Blog | null>(null);
  const [showFormUpdateFile, setShowFormUpdateFile] = useState<Blog | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    topic: "",
    userProfileId: userProfileId,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get(`/blogs/doctor/${doctorId}`);
        setBlogs(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [doctorId]);

  const handleAddBlog = async () => {
    try {
      const response = await axiosInstance.post("/blogs", newBlog);
      if (response.data.data) {
        Swal.fire("Đã tạo mới blog", "", "success");
        setBlogs((prev) => [...prev, response.data.data]);
        setShowFormAddBlog(false);
        setNewBlog({ title: "", content: "", topic: "", userProfileId });
      }
    } catch (error) {
      Swal.fire("Tạo mới thất bại", "", "error");
    }
  };

  const handleEditBlog = async (blog: Blog) => {
    const payload = {
      title: blog.title,
      content: blog.content,
      topic: blog.category,
      userProfileId,
    };
    try {
      const response = await axiosInstance.put(
        `/blogs/${blog.id}/content`,
        payload
      );
      if (response.data.data) {
        Swal.fire("Đã cập nhật bài viết", "", "success");
        const res = await axiosInstance.get(`/blogs/doctor/${doctorId}`);
        setBlogs(res.data.data);
        setShowFormEditFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateImage = async () => {
    if (!showFormUpdateFile || !selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axiosInstance.patch(
        `/blogs/${showFormUpdateFile.id}/image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        Swal.fire("Cập nhật hình ảnh thành công", "", "success");
        setBlogs((prev) =>
          prev.map((blog) =>
            blog.id === showFormUpdateFile.id
              ? { ...blog, imageUrl: response.data.data.imageUrl }
              : blog
          )
        );
        setShowFormUpdateFile(null);
        setSelectedFile(null);
      }
    } catch (error) {
      Swal.fire("Cập nhật hình ảnh thất bại", "", "error");
    }
  };

  useEffect(() => {
    return () => {
      if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
    };
  }, [previewImageUrl]);

  return (
    <div className="p-6 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Danh sách bài viết của bác sĩ
        </h1>
        <button
          onClick={() => setShowFormAddBlog(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white px-4 py-2 rounded-lg shadow font-medium transition"
        >
          <Plus size={18} />
          Thêm bài viết
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white text-sm border-separate border-spacing-y-1">
          <thead className="bg-gray-100 text-left text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-3">Hình ảnh</th>
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Thể loại</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3">Cập nhật</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <>
                <tr
                  key={blog.id}
                  onClick={() =>
                    setExpandedRowId((prevId) =>
                      prevId === blog.id ? null : blog.id
                    )
                  }
                  className="bg-white hover:bg-gray-50 cursor-pointer transition rounded-md"
                >
                  <td className="px-4 py-2">
                    <div className="w-14 h-14 rounded overflow-hidden border">
                      <img
                        src={
                          showFormUpdateFile?.id === blog.id && previewImageUrl
                            ? previewImageUrl
                            : blog.imageUrl
                        }
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">{blog.title}</td>
                  <td className="px-4 py-2">
                    {convertStatusPost(blog.status)}
                  </td>
                  <td className="px-4 py-2">
                    {convertBlogCategory(blog.category)}
                  </td>
                  <td className="px-4 py-2">{blog.createdAt}</td>
                  <td className="px-4 py-2">{blog.updatedAt ?? "—"}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFormUpdateFile(blog);
                        }}
                        className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        <ImageIcon size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFormEditFile(blog);
                        }}
                        className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        <Pencil size={16} />
                        Sửa
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRowId === blog.id && (
                  <tr>
                    <td
                      colSpan={8}
                      className="bg-gray-50 px-6 py-6 border-t text-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Ảnh */}
                        <div>
                          <h3 className="text-sm font-semibold mb-1 text-gray-600">
                            Ảnh mô tả:
                          </h3>
                          <div className="w-full max-w-xs rounded-lg overflow-hidden border shadow-sm">
                            <img
                              src={blog.imageUrl}
                              alt="Ảnh bài viết"
                              className="w-30 h-30 object-cover"
                            />
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-gray-600">
                              Id:
                            </span>{" "}
                            <span className="text-gray-900">{blog.id}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              Tiêu đề:
                            </span>{" "}
                            <span className="text-gray-900">{blog.title}</span>
                          </div>
                          
                          <div>
                            <span className="font-medium text-gray-600">
                              Danh mục:
                            </span>{" "}
                            <span className="text-gray-900">
                              {convertBlogCategory(blog.category)}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              Trạng thái:
                            </span>{" "}
                            <span className="text-gray-900">
                              {convertStatusPost(blog.status)}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              Ngày tạo:
                            </span>{" "}
                            <span className="text-gray-900">
                              {blog.createdAt}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              Cập nhật lần cuối:
                            </span>{" "}
                            <span className="text-gray-900">
                              {blog.updatedAt}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Nội dung bài viết */}
                      <div className="mt-6">
                        <h3 className="font-semibold text-base mb-2 text-gray-700">
                          Nội dung bài viết:
                        </h3>
                        <div className="bg-white border rounded-md p-4 shadow-sm whitespace-pre-line text-gray-800 leading-relaxed">
                          {blog.content}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {showFormAddBlog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="p-8 border border-gray-200 rounded-xl bg-white shadow-lg w-full max-w-2xl space-y-6">
            <h2 className="text-xl font-bold text-gray-800">
              Thêm bài viết mới
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddBlog();
              }}
              className="space-y-5"
            >
              <div>
                <label className="block font-medium text-gray-700 text-sm mb-1">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, title: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 outline-none text-base"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 text-sm mb-1">
                  Nội dung
                </label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, content: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-teal-500 outline-none text-base"
                  rows={6}
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 text-sm mb-1">
                  Chủ đề
                </label>
                <select
                  value={newBlog.topic}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, topic: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 outline-none text-base"
                  required
                >
                  <option value="">-- Chọn chủ đề --</option>
                  <option value="IVF">IVF</option>
                  <option value="IUI">IUI</option>
                  <option value="InfoFertility">Dịch vụ hiếm muộn</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-md shadow text-base"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => setShowFormAddBlog(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-md text-base"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Image Form */}
      {showFormUpdateFile && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="p-6 mt-6 border rounded-xl bg-white shadow-md max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Cập nhật hình ảnh</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateImage();
              }}
              className="space-y-4"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setSelectedFile(file);
                  setPreviewImageUrl(file ? URL.createObjectURL(file) : null);
                }}
                className="w-full"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Cập nhật
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFormUpdateFile(null);
                    setSelectedFile(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showFormEditFile && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa bài viết</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditBlog(showFormEditFile);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block font-medium">Tiêu đề</label>
                <input
                  type="text"
                  value={showFormEditFile.title}
                  onChange={(e) =>
                    setShowFormEditFile({
                      ...showFormEditFile,
                      title: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Nội dung</label>
                <textarea
                  value={showFormEditFile.content}
                  onChange={(e) =>
                    setShowFormEditFile({
                      ...showFormEditFile,
                      content: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md resize-none"
                  rows={5}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Chủ đề</label>
                <select
                  value={showFormEditFile.category}
                  onChange={(e) =>
                    setShowFormEditFile({
                      ...showFormEditFile,
                      category: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                  required
                >
                  <option value="">-- Chọn chủ đề --</option>
                  <option value="IVF">IVF</option>
                  <option value="IUI">IUI</option>
                  <option value="InfoFertility">Dịch vụ hiếm muộn</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Cập nhật
                </button>
                <button
                  type="button"
                  onClick={() => setShowFormEditFile(null)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </form>
            {/* Nút đóng */}
            <button
              onClick={() => setShowFormEditFile(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
