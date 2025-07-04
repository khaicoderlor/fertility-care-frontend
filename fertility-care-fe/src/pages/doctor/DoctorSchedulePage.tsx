import React, { useEffect, useState } from "react";
import ScheduleHeader from "../../components/dashboard/doctor/ScheduleHeader";
import type { ScheduleItem } from "../../models/ScheduleItem";
import Calendar from "../../components/dashboard/doctor/Calendar";
import axiosInstance from "../../apis/AxiosInstance";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";

const DoctorSchedulePage: React.FC = () => {
  const {doctorId} = useCompetenceAuth();
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [showModal, setShowModal] = useState(false);

   useEffect(() => {
    const fetchWeeklyWorking = async () => {
      try {
        const today = new Date();
        const weekDate = today.toISOString().split("T")[0]; 

        const response = await axiosInstance.get(`/doctors/${doctorId}/weekly-schedules`, {
          params: { weekDate },
        });

        setSchedules(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (doctorId) {
      fetchWeeklyWorking();
    }
  }, [doctorId]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <ScheduleHeader onOpenModal={() => setShowModal(true)} />
      <Calendar
        schedules={schedules}
      />
      {/* <ScheduleModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddSchedule}
      /> */}
    </div>
  );
};

export default DoctorSchedulePage;
