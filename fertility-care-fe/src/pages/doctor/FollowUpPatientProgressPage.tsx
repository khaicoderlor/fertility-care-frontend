"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  CheckIcon,
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  BellIcon,
  DocumentTextIcon,
  HeartIcon,
  BanknotesIcon,
  UserIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  BeakerIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import type OrderStep from "../../models/OrderStep";

import {
  STEP_COMPLETED,
  STEP_FAILED,
  STEP_PLANNED,
  STEP_PROGRESS,
} from "../../constants/StepStatus";
import axios from "axios";
import type { Patient } from "../../models/Patient";
import type { SlotSchedule } from "../../models/SlotSchedule";
import Swal from "sweetalert2";
import { PAYMENT_COMPLETED } from "../../constants/PaymentStatus";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../apis/AxiosInstance";
import { FaClock } from "react-icons/fa";
import { STEP_TAKE_EGG } from "../../constants/IVFConstant";
import { CubeIcon } from "@heroicons/react/24/solid";
import {
  calculateCompletedPercentage,
  convertFullName,
  convertSlotTime,
  getStepBySelectedStepDetail,
  getStepCardBg,
} from "../../functions/CommonFunction";
import { getScheduleSlotTime } from "../../apis/DoctorService";
import { getPatientById } from "../../apis/PatientService";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";
import OrderStepCard from "../../components/dashboard/doctor/OrderStepCard";
import SelectedCardDetail from '../../components/dashboard/doctor/SelectedCardDetail';
import AppointmentForm from "../../components/dashboard/doctor/AppointmentForm";
import ProgressStep from "../../components/dashboard/doctor/ProgressStep";

export interface CreateAppointmentDailyRequest {
  patientId: string;
  doctorId: string;
  doctorScheduleId: number;
  orderStepId: number;
  type: string;
  extraFee: number;
  note: string;
  date: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FollowUpPatientProgressPage() {
  const query = useQuery();
  const patientId = query.get("patientId") ?? "";
  const orderId = query.get("orderId") ?? "";
  const { doctorId } = useCompetenceAuth();
  const [patient, setPatient] = useState<Patient>();
  const [orderSteps, setOrderSteps] = useState<OrderStep[]>([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [timeSlots, setTimeSlots] = useState<SlotSchedule[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStepDetail, setSelectedStepDetail] = useState<number | null>(
    null
  );
  const [totalEgg, setTotalEgg] = useState<number>(0);

  const [newAppointment, setNewAppointment] =
    useState<CreateAppointmentDailyRequest>({
      patientId: patientId,
      doctorId: doctorId ?? "",
      doctorScheduleId: 0,
      orderStepId: 0,
      type: "",
      extraFee: 0,
      note: "",
      date: "",
    });

  useEffect(() => {
    const fetchOrderSteps = async (orderId: string) => {
      try {
        const result = await axiosInstance.get(`/steps/${orderId}`);
        setOrderSteps(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderSteps(orderId);
  }, [orderId]);

  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      try {
        const result = await getPatientById(patientId);
        setPatient(result);
      } catch (error) {
        console.log(error);
      }
    };

    if (patientId) {
      fetchPatient(patientId);
    }
  }, [patientId]);

  useEffect(() => {
    const fetchSlotTimes = async () => {
      try {
        if (newAppointment.doctorId && newAppointment.date) {
          const result = await getScheduleSlotTime(
            newAppointment.doctorId,
            newAppointment.date
          );
          setTimeSlots(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSlotTimes();
  }, [newAppointment.date, newAppointment.doctorId]);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case STEP_COMPLETED:
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
            Hoàn thành
          </span>
        );
      case STEP_PROGRESS:
        return (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
            Đang thực hiện
          </span>
        );
      case STEP_FAILED:
        return (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
            Thất bại
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
            Trong kế hoạch
          </span>
        );
    }
  };

  const renderStepIcon = (step: OrderStep) => {
    let bgColor = "bg-gray-300";

    if (step.status === STEP_COMPLETED) {
      bgColor = "bg-green-500";
    } else if (step.status === STEP_PROGRESS) {
      bgColor = "bg-blue-500";
    } else if (step.status === STEP_FAILED) {
      bgColor = "bg-red-500";
    }

    return (
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${bgColor}`}
      >
        {convertStepIcon(step.treatmentStep.stepOrder)}
      </div>
    );
  };

  const convertStepIcon = (stepOrder: number) => {
    switch (stepOrder) {
      case 1:
        return <DocumentTextIcon className="h-8 w-7 text-white" />;
      case 2:
        return <SparklesIcon className="h-8 w-8 text-white" />;
      case 3:
        return <MagnifyingGlassIcon className="h-8 w-8 text-white" />;
      case 4:
        return <BeakerIcon className="h-8 w-8 text-white" />;
      case 5:
        return <HeartIcon className="h-8 w-8 text-white" />;
      case 6:
        return <ChartBarIcon className="h-8 w-8 text-white" />;
      default:
        return <DocumentTextIcon className="h-8 w-8 text-white" />;
    }
  };

  const handleSubmitNewAppointment = async (
    e: FormEvent<HTMLFormElement>,
    formData: CreateAppointmentDailyRequest
  ) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        `/appointments/${orderId}`,
        formData
      );

      Swal.fire({
        title: "Lưu lịch hẹn thành công!",
        icon: "success",
        draggable: true,
      });

      // Reset form and close modal
      setShowAppointmentForm(false);
      setNewAppointment({
        ...newAppointment,
        doctorScheduleId: 0,
        orderStepId: 0,
        type: "",
        extraFee: 0,
        note: "",
        date: "",
      });
      setSelectedTime("");
    } catch (error) {
      console.log(error);
      // Swal.fire({
      //   title: "Có lỗi xảy ra",
      //   icon: "error",
      //   draggable: true,
      // });
    }
  };

  const handleAddAppointment = (stepId: number) => {
    setNewAppointment({
      ...newAppointment,
      orderStepId: stepId,
    });
    setShowAppointmentForm(true);
  };

  const handleMarkStatusStep = async (stepId: number, status: string) => {
    try {
      const response = await axiosInstance.put(
        `/steps/${stepId}?status=${status}`
      );

      setOrderSteps((prev) => {
        const updatedSteps = prev.map((s, index) => {
          if (s.id === stepId) {
            return { ...s, status: status };
          }

          const currentIndex = prev.findIndex((step) => step.id === stepId);
          if (
            index === currentIndex + 1 &&
            status === STEP_COMPLETED &&
            s.status === STEP_PLANNED
          ) {
            return { ...s, status: STEP_PROGRESS };
          }

          return s;
        });

        return updatedSteps;
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật bước:", error);
    }
  };

  const handleAddTotalEggs = async (totalEgg: number) => {
    try {
      const response = await axiosInstance.put(
        `/orders/${orderId}?totalEgg=${totalEgg}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <div className="bg-purple-50 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
              <HeartIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quy trình IVF của bệnh nhân
              </h1>
              <p className="text-gray-600">
                Theo dõi tiến trình điều trị thụ tinh ống nghiệm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl pb-12">
        {/* Patient info */}
        <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <span className="text-lg font-bold">
                <img
                  src={patient?.profile?.avatarUrl || ""}
                  alt=""
                  className="rounded-full"
                />
              </span>
            </div>
            <div>
              <h2 className="font-bold">
                {patient?.profile ? convertFullName(patient.profile) : ""}
              </h2>
              <p className="text-sm text-gray-500">
                {patient?.profile?.dateOfBirth}
              </p>
            </div>
          </div>
          <button className="rounded-md bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200">
            Hồ sơ bệnh nhân
          </button>
        </div>

        {/* Progress overview */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Tiến độ tổng thể</h2>
              <p className="text-gray-600">
                Đã hoàn thành{" "}
                {orderSteps.filter((x) => x.status === STEP_COMPLETED).length}/
                {orderSteps.length} bước (
                {calculateCompletedPercentage(orderSteps)}%)
              </p>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {calculateCompletedPercentage(orderSteps)}%
            </div>
          </div>

          {/* Progress steps */}
          <ProgressStep/>
        </div>

        {/* Treatment steps */}
        <OrderStepCard />
      </div>

      {/*Step detail modal*/}
      {selectedStepDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <SelectedCardDetail/>
        </div>
      )}

      {/* Form thêm lịch hẹn */}
      {showAppointmentForm && (
        <AppointmentForm/>
      )}
    </div>
  );
}
