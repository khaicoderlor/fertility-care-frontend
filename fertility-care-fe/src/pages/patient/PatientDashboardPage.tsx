import { Bars3Icon, HeartIcon } from "@heroicons/react/24/solid";
import { SideBarPatient } from "../../components/progress/SideBarPatient";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import type { Patient } from "../../models/Patient";
import { useAuth } from "../../contexts/AuthContext";
import type { OrderInfo } from "../../models/OrderInfo";
import OrderInfoList from "../../components/progress/OrderInfoList";

export default function PatientDashboardPage() {
  const { patientId } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patient, setPatient] = useState<Patient>();
  const [ordersInfo, setOrdersInfo] = useState<OrderInfo[]>();

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

    fetchPatient(patientId??"");
  });

  useEffect(() => {
    const fetchOrderByPatientId = async (pId: string) => {
      try {
        const response = await axiosInstance.get(`/orders/${pId}/patients`);

        setOrdersInfo(response.data.data);
      } catch(error) {
        console.log(error)
      }
    }
    fetchOrderByPatientId(patientId??"")
  }, [patientId])

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex">
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
          <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <HeartIcon className="w-6 h-6 text-pink-500" />
              <span className="font-semibold text-gray-900">Fertility Care</span>
            </div>
            <div className="w-10" />
          </div>

          <div className="p-6">
            <OrderInfoList ordersInfo={ordersInfo??[]}/>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
