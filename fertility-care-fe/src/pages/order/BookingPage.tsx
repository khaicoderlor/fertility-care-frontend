"use client";

import { useEffect, useState, type FormEvent } from "react";
import StepIndicator from "../../components/StepIndicator";
import { FaFlask, FaUser, FaHeart } from "react-icons/fa";
import Header from "../../components/Header";
import type { Doctor } from "../../models/Doctor";
import Swal from "sweetalert2";
import type { SlotSchedule } from "../../models/SlotSchedule";
import PartOneBooking from "../../components/order/PartOneBooking";
import PartThreeBooking from "../../components/order/PartThreeBooking";
import PartFourBooking from "../../components/order/PartFourBooking";
import axiosInstance from "../../apis/AxiosInstance";
import { getDoctors, getScheduleSlotTime } from "../../apis/DoctorService";
import { useAuth } from "../../contexts/AuthContext";
import type { Patient } from "../../models/Patient";

type CreateOrderRequest = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth: string;
  gender?: string;
  address?: string;
  medicalHistory?: string;
  partnerFullName?: string;
  partnerEmail?: string;
  partnerPhone?: string;
  patientId?: string;
  doctorId?: string;
  doctorScheduleId?: number;
  treatmentServiceId?: string;
};

export default function BookingPage() {
  const { patientId } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState<number>(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<SlotSchedule[]>([]);
  const [patient, setPatient] = useState<Patient>({});
  const [formData, setFormData] = useState<CreateOrderRequest>({
    firstName: patient.profile?.firstName,
    middleName: patient.profile?.middleName,
    lastName: patient.profile?.lastName,
    dateOfBirth: patient.profile?.dateOfBirth ?? "",
    gender: patient.profile?.gender,
    address: patient.profile?.address,
    medicalHistory: patient.medicalHistory ?? "",
    partnerFullName: patient.partnerFullName,
    partnerEmail: patient.partnerEmail ?? "",
    partnerPhone: patient.partnerPhone ?? "",
    patientId: patientId ?? "",
    doctorId: "",
    doctorScheduleId: 0,
    treatmentServiceId: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axiosInstance.get(`/patients/${patientId}`);
        setPatient(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatient();
  }, [patientId]);

  const steps = [
    { number: 1, title: "Gói điều trị" },
    { number: 2, title: "Chọn bác sĩ" },
    { number: 3, title: "Chọn ngày" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookingForm = async (
    e: FormEvent<HTMLFormElement>,
    formData: CreateOrderRequest
  ) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      const response = await axiosInstance.post("/orders", formData);

      console.log(response.data);
      Swal.fire({
        title: "Thành công!",
        text: "Bạn đã đặt lịch khám thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Thành công!",
        text: "Bạn đã đặt lịch khám thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const handleTreatmentSelect = (treatment: string) => {
    setSelectedTreatment(treatment);
    if (activeStep < 2) setActiveStep(2);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    if (activeStep < 4) setActiveStep(4);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const result = await getDoctors();
        setDoctors(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!selectedDoctor?.id || !selectedDate) return;

    const fetchSlotTime = async () => {
      try {
        const result = await getScheduleSlotTime(
          selectedDoctor.id,
          selectedDate
        );
        setSlots(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSlotTime();
  }, [selectedDoctor?.id, selectedDate]);

  useEffect(() => {
    const fetchPatient = async (pId: string) => {
      try {
        const response = await axiosInstance.get(`/patients/${pId}`);

        setPatient(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatient(patientId ?? "");
  }, [patientId]);

  useEffect(() => {
    const mergedFormData: CreateOrderRequest = {
      firstName: patient.profile?.firstName,
      middleName: patient.profile?.middleName,
      lastName: patient.profile?.lastName,
      dateOfBirth: patient.profile?.dateOfBirth ?? "",
      gender: patient.profile?.gender,
      address: patient.profile?.address,
      medicalHistory: patient.medicalHistory ?? "",
      partnerFullName: patient.partnerFullName,
      partnerEmail: patient.partnerEmail ?? "",
      partnerPhone: patient.partnerPhone ?? "",
      patientId: patientId ?? "",
      doctorId: selectedDoctor?.id || "",
      doctorScheduleId: selectedSchedule,
      treatmentServiceId: selectedTreatment,
    };

    setFormData(mergedFormData);
  }, [
    selectedTreatment,
    selectedDoctor,
    selectedDate,
    selectedTime,
    selectedSchedule,
  ]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Bắt đầu hành trình của bạn
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Sự chăm sóc tận tâm từ các chuyên gia hàng đầu giúp bạn xây dựng
              gia đình của chính mình
            </p>
            <button
              onClick={() => scrollToSection("Gói điều trị")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200"
            >
              Nhập thông tin
            </button>
          </div>
        </section>

        {/* Features Section */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tại sao chọn hệ thống điều của chúng tôi?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Phương pháp tiếp cận toàn diện của chúng tôi kết hợp công nghệ
                tiên tiến với dịch vụ chăm sóc cá nhân để hỗ trợ hành trình sinh
                sản của bạn.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaFlask className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Công nghệ tân tiến
                </h3>
                <p className="text-gray-600">
                  Phòng thí nghiệm hiện đại và công nghệ hỗ trợ sinh sản mới
                  nhất để tối đa hóa cơ hội thành công của bạn.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaUser className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Quy tụ nhiều chuyên gia trong các lĩnh vực điều trị hiếm muộn
                  theo phương pháp IVF và IUI
                </h3>
                <p className="text-gray-600">
                  Bác sĩ điều trị hiếm muộn được chứng nhận có kinh nghiệm sâu
                  rộng trong điều trị vô sinh.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaHeart className="w-10 h-10 text-pink-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Chăm sóc cá nhân
                </h3>
                <p className="text-gray-600">
                  Kế hoạch điều trị được thiết kế riêng phù hợp với nhu cầu và
                  hoàn cảnh riêng của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 px-4">
          <StepIndicator steps={steps} activeStep={activeStep} />

          <div className="max-w-6xl mx-auto space-y-16">
            <form onSubmit={(e) => handleBookingForm(e, formData)}>
              <PartOneBooking
                selectedTreatment={selectedTreatment}
                onTreatmentSelect={handleTreatmentSelect}
              />

              <PartThreeBooking
                doctors={doctors}
                selectedDoctor={selectedDoctor}
                onDoctorSelect={handleDoctorSelect}
              />

              <PartFourBooking
                selectedDoctor={selectedDoctor}
                selectedTreatment={selectedTreatment}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                timeSlots={slots}
                onDateChange={setSelectedDate}
                onTimeChange={setSelectedTime}
                onScheduleIdChange={setSelectedSchedule}
              />

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-12 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
                >
                  Đặt lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
