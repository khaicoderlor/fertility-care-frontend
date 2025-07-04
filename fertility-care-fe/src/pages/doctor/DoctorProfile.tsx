import { useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import { useLocation } from "react-router-dom";
import type { Doctor } from "../../models/Doctor";
import { convertToInputDate } from "../../functions/CommonFunction";
import Swal from "sweetalert2";

interface DoctorProfileData {
  degree: string;
  specialization: string;
  yearsOfExperience: number | string;
  biography: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  avatarUrl: string;
}

export default function DoctorProfile() {
  const location = useLocation();

  const doctor = location.state as Doctor;

  const [profile, setProfile] = useState<DoctorProfileData>({
    degree: doctor.degree ?? "-",
    specialization: doctor.specialization ?? "-",
    yearsOfExperience: doctor.yearsOfExperience ?? "-",
    biography: doctor.biography ?? "-",
    firstName: doctor.profile.firstName ?? "-",
    middleName: doctor.profile.middleName ?? "-",
    lastName: doctor.profile.lastName ?? "-",
    gender: doctor.profile?.gender || "Female",
    dateOfBirth: doctor.profile?.dateOfBirth
      ? convertToInputDate(doctor.profile.dateOfBirth)
      : "",
    address: doctor.profile.address ?? "-",
    avatarUrl: doctor.profile.avatarUrl ?? "-",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === "yearsOfExperience" ? Number(value) : value,
    }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !doctor?.id) return;

    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatarUrl: previewUrl }));

    const formData = new FormData();
    formData.append("avatar", file); 

    try {
      await axiosInstance.patch(
        `/doctors/${doctor.id}/change-avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("degree", profile.degree);
      formData.append("specialization", profile.specialization);
      formData.append(
        "yearsOfExperience",
        profile.yearsOfExperience?.toString() || ""
      );
      formData.append("biography", profile.biography);
      formData.append("firstName", profile.firstName);
      formData.append("middleName", profile.middleName);
      formData.append("lastName", profile.lastName);
      formData.append("gender", profile.gender);
      formData.append("dateOfBirth", profile.dateOfBirth);
      formData.append("address", profile.address);

      await axiosInstance.put("/doctors", formData);
      Swal.fire({
        title: "Cập nhật thành công",
        icon: "success"
      })
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Cập nhật thất bại",
        icon: "error"
      })
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Chỉnh sửa hồ sơ bác sĩ</h1>

      {/* Avatar preview */}
      <div className="flex items-center gap-4">
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover border"
          />
        )}
        <input
          type="file"
          onChange={handleAvatarChange}
          className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:border-none file:cursor-pointer"
        />
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
          placeholder="Họ"
          className="border p-2 rounded w-full"
        />
        <input
          name="middleName"
          value={profile.middleName}
          onChange={handleChange}
          placeholder="Tên đệm"
          className="border p-2 rounded w-full"
        />
        <input
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
          placeholder="Tên"
          className="border p-2 rounded w-full"
        />
        <input
          name="degree"
          value={profile.degree}
          onChange={handleChange}
          placeholder="Học vị"
          className="border p-2 rounded w-full"
        />
        <input
          name="specialization"
          value={profile.specialization}
          onChange={handleChange}
          placeholder="Chuyên môn"
          className="border p-2 rounded w-full"
        />
        <input
          name="yearsOfExperience"
          type="number"
          value={profile.yearsOfExperience ?? ""}
          onChange={handleChange}
          placeholder="Số năm kinh nghiệm"
          className="border p-2 rounded w-full"
        />
        <input
          name="dateOfBirth"
          type="date"
          value={profile.dateOfBirth}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Địa chỉ"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Giới tính</label>
        <select
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="Unknown">Không xác định</option>
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Tiểu sử</label>
        <textarea
          name="biography"
          value={profile.biography}
          onChange={handleChange}
          rows={4}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="text-right">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
