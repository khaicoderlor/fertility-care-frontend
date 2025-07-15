import { useEffect, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import axiosInstance from "../../apis/AxiosInstance";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import type { Patient } from "../../models/Patient";
import { convertToInputDate } from "../../functions/CommonFunction";

export interface ProfileContact {
  email: string;
  phoneNumber: string;
}

export default function ProfilePage() {
  const [profileContact, setProfileContact] = useState<ProfileContact>();
  const patient = useOutletContext<Patient>();

  useEffect(() => {
    const fetchProfileContact = async () => {
      try {
        const response = await axiosInstance.get(
          `/patients/${patient.id}/contact`
        );

        setProfileContact(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileContact();
  }, [patient.id]);

  useEffect(() => {
    if (profileContact) {
      setFormData((prev) => ({
        ...prev,
        email: profileContact.email,
        phone: profileContact.phoneNumber,
      }));
    }
  }, [profileContact]);

  const [formData, setFormData] = useState({
    firstName: patient.profile?.firstName || "",
    middleName: patient.profile?.middleName || "",
    lastName: patient.profile?.lastName || "",
    email: profileContact?.email || "",
    phone: profileContact?.phoneNumber || "",
    gender: patient.profile?.gender || "Female",
    dateOfBirth: patient.profile?.dateOfBirth
    ? convertToInputDate(patient.profile.dateOfBirth)
    : "",
    address: patient.profile?.address || "",
    joinDate: patient.profile?.createdAt || "",
    partnerFullname: patient.partnerFullName || "",
    partnerEmail: patient.partnerEmail || "",
    partnerPhone: patient.partnerPhone || "",
    medicalHistory: patient.medicalHistory || "",
  });

  const [avatar, setAvatar] = useState(patient.profile?.avatarUrl || "");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        setAvatar(result);
      };

      const formData = new FormData();
      formData.append("file", file);
      try {
        await axiosInstance.patch(
          `/patients/${patient.id}/change-avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }

      reader.readAsDataURL(file);
    }
  };

  const handleUpdateInfoPatient = async () => {
    console.log(formData)
    try {
      const response = await axiosInstance.put(`/patients/${patient.id}`, formData);
      console.log("uipdate" + response.data)
      if (response.data.data) {
        Swal.fire({
          title: "Cập nhật thành công",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Cập nhật thất bại",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br via-white to-purple-50 p-4 md:p-8 p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hồ sơ cá nhân
          </h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân của bạn</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Ảnh đại diện
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Click để thay đổi ảnh đại diện
              </p>

              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <img
                    src={avatar}
                    alt="Profile Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-blue-100 transition-all duration-300 group-hover:ring-blue-200"
                  />
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <IoCloudUpload className="text-white text-2xl" />
                  </div>
                </div>

                <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
                  <IoCloudUpload className="text-lg" />
                  <span>Tải ảnh lên</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                Thông tin cá nhân
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tên
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="Nhập tên của bạn"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tên đệm
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="Nhập tên đệm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Họ
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="Nhập họ của bạn"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    disabled
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="+84 xxx xxx xxx"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Giới tính
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Nam</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                      />
                      <span className="text-gray-700">Nữ</span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="Nhập địa chỉ của bạn"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Ngày tham gia
                  </label>
                  <input
                    disabled
                    type="type"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Partner Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
                Thông tin người thân
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Họ tên người thân
                  </label>
                  <input
                    type="text"
                    name="partnerFullname"
                    value={formData.partnerFullname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="Nhập họ tên người thân"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email người thân
                  </label>
                  <input
                    type="email"
                    name="partnerEmail"
                    value={formData.partnerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="partner@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Số điện thoại người thân
                  </label>
                  <input
                    type="tel"
                    name="partnerPhone"
                    value={formData.partnerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                    placeholder="+84 xxx xxx xxx"
                  />
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-600 rounded-full mr-3"></div>
                Lịch sử y tế
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Chi tiết lịch sử y tế
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 resize-none"
                  placeholder="Nhập thông tin về lịch sử y tế, bệnh án, thuốc đang sử dụng..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium">
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleUpdateInfoPatient}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
