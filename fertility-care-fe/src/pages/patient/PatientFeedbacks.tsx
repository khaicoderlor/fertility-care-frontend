import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import { useAuth } from "../../contexts/AuthContext";
import type Feedback from "../../models/Feedback";
import { convertFullName } from "../../functions/CommonFunction";
import { FaStar } from "react-icons/fa";

export const PatientFeedbacks = () => {
  const { patientId } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosInstance.get(`/feedbacks/patient/${patientId}`);
        setFeedbacks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeedbacks();
  }, [patientId]);

  const handleUpdateClick = (feedback: Feedback) => {
    setUpdateId(feedback.id);
    setRating(feedback.rating);
    setComment(feedback.comment);
  };

  const handleCancel = () => {
    setUpdateId(null);
    setRating(0);
    setComment("");
  };

  const handleSubmitUpdate = async () => {
    try {
      await axiosInstance.put(`/feedbacks/${updateId}`, { rating, comment });
      setUpdateId(null);
      const response = await axiosInstance.get(`/feedbacks/patient/${patientId}`);
      setFeedbacks(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Lịch sử đánh giá</h2>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold text-xs">
            <tr>
              <th className="px-6 py-3">Bác sĩ</th>
              <th className="px-6 py-3">Chuyên môn</th>
              <th className="px-6 py-3">Gói điều trị</th>
              <th className="px-6 py-3">Đánh giá</th>
              <th className="px-6 py-3">Bình luận</th>
              <th className="px-6 py-3">Ngày</th>
              <th className="px-6 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id} className="border-t hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-3">{convertFullName(feedback.doctor.profile)}</td>
                <td className="px-6 py-3">{feedback.doctor.specialization}</td>
                <td className="px-6 py-3">{feedback.treatmentService.name}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-1 text-yellow-500">
                    {Array.from({ length: feedback.rating }).map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-3 max-w-sm text-gray-600">{feedback.comment}</td>
                <td className="px-6 py-3">{feedback.createdAt}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => handleUpdateClick(feedback)}
                  >
                    Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {updateId && (
        <div className="mt-10 bg-white border border-gray-200 shadow-md rounded-xl p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Cập nhật đánh giá</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Số sao:</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} sao
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Bình luận:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Viết cảm nhận của bạn..."
                className="border border-gray-300 rounded-lg px-4 py-2 w-full h-28 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleSubmitUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow"
              >
                Lưu
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-6 py-2 rounded-lg shadow"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
