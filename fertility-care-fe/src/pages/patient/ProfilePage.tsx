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
    console.log(formData);
    try {
      const response = await axiosInstance.put(
        `/patients/${patient.id}`,
        formData
      );
      console.log("uipdate" + response.data);
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Hồ sơ cá nhân
          </h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Avatar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Ảnh đại diện
              </h2>

              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Profile Avatar"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>

                <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
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

          {/* Main Form Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Thông tin chi tiết
              </h2>

              <div className="space-y-8">
                {/* Personal Information Section */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Thông tin cá nhân
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Tên
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập tên của bạn"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Tên đệm
                      </label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập tên đệm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Họ
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập họ của bạn"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        disabled
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                        placeholder="example@gmail.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        disabled
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                        placeholder="+84 xxx xxx xxx"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Giới tính
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-gray-700">Nam</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-gray-700">Nữ</span>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập địa chỉ của bạn"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Ngày tham gia
                      </label>
                      <input
                        disabled
                        type="text"
                        name="joinDate"
                        value={formData.joinDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Partner Information Section */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Thông tin người thân
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Họ tên người thân
                      </label>
                      <input
                        type="text"
                        name="partnerFullname"
                        value={formData.partnerFullname}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập họ tên người thân"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email người thân
                      </label>
                      <input
                        type="email"
                        name="partnerEmail"
                        value={formData.partnerEmail}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="partner@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Số điện thoại người thân
                      </label>
                      <input
                        type="tel"
                        name="partnerPhone"
                        value={formData.partnerPhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+84 xxx xxx xxx"
                      />
                    </div>
                  </div>
                </div>

                {/* Medical History Section */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Lịch sử y tế
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Chi tiết lịch sử y tế
                    </label>
                    <textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Nhập thông tin về lịch sử y tế, bệnh án, thuốc đang sử dụng..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateInfoPatient}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
