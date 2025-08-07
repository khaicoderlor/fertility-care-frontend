"use client";

import { FaStar } from "react-icons/fa";
import type { Doctor } from "../../models/Doctor";
import { convertFullName } from "../../functions/CommonFunction";

interface PartProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onDoctorSelect: (doctor: Doctor) => void;
}

export default function PartThreeBooking({
  doctors,
  selectedDoctor,
  onDoctorSelect,
}: PartProps) {
  return (
    <section id="select-doctor" className="scroll-mt-20 py-20 ">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Chọn bác sĩ đi cùng bạn trong hành trình điều trị hiếm muộn
          </h2>
          <p className="text-lg text-gray-600">
            Các chuyên gia của chúng tôi có kinh nghiệm dày dặn trong điều trị.
            Hãy chọn bác sĩ bạn muốn tư vấn.
          </p>
        </div>

        {/* Scrollable list */}
        <div className="max-h-[400px] overflow-y-auto space-y-6 shadow-lg border border-gray-100 rounded-lg p-6 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`bg-white rounded-lg shadow-md border cursor-pointer transition-all duration-200 hover:shadow-lg p-6 ${
                selectedDoctor?.id === doctor.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => onDoctorSelect(doctor)}
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      doctor.profile.avatarUrl ||
                      "/placeholder.svg?height=64&width=64"
                    }
                    alt={doctor.profile.lastName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        BS.{convertFullName(doctor.profile)}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {doctor.specialization}
                      </p>
                      <p className="text-gray-600 mt-1">
                        {doctor.yearsOfExperience} years of experience
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1 font-semibold">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
