/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type Profile from "../../../models/Profile";
import axiosInstance from "../../../apis/AxiosInstance";
import { format } from "date-fns";

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
  const [search, setSearch] = useState("");
  const [isGoogleFilter, setIsGoogleFilter] = useState<"all" | "google" | "normal">("all");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axiosInstance.get("/auth/accounts");
        setAccounts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.email.toLowerCase().includes(search.toLowerCase()) ||
      acc.phoneNumber?.includes(search) ||
      acc.profile.lastName?.toLowerCase().includes(search.toLowerCase());

    const matchesGoogleFilter =
      isGoogleFilter === "all" ||
      (isGoogleFilter === "google" && acc.isGoogleAccount) ||
      (isGoogleFilter === "normal" && !acc.isGoogleAccount);

    return matchesSearch && matchesGoogleFilter;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Tìm theo email, SDT, họ..."
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3 focus:ring-blue-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-3">
        
          <select
            value={isGoogleFilter}
            onChange={(e) => setIsGoogleFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">Tất cả</option>
            <option value="google">Google</option>
            <option value="normal">Không Google</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">SĐT</th>
              <th className="px-4 py-2 border">Họ</th>
              <th className="px-4 py-2 border">Tên đệm</th>
              <th className="px-4 py-2 border">Tên</th>
              <th className="px-4 py-2 border">Ngày sinh</th>
              <th className="px-4 py-2 border">Giới tính</th>
              <th className="px-4 py-2 border">Ngày tham gia</th>
              <th className="px-4 py-2 border">Loại</th>
              <th className="px-4 py-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc) => (
              <tr key={acc.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{acc.email}</td>
                <td className="px-4 py-2 border">{acc.phoneNumber || "-"}</td>
                <td className="px-4 py-2 border">{acc.profile.lastName}</td>
                <td className="px-4 py-2 border">{acc.profile.middleName}</td>
                <td className="px-4 py-2 border">{acc.profile.firstName}</td>
                <td className="px-4 py-2 border">
                  {acc.profile.dateOfBirth
                    ? format(new Date(acc.profile.dateOfBirth), "dd/MM/yyyy")
                    : "-"}
                </td>
                <td className="px-4 py-2 border">{acc.profile.gender || "-"}</td>
                <td className="px-4 py-2 border">
                  {acc.profile.createdAt
                    ? format(new Date(acc.profile.createdAt), "dd/MM/yyyy")
                    : "-"}
                </td>
                <td className="px-4 py-2 border">
                  {acc.isGoogleAccount ? (
                    <span className="text-green-600 font-medium">Google</span>
                  ) : (
                    <span className="text-gray-700">Email thường</span>
                  )}
                </td>
                <td>
                  
                </td>
              </tr>
            ))}
            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  Không tìm thấy tài khoản phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
