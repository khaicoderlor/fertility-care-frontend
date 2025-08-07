/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type Profile from "../../../models/Profile";
import axiosInstance from "../../../apis/AxiosInstance";
import Swal from "sweetalert2";

export interface AccountSideAdmin {
  id: string;
  isGoogleAccount: boolean;
  lastLogin: string;
  email: string;
  phoneNumber: string;
  lockoutEnabled: boolean;
  profile: Profile;
}

export const UserTable = () => {
  const [accounts, setAccounts] = useState<AccountSideAdmin[]>([]);
  const [createAccountForm, setCreateAccountForm] = useState(false);
  const [search, setSearch] = useState("");
  const [isGoogleFilter, setIsGoogleFilter] = useState<
    "all" | "google" | "normal"
  >("all");
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "",
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axiosInstance.get("/auth/accounts");
        setAccounts(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter((acc) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      acc.email.toLowerCase().includes(searchLower) ||
      acc.phoneNumber?.includes(search) ||
      acc.profile.lastName?.toLowerCase().includes(searchLower);

    const matchesGoogleFilter =
      isGoogleFilter === "all" ||
      (isGoogleFilter === "google" && acc.isGoogleAccount) ||
      (isGoogleFilter === "normal" && !acc.isGoogleAccount);

    return matchesSearch && matchesGoogleFilter;
  });

  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);

  const handleCreateAccount = async () => {
    const payload = {
      email: formData.Email,
      password: formData.Password,
      confirmPassword: formData.ConfirmPassword,
      role: formData.Role,
    };

    try {
      await axiosInstance.post(`/auth/register`, payload);

      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Tạo tài khoản người dùng mới thành công.",
      });

      setCreateAccountForm(false);
      setFormData({ Email: "", Password: "", ConfirmPassword: "", Role: "" });

      const updated = await axiosInstance.get("/auth/accounts");
      setAccounts(updated.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Lỗi hệ thống!",
        text:
          error?.response?.data?.message ||
          "Đã xảy ra lỗi khi tạo tài khoản. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="🔍 Tìm theo email, SDT, họ..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={isGoogleFilter}
            onChange={(e) => setIsGoogleFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">Tất cả</option>
            <option value="google">Google</option>
            <option value="normal">Không Google</option>
          </select>
          <button
            onClick={() => setCreateAccountForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Tạo tài khoản
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-blue-500 font-semibold animate-pulse">
            Đang tải dữ liệu người dùng...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3">Email</th>
                    {/* <th className="px-4 py-3">SĐT</th> */}
                    <th className="px-4 py-3">Họ</th>
                    <th className="px-4 py-3">Tên đệm</th>
                    <th className="px-4 py-3">Tên</th>
                    <th className="px-4 py-3">Ngày sinh</th>
                    <th className="px-4 py-3">Giới tính</th>
                    <th className="px-4 py-3">Ngày tham gia</th>
                    <th className="px-4 py-3">Loại</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedAccounts.length > 0 ? (
                    paginatedAccounts.map((acc) => (
                      <tr key={acc.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{acc.email}</td>
                        {/* <td className="px-4 py-2">{acc.phoneNumber || "-"}</td> */}
                        <td className="px-4 py-2">{acc.profile.lastName}</td>
                        <td className="px-4 py-2">{acc.profile.middleName}</td>
                        <td className="px-4 py-2">{acc.profile.firstName}</td>
                        <td className="px-4 py-2">{acc.profile.dateOfBirth}</td>
                        <td className="px-4 py-2">
                          {acc.profile.gender === "Male"
                            ? "Nam"
                            : acc.profile.gender === "Female"
                            ? "Nữ"
                            : "Không rõ"}
                        </td>
                        <td className="px-4 py-2">{acc.profile.createdAt}</td>
                        <td className="px-4 py-2">
                          {acc.isGoogleAccount ? (
                            <span className="text-green-600 font-semibold">
                              Google
                            </span>
                          ) : (
                            <span className="text-gray-600">Email thường</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-6 text-gray-500"
                      >
                        Không tìm thấy tài khoản phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {createAccountForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Tạo mới người dùng</h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.Email}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.Password}
                onChange={(e) =>
                  setFormData({ ...formData, Password: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.ConfirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, ConfirmPassword: e.target.value })
                }
              />
              <select
                className="w-full px-4 py-2 border rounded-md"
                value={formData.Role}
                onChange={(e) =>
                  setFormData({ ...formData, Role: e.target.value })
                }
              >
                <option value="">Chọn vai trò</option>
                <option value="User">User</option>
                <option value="Doctor">Doctor</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                  onClick={() => setCreateAccountForm(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleCreateAccount}
                >
                  Tạo mới
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
