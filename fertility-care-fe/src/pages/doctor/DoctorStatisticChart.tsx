"use client";

import type React from "react";
import {
  UsersIcon,
  CalendarDaysIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import StatCard from "../../components/dashboard/doctor/StatCard";
import FeedbackChart from "../../components/dashboard/doctor/FeedbackChart";
import PatientAppointmentChart, {
  type PatientData,
} from "../../components/dashboard/doctor/PatientAppointmentChart";
import PatientStatusChart, { type PatientStatusData } from "../../components/dashboard/doctor/PatientStatusChart";
import RecentPatientsTable, { type RecentPatient } from "../../components/dashboard/doctor/RecentPatientsTable";
import QuickActions from "../../components/dashboard/doctor/QuickActions";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import type DoctorStatisticOverall from "../../models/statistics/DoctorStatisticOverall";

// Mock data - replace with actual API calls
const monthlyFeedbackData = [
  { month: "Jan", rating: 4.2, reviews: 15 },
  { month: "Feb", rating: 4.5, reviews: 22 },
  { month: "Mar", rating: 4.3, reviews: 18 },
  { month: "Apr", rating: 4.7, reviews: 25 },
  { month: "May", rating: 4.4, reviews: 20 },
  { month: "Jun", rating: 4.6, reviews: 28 },
  { month: "Jul", rating: 4.8, reviews: 32 },
  { month: "Aug", rating: 4.5, reviews: 24 },
  { month: "Sep", rating: 4.7, reviews: 30 },
  { month: "Oct", rating: 4.6, reviews: 26 },
  { month: "Nov", rating: 4.9, reviews: 35 },
  { month: "Dec", rating: 4.8, reviews: 40 },
];




export default function DoctorStatisticChartPage() {
  const { doctorId } = useCompetenceAuth();
  const [doctorStatisticOverall, setDoctorStatisticOverall] =
    useState<DoctorStatisticOverall>();
  const [patientsData, setPatientsData] = useState<PatientData[]>();
  const [recentPatients, setRecentPatients] = useState<RecentPatient[]>()
  const [patientStatusData, setPatientStatusData] = useState<PatientStatusData[]>();

  useEffect(() => {
    const fetchOverallStatistic = async () => {
      try {
        const response = await axiosInstance.get(
          `/statistics/doctors/${doctorId}/overall`
        );

        setDoctorStatisticOverall(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOverallStatistic();
  }, [doctorId]);

  useEffect(() => {
    const fetchPatientsAppointmentsMonthly = async () => {
      const date = new Date();
      try {
        const response = await axiosInstance.get(
          `/statistics/patients-appointments/${doctorId}/monthly?year=${date.getFullYear()}`
        );
        setPatientsData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatientsAppointmentsMonthly();
  }, [doctorId]);

  useEffect(() => {
    const s = async () => {
      try {
        const response = await axiosInstance.get(`/doctors/${doctorId}/recent-patients`);
        setRecentPatients(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    s()
  }, [doctorId]);

  useEffect(() => {
    const g = async () => {
      try {
        const response = await axiosInstance.get(`/statistics/orders-status/${doctorId}/overall`);

        setPatientStatusData(response.data.data)
      } catch(error) {
        console.log(error);
      }
    }

    g();
  }, [doctorId])

  const getChangeType = (s: number): "increase" | "decrease" => {
    if (s < 0) {
      return "decrease";
    } else return "increase";
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng bệnh nhân"
          value={doctorStatisticOverall?.totalPatients ?? 0}
          change={`${doctorStatisticOverall?.comparingPatientsPreviousMonth}%`}
          changeType={getChangeType(
            doctorStatisticOverall?.comparingPatientsPreviousMonth ?? -1
          )}
          icon={<UsersIcon className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />

        <StatCard
          title="Cuộc hẹn tháng này"
          value={doctorStatisticOverall?.totalAppointments ?? 0}
          change={`${doctorStatisticOverall?.comparingAppointmentsPreviousMonth}%`}
          changeType={getChangeType(
            doctorStatisticOverall?.comparingAppointmentsPreviousMonth ?? -1
          )}
          icon={<CalendarDaysIcon className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />

        <StatCard
          title="Đánh giá trung bình"
          value={doctorStatisticOverall?.totalRate ?? 0}
          change={`${doctorStatisticOverall?.comparingRatePreviousMonth}%`}
          changeType={getChangeType(
            doctorStatisticOverall?.comparingRatePreviousMonth ?? -1
          )}
          icon={<StarIcon className="w-6 h-6 text-white" />}
          color="bg-yellow-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackChart data={monthlyFeedbackData} />
        <PatientAppointmentChart data={patientsData ?? []} />
      </div>

      {/* Patient Status and Recent Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PatientStatusChart data={patientStatusData??[]} />
        <RecentPatientsTable patients={recentPatients??[]} />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
