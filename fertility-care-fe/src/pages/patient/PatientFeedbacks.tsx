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
        console.log(error);
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
      console.log(error);
    }
  };

  return (
    <div>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>Bác sĩ</th>
            <th>Chuyên môn</th>
            <th>Gói điều trị</th>
            <th>Trạng thái</th>
            <th>Đánh giá</th>
            <th>Bình luận</th>
            <th>Ngày đánh giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{convertFullName(feedback.doctor.profile)}</td>
              <td>{feedback.doctor.specialization}</td>
              <td>{feedback.treatmentService.name}</td>
              <td>{feedback.status}</td>
              <td className="flex items-center">
                {feedback.rating} <FaStar className="text-yellow-500 w-4 h-4 ml-1" />
              </td>
              <td>{feedback.comment}</td>
              <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="text-blue-500 underline"
                  onClick={() => handleUpdateClick(feedback)}
                >
                  Cập nhật
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Form */}
      {updateId !== null && (
        <div className="mt-4 border rounded p-4 shadow bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Cập nhật đánh giá</h3>
          <div className="mb-2">
            <label className="block mb-1">Số sao:</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="border p-1"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} <FaStar className="text-yellow-500 w-4 h-4 ml-1"/>
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Bình luận:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-1 rounded"
              onClick={handleSubmitUpdate}
            >
              Lưu
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-1 rounded"
              onClick={handleCancel}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
