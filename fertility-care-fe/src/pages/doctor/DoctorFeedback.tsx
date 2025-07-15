import { useEffect, useState } from "react"
import type { TreatmentService } from "../../models/TreatmentService"
import type { Doctor } from "../../models/Doctor"
import type { Patient } from "../../models/Patient"
import axiosInstance from "../../apis/AxiosInstance"
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext"
import { convertFullName, convertName } from "../../functions/CommonFunction"

interface Feedback {
  id: string
  patient: Patient
  patientEmail: string
  patientPhone: string
  doctor: Doctor
  treatmentService?: TreatmentService
  status: boolean
  rating: number
  comment?: string
  createdAt: string
  updatedAt?: string
}

export default function DoctorFeedback() {
  const {doctorId} = useCompetenceAuth()
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ☆
        </span>,
      )
    }

    return stars
  } 

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosInstance.get(`/feedbacks/${doctorId}/doctor-sides`)
        setFeedbacks(response.data.data)
      } catch(error) {
        console.log(error)
      }
    }

    fetchFeedbacks()
  }, [doctorId])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? "w-80" : "w-16"}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h2 className="text-lg font-semibold text-gray-800">Doctor Feedback</h2>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-transform ${sidebarOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Feedback List */}
        <div className="overflow-y-auto h-full">
          {feedbacks.map((feedback) => (
            <button
              key={feedback.id}
              onClick={() => setSelectedFeedback(feedback)}
              className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedFeedback?.id === feedback.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
              }`}
            >
              {sidebarOpen ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">{convertName(feedback.patient.profile??null)}</span>
                    <span className={`w-2 h-2 rounded-full ${feedback.status ? "bg-green-400" : "bg-red-400"}`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(feedback.rating)}
                    <span className="text-sm text-gray-600 ml-2">{feedback.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">Dr. {convertName(feedback.doctor.profile??null)}</p>
                  <p className="text-xs text-gray-500">{feedback.createdAt}</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      feedback.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {feedback.patient.profile?.firstName?.charAt(0)}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {selectedFeedback ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Phản hồi chi tiết</h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedFeedback.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedFeedback.status ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Thông tin bệnh nhân</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900">{convertFullName(selectedFeedback.patient.profile??{})}</p>
                    {selectedFeedback.patientEmail && (
                      <p className="text-gray-600">{selectedFeedback.patientEmail}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">ID: {selectedFeedback.patient.id}</p>
                  </div>
                </div>

                {/* Doctor Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Thông tin bác sĩ</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900">{convertFullName(selectedFeedback.doctor.profile)}</p>
                    {selectedFeedback.doctor.specialization && (
                      <p className="text-gray-600">{selectedFeedback.doctor.specialization}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">ID: {selectedFeedback.doctor.id}</p>
                  </div>
                </div>
              </div>

              {/* Treatment Service */}
              {selectedFeedback.treatmentService && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Gói điều trị</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900">{selectedFeedback.treatmentService.name}</p>
                    {selectedFeedback.treatmentService.description && (
                      <p className="text-gray-600 mt-1">{selectedFeedback.treatmentService.description}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Rating and Comment */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Phản hồi</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-medium">Đánh giá:</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(selectedFeedback.rating)}
                      <span className="ml-2 text-gray-600">({selectedFeedback.rating}/5)</span>
                    </div>
                  </div>
                  {selectedFeedback.comment && (
                    <div>
                      <span className="text-lg font-medium">Nội dung:</span>
                      <p className="text-gray-700 mt-2 leading-relaxed">{selectedFeedback.comment}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamps */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thời gian</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Ngày đánh giá:</span> {selectedFeedback.createdAt}
                  </p>
                  {selectedFeedback.updatedAt && (
                    <p className="text-sm">
                      <span className="font-medium">Ngày cập nhật cuối:</span> {selectedFeedback.updatedAt??" - "}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Phản hồi từ bệnh nhân</h3>
              <p className="text-gray-600">Chọn phản hồi bên trái để xem chi tiết</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
