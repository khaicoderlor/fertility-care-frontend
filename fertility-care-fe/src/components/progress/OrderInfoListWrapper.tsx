import { useEffect, useState } from "react";
import OrderInfoList from "./OrderInfoList";
import axiosInstance from "../../apis/AxiosInstance";
import { useAuth } from "../../contexts/AuthContext";
import type { OrderInfo } from "../../models/OrderInfo";

export default function OrderInfoListWrapper() {
  const { patientId } = useAuth();
  const [ordersInfo, setOrdersInfo] = useState<OrderInfo[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axiosInstance.get(`/orders/${patientId}/patients`);
      setOrdersInfo(response.data.data);
    };

    fetchOrders();
  }, [patientId]);

  return <OrderInfoList ordersInfo={ordersInfo} />;
}
