
import { useEffect, useState } from "react";
import type { Blog } from "../../models/Blog";
import { convertBlogCategory, convertStatusPost } from "../doctor/DoctorPost";
import axiosInstance from "../../apis/AxiosInstance";
import { useAuth } from "../../contexts/AuthContext";

export const PatientBlogs = () => {
  const { patientId, userProfileId } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editCategory, setEditCategory] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("IVF");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/patient/${patientId}`);
        setBlogs(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, [patientId]);

  const handleRowClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowEditForm(false);
    setShowImageForm(false);
  };

  const handleUpdateClick = () => {
    if (!selectedBlog) return;
    setEditTitle(selectedBlog.title);
    setEditContent(selectedBlog.content);
    setEditCategory(selectedBlog.category);
    setShowEditForm(true);
    setShowImageForm(false);
  };

  const handleImageUpdateClick = () => {
    setShowImageForm(true);
    setShowEditForm(false);
  };

  const handleSubmitUpdate = async () => {
    try {
      await axiosInstance.put(`/blogs/${selectedBlog?.id}/content`, {
        title: editTitle,
        content: editContent,
        category: editCategory,
        userProfileId: userProfileId,
      });
      setShowEditForm(false);
      const updated = await axiosInstance.get(`/blogs/patient/${patientId}`);
      setBlogs(updated.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitImage = async () => {
    if (!imageFile || !selectedBlog) return;
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await axiosInstance.patch(`/blogs/${selectedBlog.id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowImageForm(false);
      const updated = await axiosInstance.get(`/blogs/patient/${patientId}`);
      setBlogs(updated.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("content", newContent);
      formData.append("topic", newCategory);
      formData.append("userProfileId", userProfileId ?? "");

      await axiosInstance.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowCreateForm(false);
      setNewTitle("");
      setNewContent("");
      setNewCategory("IVF");

      const updated = await axiosInstance.get(`/blogs/patient/${patientId}`);
      setBlogs(updated.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Bài viết của bạn</h1>

      <div className="overflow-x-auto border rounded shadow">
        <div className="mb-4 text-right">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            {showCreateForm ? "Hủy" : "Tạo bài viết"}
          </button>
        </div>

        <table className="w-full table-auto text-sm">
          <thead className="bg-blue-100 text-gray-700 sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left">Id</th>
              <th className="px-3 py-2">Hình ảnh</th>
              <th className="px-3 py-2 text-left">Tiêu đề</th>
              <th className="px-3 py-2 text-left">Trạng thái</th>
              <th className="px-3 py-2 text-left">Thể loại</th>
              <th className="px-3 py-2 text-left">Ngày tạo</th>
              <th className="px-3 py-2 text-left">Ngày cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                onClick={() => handleRowClick(blog)}
                className="hover:bg-blue-50 cursor-pointer border-t"
              >
                <td className="px-3 py-2">{blog.id}</td>
                <td className="px-3 py-2">
                  <img
                    src={blog.imageUrl}
                    alt="blog"
                    className="rounded w-10 h-10 object-cover mx-auto"
                  />
                </td>
                <td className="px-3 py-2">{blog.title}</td>
                <td className="px-3 py-2">{convertStatusPost(blog.status)}</td>
                <td className="px-3 py-2">
                  {convertBlogCategory(blog.category)}
                </td>
                <td className="px-3 py-2">{blog.createdAt}</td>
                <td className="px-3 py-2">{blog.updatedAt ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBlog && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blog Details */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Chi tiết bài viết</h2>
            <p>
              <strong>Tiêu đề:</strong> {selectedBlog.title}
            </p>
            <p>
              <strong>Thể loại:</strong>{" "}
              {convertBlogCategory(selectedBlog.category)}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {convertStatusPost(selectedBlog.status)}
            </p>
            <p className="mt-2">
              <strong>Nội dung:</strong> {selectedBlog.content}
            </p>
            <img
              src={selectedBlog.imageUrl}
              alt="Blog"
              className="w-40 h-40 object-cover rounded mt-4"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleUpdateClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Cập nhật nội dung
              </button>
              <button
                onClick={handleImageUpdateClick}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Cập nhật hình ảnh
              </button>
            </div>
          </div>

          {showCreateForm && (
            <div className="bg-white p-4 rounded shadow mb-6">
              <h3 className="font-bold text-lg mb-3">Tạo bài viết mới</h3>
              <div className="mb-3">
                <label className="block mb-1">Tiêu đề:</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Nội dung:</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Thể loại:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="border rounded w-full p-2"
                >
                  <option value="IVF">IVF</option>
                  <option value="IUI">IUI</option>
                  <option value="InfoFertility">Dịch vụ hiếm muộn</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <button
                onClick={handleCreateBlog}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                Đăng bài
              </button>
            </div>
          )}

          {/* Edit Form */}
          {showEditForm && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg mb-3">Cập nhật nội dung</h3>
              <div className="mb-3">
                <label className="block mb-1">Tiêu đề:</label>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Nội dung:</label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Thể loại:</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="border rounded w-full p-2"
                >
                  <option value="IVF">IVF</option>
                  <option value="IUI">IUI</option>
                  <option value="InfoFertility">Dịch vụ hiếm muộn</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <button
                onClick={handleSubmitUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Lưu thay đổi
              </button>
            </div>
          )}

          {/* Image Upload Form */}
          {showImageForm && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg mb-3">Cập nhật hình ảnh</h3>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                accept="image/*"
                className="mb-3"
              />
              <button
                onClick={handleSubmitImage}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Tải lên
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
