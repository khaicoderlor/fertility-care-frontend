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

const formatDate = (dateStr?: string) =>
  dateStr ? new Date(dateStr).toLocaleDateString("vi-VN") : "-";

const formatGender = (gender?: string) => {
  switch (gender) {
    case "MALE":
      return "Nam";
    case "FEMALE":
      return "Nữ";
    case "OTHER":
      return "Khác";
    default:
      return "-";
  }
};

export const UserTable = () => {
  const [accounts, setAccounts] = useState<AccountSideAdmin[]>([]);
  const [createAccountForm, setCreateAccountForm] = useState(false);
  const [search, setSearch] = useState("");
  const [isGoogleFilter, setIsGoogleFilter] = useState<
    "all" | "google" | "normal"
  >("all");
  const [loading, setLoading] = useState(true);

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

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "",
  });

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

  const handleCreateAccount = async () => {
    const payload = {
      email: formData.Email,
      password: formData.Password,
      confirmPassword: formData.ConfirmPassword,
      role: formData.Role,
    };

    try {
      const response = await axiosInstance.post(`/auth/register`, payload);
      if (response.data.isSuccess) {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Tạo tài khoản người dùng mới thành công.",
          confirmButtonText: "Đóng",
        });

        setCreateAccountForm(false);
        setFormData({
          Email: "",
          Password: "",
          ConfirmPassword: "",
          Role: "",
        });

        const updated = await axiosInstance.get("/auth/accounts");
        setAccounts(updated.data.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại!",
          text: response.data.message || "Không thể tạo tài khoản.",
          confirmButtonText: "Thử lại",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Lỗi hệ thống!",
        text:
          error?.response?.data?.message ||
          "Đã xảy ra lỗi khi tạo tài khoản. Vui lòng thử lại sau.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <button
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          onClick={() => setCreateAccountForm(true)}
        >
          + Tạo mới người dùng
        </button>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="🔍 Tìm theo email, SDT, họ..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={isGoogleFilter}
            onChange={(e) =>
              setIsGoogleFilter(e.target.value as "all" | "google" | "normal")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">Tất cả</option>
            <option value="google">Google</option>
            <option value="normal">Không Google</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-10 text-blue-500 font-semibold animate-pulse">
            Đang tải dữ liệu người dùng...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">SĐT</th>
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
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{acc.email}</td>
                      <td className="px-4 py-2">{acc.phoneNumber || "-"}</td>
                      <td className="px-4 py-2">{acc.profile.lastName}</td>
                      <td className="px-4 py-2">{acc.profile.middleName}</td>
                      <td className="px-4 py-2">{acc.profile.firstName}</td>
                      <td className="px-4 py-2">
                        {formatDate(acc.profile.dateOfBirth)}
                      </td>
                      <td className="px-4 py-2">
                        {formatGender(acc.profile.gender)}
                      </td>
                      <td className="px-4 py-2">
                        {formatDate(acc.profile.createdAt)}
                      </td>
                      <td className="px-4 py-2">
                        {acc.isGoogleAccount ? (
                          <span className="text-green-600 font-semibold">
                            Google
                          </span>
                        ) : (
                          <span className="text-gray-600">Email thường</span>
                        )}
                      </td>
                      {/* <td className="px-4 py-2">
                        <button
                          type="button"
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200"
                          onClick={() => console.log("Disable", acc.id)}
                        >
                          Vô hiệu hóa
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-6 text-gray-500">
                      Không tìm thấy tài khoản phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {createAccountForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Tạo mới người dùng</h2>
            <div
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.Email}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.Password}
                onChange={(e) =>
                  setFormData({ ...formData, Password: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.ConfirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, ConfirmPassword: e.target.value })
                }
                required
              />
              <select
                className="w-full px-4 py-2 border rounded-md"
                value={formData.Role}
                onChange={(e) =>
                  setFormData({ ...formData, Role: e.target.value })
                }
                required
              >
                <option value="">Chọn vai trò</option>
                <option value="User">User</option>
                <option value="Doctor">Doctor</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                  onClick={() => setCreateAccountForm(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  onClick={() => handleCreateAccount}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
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
