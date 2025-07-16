import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { Order } from "../../models/Order";
import axiosInstance from "../../apis/AxiosInstance";
import { convertFullName } from '../../functions/CommonFunction';

interface PrescriptionItem {
  id: number;
  medicationName: string;
  quantity: number;
  specialInstructions: string;
}

export interface Prescription {
  id: string;
  order: Order;
  prescriptionDate: string;
  prescriptionItems: PrescriptionItem[];
}

export const PrescriptionPage = () => {
  const { patientId } = useAuth();
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axiosInstance.get(`/prescriptions/${patientId}`);
        setPrescriptions(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrescription();
  }, [patientId]);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "1rem" }}>Danh sách đơn thuốc</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={thStyle}>Mã đơn thuốc</th>
            <th style={thStyle}>Gói điều trị</th>   
            <th style={thStyle}>Bác sĩ</th>
            <th style={thStyle}>Ngày tạo</th>
            <th style={thStyle}></th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((pre) => (
            <tr key={pre.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={tdStyle}>{pre.id}</td>
              <td style={tdStyle}>{pre.order.treatmentService?.name || "N/A"}</td>
              <td style={tdStyle}>{convertFullName(pre.order.doctor?.profile??{}) || "N/A"}</td>
              <td style={tdStyle}>{pre.prescriptionDate}</td>
              <td style={tdStyle}>
                <button onClick={() => setSelectedPrescription(pre)} style={btnStyle}>
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPrescription && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Chi tiết đơn thuốc: {selectedPrescription.id}</h3>
            <p><strong>Ngày kê đơn:</strong> {selectedPrescription.prescriptionDate}</p>
            <p><strong>Gói điều trị:</strong> {selectedPrescription.order.treatmentService?.name || "N/A"}</p>
            <p><strong>Bác sĩ:</strong> {convertFullName(selectedPrescription.order.doctor?.profile??{}) || "N/A"}</p>

            <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#eee" }}>
                  <th style={thStyle}>Tên thuốc</th>
                  <th style={thStyle}>Số lượng</th>
                  <th style={thStyle}>Chỉ dẫn đặc biệt</th>
                </tr>
              </thead>
              <tbody>
                {selectedPrescription.prescriptionItems.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.medicationName}</td>
                    <td style={tdStyle}>{item.quantity}</td>
                    <td style={tdStyle}>{item.specialInstructions || "Không có"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={() => setSelectedPrescription(null)} style={{ ...btnStyle, marginTop: "1rem" }}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 🔧 Styles
const thStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "2px solid #ccc",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
};

const btnStyle: React.CSSProperties = {
  backgroundColor: "#007BFF",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  width: "600px",
  maxHeight: "80vh",
  overflowY: "auto",
};
