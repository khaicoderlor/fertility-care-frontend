import { useEffect, useState } from "react";
import type { Blog } from "../../models/Blog";
import axiosInstance from "../../apis/AxiosInstance";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";
import Swal from "sweetalert2";

export const convertStatusPost = (status: string) => {
    switch (status) {
      case "Reject":
        return "Bị từ chối";
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
  const [showFormAddBlog, setShowFormAddBlog] = useState(false);
  const [showFormEditFile, setShowFormEditFile] = useState<Blog | null>(null);
  const [showFormUpdateFile, setShowFormUpdateFile] = useState<Blog | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        Swal.fire({
          title: "Đã tạo mới blog",
          icon: "success",
        });

        // Thêm vào danh sách hiển thị
        setBlogs((prev) => [...prev, response.data.data]);
        setShowFormAddBlog(false);
        setNewBlog({
          title: "",
          content: "",
          topic: "",
          userProfileId: userProfileId,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Tạo mới thất bại",
        icon: "error",
      });
    }
  };

  const handleEditBlog = async (blog: Blog) => {
    const payload = {
      title: blog.title,
      content: blog.content,
      topic: blog.category,
      userProfileId: userProfileId,
    };

    try {
      const response = await axiosInstance.put(
        `/blogs/${blog.id}/content`,
        payload
      );
      if (response.data.success) {
        Swal.fire("Đã cập nhật bài viết", "", "success");

        setBlogs((prev) =>
          prev.map((item) =>
            item.id === blog.id ? { ...item, ...blog } : item
          )
        );
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
      const response = await axiosInstance.put(
        `/blogs/${showFormUpdateFile.id}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
      console.error(error);
      Swal.fire("Cập nhật hình ảnh thất bại", "", "error");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Danh sách bài viết của bác sĩ
        </h1>
        <button
          onClick={() => setShowFormAddBlog(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium"
        >
          + Thêm bài viết
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">Hình ảnh</th>
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Thể loại</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3">Cập nhật</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={blog.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2">{blog.id}</td>
                <td className="px-4 py-2">
                  <img
                    src={blog.imageUrl}
                    alt="thumbnail"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{blog.title}</td>
                <td className="px-4 py-2">{convertStatusPost(blog.status)}</td>
                <td className="px-4 py-2">
                  {convertBlogCategory(blog.category)}
                </td>
                <td className="px-4 py-2">{blog.createdAt}</td>
                <td className="px-4 py-2">{blog.updatedAt ?? "—"}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => setShowFormUpdateFile(blog)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Cập nhật hình ảnh
                  </button>
                  <button
                    onClick={() => setShowFormEditFile(blog)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Blog Form */}
      {showFormAddBlog && (
        <div className="p-6 mt-6 border rounded-lg bg-white shadow-md max-w-xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Thêm bài viết mới</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddBlog();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium">Tiêu đề</label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Nội dung</label>
              <textarea
                value={newBlog.content}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, content: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                rows={5}
                required
              />
            </div>
            <div>
              <label className="block font-medium">Chủ đề</label>
              <select
                value={newBlog.topic}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, topic: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Chọn chủ đề --</option>
                <option value="IVF">IVF</option>
                <option value="IUI">IUI</option>
                <option value="InfoFertility">Dịch vụ hiếm muộn</option>
                <option value="Other">Khác</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={() => setShowFormAddBlog(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {showFormUpdateFile && (
        <div className="p-6 mt-6 border rounded-lg bg-white shadow-md max-w-xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            Cập nhật hình ảnh cho blog
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateImage();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium mb-1">
                Chọn hình ảnh mới
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
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
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {showFormEditFile && (
        <div className="p-6 mt-6 border rounded-lg bg-white shadow-md max-w-xl mx-auto">
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
                className="w-full border px-3 py-2 rounded"
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
                className="w-full border px-3 py-2 rounded"
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
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Chọn chủ đề --</option>
                <option value="IVF">IVF</option>
                <option value="IUI">IUI</option>
                <option value="InfoFertility">Dịch vụ hiếm muộn</option>
                <option value="Other">Khác</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Cập nhật
              </button>
              <button
                type="button"
                onClick={() => setShowFormEditFile(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
