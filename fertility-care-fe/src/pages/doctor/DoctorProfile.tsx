import { useState, useEffect } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import { useLocation } from "react-router-dom";
import type { Doctor } from "../../models/Doctor";
import { convertToInputDate } from "../../functions/CommonFunction";
import Swal from "sweetalert2";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";

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
  const { doctorId } = useCompetenceAuth(); // Giả sử route có param :doctorId
  const [doctor, setDoctor] = useState<Doctor | null>(location.state as Doctor);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<DoctorProfileData>({
    degree: "",
    specialization: "",
    yearsOfExperience: "",
    biography: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Female",
    dateOfBirth: "",
    address: "",
    avatarUrl: "",
  });

  // Fetch doctor data từ API
  const fetchDoctorData = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/doctors/${id}`);
      const doctorData = response.data;
      setDoctor(doctorData);
      updateProfileState(doctorData);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu bác sĩ:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật state profile từ doctor data
  const updateProfileState = (doctorData: Doctor) => {
    setProfile({
      degree: doctorData.degree ?? "-",
      specialization: doctorData.specialization ?? "-",
      yearsOfExperience: doctorData.yearsOfExperience ?? "-",
      biography: doctorData.biography ?? "-",
      firstName: doctorData.profile.firstName ?? "-",
      middleName: doctorData.profile.middleName ?? "-",
      lastName: doctorData.profile.lastName ?? "-",
      gender: doctorData.profile?.gender || "Female",
      dateOfBirth: doctorData.profile?.dateOfBirth
        ? convertToInputDate(doctorData.profile.dateOfBirth)
        : "",
      address: doctorData.profile.address ?? "-",
      avatarUrl: doctorData.profile.avatarUrl ?? "-",
    });
  };

  useEffect(() => {
    // Nếu có doctor từ location.state, sử dụng nó
    if (location.state && location.state.id) {
      updateProfileState(location.state as Doctor);
    }
    // Nếu có doctorId trong params, fetch từ API
    else if (doctorId) {
      fetchDoctorData(doctorId);
    }
  }, [doctorId, location.state]);

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
    if (!doctor?.id) return;

    const payload = {
      degree: profile.degree,
      specialization: profile.specialization,
      yearsOfExperience: Number(profile.yearsOfExperience),
      biography: profile.biography,
      firstName: profile.firstName,
      middleName: profile.middleName,
      lastName: profile.lastName,
      gender: profile.gender,
      dateOfBirth: profile.dateOfBirth,
      address: profile.address,
    };

    try {
      await axiosInstance.put(`/doctors/${doctor.id}`, payload);
      
      // Sau khi lưu thành công, fetch lại dữ liệu mới từ database
      await fetchDoctorData(doctor.id);

      Swal.fire({
        title: "Cập nhật thành công",
        icon: "success",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Cập nhật thất bại",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center text-red-500">Không tìm thấy thông tin bác sĩ</div>
      </div>
    );
  }

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