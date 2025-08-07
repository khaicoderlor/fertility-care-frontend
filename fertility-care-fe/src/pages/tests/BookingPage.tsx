import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { IUI_ID, IVF_ID } from "../../constants/ApplicationConstant";
import Header from "./Header";
import { useAuth } from "../../contexts/AuthContext";
import type { SlotSchedule } from "../../models/SlotSchedule";
import axiosInstance from "../../apis/AxiosInstance";
import {
  convertFullName,
  convertSlotTime,
} from "../../functions/CommonFunction";
import { IoMdStar } from "react-icons/io";
import type { Doctor } from "../../models/Doctor";
import Swal from "sweetalert2";

export default function BookingPage() {
  const { patientId } = useAuth();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedScheduleId, setSelectedScheduleId] = useState(-1);
  const [selectedDate, setSelectedDate] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slotSchedules, setSlotSchedules] = useState<SlotSchedule[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get("/doctors");
        setDoctors(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axiosInstance.get(
          `/doctor-schedules/slots/${selectedDoctor?.id}?date=${selectedDate}`
        );
        setSlotSchedules(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSchedules();
  }, [selectedDate, selectedDoctor]);

  useEffect(() => {
    const doctorExisting = doctors.find((x) => x.id === selectedDoctorId);
    setSelectedDoctor(doctorExisting);
  }, [selectedDoctorId, doctors]);

  const handleSubmitOrder = async () => {
    if (
      !selectedService ||
      !selectedDoctorId ||
      selectedScheduleId === -1 ||
      !selectedDate
    ) {
      Swal.fire({
        title: "Thiếu thông tin",
        text: "Vui lòng chọn đầy đủ các thông tin cần thiết.",
        icon: "warning",
      });
      return;
    }

    const payload = {
      patientId: patientId,
      doctorId: selectedDoctorId,
      doctorScheduleId: selectedScheduleId,
      treatmentServiceId: selectedService,
    };

    try {
      const response = await axiosInstance.post("/orders", payload);
      if (response.data) {
        Swal.fire({
          title: "Đặt lịch thành công",
          text: "Đơn hàng của bạn đã được ghi lại",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Có lỗi xảy ra",
        text: "Hãy thử lại sau",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-10 px-4 gap-y-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-pink-600">
            Rinh quà liên tay, con đến liền ngay
          </h1>
          <p className="text-gray-600 mt-2">
            Chọn liệu trình phù hợp và bác sĩ đồng hành cùng bạn
          </p>
        </div>

        <div className="bg-gray-50 max-w-4xl mx-auto rounded-2xl shadow-md p-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-medium text-gray-700 w-1/3">
              Chọn phác đồ điều trị
            </p>
            <select
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Chọn phác đồ --</option>
              <option value={IVF_ID}>Phác đồ IVF</option>
              <option value={IUI_ID}>Phác đồ IUI</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-medium text-gray-700 w-1/3">Chọn bác sĩ</p>
            <select
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Chọn bác sĩ --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  Bs.{doctor.profile.firstName} {doctor.profile.lastName} -{" "}
                  {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white border rounded-xl p-4 w-full md:w-2/3">
              <p className="text-lg font-semibold mb-3 text-blue-600">
                Bác sĩ đã chọn
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={selectedDoctor?.profile.avatarUrl}
                  alt="Ảnh bác sĩ"
                  className="w-20 h-20 rounded-full object-cover bg-gray-200"
                />
                <div>
                  <p>
                    <strong>
                      Bác sĩ: {convertFullName(selectedDoctor?.profile ?? {})}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      Chuyên môn: {selectedDoctor?.specialization}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      Kinh nghiệm: {selectedDoctor?.yearsOfExperience} năm
                    </strong>
                  </p>
                  <p>
                    <strong className="flex items-center">
                      Đánh giá: {selectedDoctor?.rating}{" "}
                      <IoMdStar className="w-5 text-yellow-500" />
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 space-y-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Chọn ngày
                </label>
                <input
                  type="date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={(() => {
                    const now = new Date();
                    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                    return now.toISOString().split("T")[0];
                  })()}
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Chọn thời gian
                </label>
                <div className="grid grid-cols-3 m-2 gap-y-5">
                  {slotSchedules &&
                    slotSchedules.map((slot) => (
                      <div
                        key={slot.scheduleId}
                        onClick={() => setSelectedScheduleId(slot.scheduleId)}
                        className={`text-center rounded-md p-2 cursor-pointer transition-all max-w-[120px] max-h-[40px] 
    ${
      selectedScheduleId === slot.scheduleId
        ? "bg-pink-500 text-white"
        : "bg-gray-200 hover:bg-pink-400 hover:text-white"
    }`}
                      >
                        {convertSlotTime(slot)}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleSubmitOrder}
              className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
