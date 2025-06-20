"use client";

import { FaStar, FaArrowRight } from "react-icons/fa";
import type { Doctor } from "../../models/Doctor";
import { ConvertFullName } from "../../functions/CommonFunction";

interface PartProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onDoctorSelect: (doctor: Doctor) => void;
  onNext: () => void;
  isCompleted: boolean;
}

export default function PartThreeBooking({
  doctors,
  selectedDoctor,
  onDoctorSelect,
  onNext,
  isCompleted,
}: PartProps) {
  return (
    <section id="select-doctor" className="scroll-mt-20 py-20 ">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Select Your Fertility Specialist
          </h2>
          <p className="text-lg text-gray-600">
            Our specialists have extensive experience in treatments. Select the
            doctor you'd like to consult with.
          </p>
        </div>

        <div className="space-y-6 shadow-lg border border-gray-100 rounded-lg p-6 gap-6">
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
                        Dr.{ConvertFullName(doctor.profile)}
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
        {isCompleted && (
          <div className="flex justify-center mt-8">
            <button
              onClick={onNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 flex items-center"
            >
              Continue
              <FaArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
