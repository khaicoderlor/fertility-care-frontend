"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  HeartIcon,
} from "@heroicons/react/24/outline";

import type OrderStep from "../../models/OrderStep";

import {
  STEP_COMPLETED,
  STEP_PLANNED,
  STEP_PROGRESS,
} from "../../constants/StepStatus";
import type { Patient } from "../../models/Patient";
import type { SlotSchedule } from "../../models/SlotSchedule";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../apis/AxiosInstance";
import {
  calculateCompletedPercentage,
  convertFullName,
} from "../../functions/CommonFunction";
import { getScheduleSlotTime } from "../../apis/DoctorService";
import { getPatientById } from "../../apis/PatientService";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";
import OrderStepCard from "../../components/dashboard/doctor/OrderStepCard";
import SelectedCardDetail from "../../components/dashboard/doctor/SelectedCardDetail";
import AppointmentForm from "../../components/dashboard/doctor/AppointmentForm";
import ProgressStep from "../../components/dashboard/doctor/ProgressStep";
import type { Order } from "../../models/Order";

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
  const [order, setOrder] = useState<Order>({});
  const [orderSteps, setOrderSteps] = useState<OrderStep[]>([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [timeSlots, setTimeSlots] = useState<SlotSchedule[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStepDetail, setSelectedStepDetail] = useState<number | null>(
    null
  );

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

  useEffect(() => {
    const fetchOrder = async (oId: string) => {
      try {
        const response = await axiosInstance.get(`/orders/${oId}`);
        setOrder(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder(orderId);
  }, [orderId]);

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
      console.log(response);
      Swal.fire({
        title: "Lưu lịch hẹn thành công!",
        icon: "success",
        draggable: true,
      });

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
      await axiosInstance.put(`/steps/${stepId}?status=${status}`);

      setOrderSteps((prev) => {
        const updatedSteps = [...prev];

        const currentIndex = updatedSteps.findIndex(
          (step) => step.id === stepId
        );
        if (currentIndex === -1) return prev;
        updatedSteps[currentIndex] = {
          ...updatedSteps[currentIndex],
          status: status,
        };

        if (
          status === STEP_COMPLETED &&
          currentIndex + 1 < updatedSteps.length &&
          updatedSteps[currentIndex + 1].status === STEP_PLANNED
        ) {
          updatedSteps[currentIndex + 1] = {
            ...updatedSteps[currentIndex + 1],
            status: STEP_PROGRESS,
          };
        }

        return updatedSteps;
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật bước:", error);
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
          <ProgressStep orderSteps={orderSteps} />
        </div>

        {/* Treatment steps */}
        <OrderStepCard
          orderSteps={orderSteps}
          setSelectedStepDetail={setSelectedStepDetail}
          handleAddAppointment={handleAddAppointment}
          handleMarkStatusStep={handleMarkStatusStep}
          order={order}
        />
      </div>

      {/*Step detail modal*/}
      {selectedStepDetail !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <SelectedCardDetail
            orderSteps={orderSteps}
            selectedStepDetail={selectedStepDetail}
            setSelectedStepDetail={(id: number | null) => setSelectedStepDetail(id)}
          />
        </div>
      )}

      {/* Form thêm lịch hẹn */}
      {showAppointmentForm && (
        <AppointmentForm
          newAppointment={newAppointment}
          setNewAppointment={setNewAppointment}
          timeSlots={timeSlots}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          onCancel={() => setShowAppointmentForm(false)}
          handleSubmitNewAppointment={handleSubmitNewAppointment}
        />
      )}
    </div>
  );
}
