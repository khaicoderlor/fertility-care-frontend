"use client";

import {
  UsersIcon,
  CalendarDaysIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import StatCard from "../../components/dashboard/doctor/StatCard";
import PatientAppointmentChart, {
  type PatientData,
} from "../../components/dashboard/doctor/PatientAppointmentChart";
import PatientStatusChart, {
  type PatientStatusData,
} from "../../components/dashboard/doctor/PatientStatusChart";
import RecentPatientsTable, {
  type RecentPatient,
} from "../../components/dashboard/doctor/RecentPatientsTable";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import type DoctorStatisticOverall from "../../models/statistics/DoctorStatisticOverall";


export default function DoctorStatisticChartPage() {
  const { doctorId } = useCompetenceAuth();
  const [doctorStatisticOverall, setDoctorStatisticOverall] =
    useState<DoctorStatisticOverall>();
  const [patientsData, setPatientsData] = useState<PatientData[]>();
  const [recentPatients, setRecentPatients] = useState<RecentPatient[]>();
  const [patientStatusData, setPatientStatusData] =
    useState<PatientStatusData[]>();

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
        const response = await axiosInstance.get(
          `/doctors/${doctorId}/recent-patients`
        );
        setRecentPatients(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    s();
  }, [doctorId]);

  useEffect(() => {
    const g = async () => {
      try {
        const response = await axiosInstance.get(
          `/statistics/orders-status/${doctorId}/overall`
        );

        setPatientStatusData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    g();
  }, [doctorId]);

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
        <PatientAppointmentChart data={patientsData ?? []} />
      

      {/* Patient Status and Recent Patients */}
      
        <PatientStatusChart data={patientStatusData ?? []} />
        <RecentPatientsTable patients={recentPatients ?? []} />
      </div>

      {/* Quick Actions
      <QuickActions /> */}
    </div>
  );
}
