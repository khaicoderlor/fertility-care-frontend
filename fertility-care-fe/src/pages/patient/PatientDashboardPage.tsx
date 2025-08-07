import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import type { Patient } from "../../models/Patient";
import { useAuth } from "../../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import SideBarPatient from "../../components/progress/SideBarPatient";
import Header from "../tests/Header";

export default function PatientDashboardPage() {
  const { patientId } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async (pId: string) => {
      try {
        const response = await axiosInstance.get(`/patients/${pId}`);

        const result = response.data.data;
        setPatient(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatient(patientId ?? "");
  }, [patientId]);

  return (
    <div>
      <Header/>
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex mt-5">
        {/* Sidebar */}
        {sidebarOpen && <SideBarPatient patient={patient ?? null} />}

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 lg:ml-0">
          

          <div className="p-6">
            {patient ? (
              <Outlet context={patient} />
            ) : (
              <div className="text-center py-8">Đang tải thông tin...</div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
