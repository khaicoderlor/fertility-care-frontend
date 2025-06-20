"use client";

import { FaArrowRight } from "react-icons/fa";
import type PersonalInfo from "../../models/PersonalInfo";

interface PartProps {
  personal: PersonalInfo;
  onPersonalInfoChange: (field: string, value: string) => void;
  onNext: () => void;
  isCompleted: boolean;
}

export default function PartTwoBooking({
  personal,
  onPersonalInfoChange,
  onNext,
  isCompleted,
}: PartProps) {
  return (
    <section id="personal-info" className="scroll-mt-20 pt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Personal Information
        </h2>

        <div className="space-y-6 shadow-lg border border-gray-100 rounded-lg p-6 bg-white">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={personal.firstName}
                onChange={(e) =>
                  onPersonalInfoChange("firstName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="middleName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Middle Name
              </label>
              <input
                id="middleName"
                type="text"
                value={personal.middleName}
                onChange={(e) =>
                  onPersonalInfoChange("middleName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={personal.lastName}
                onChange={(e) =>
                  onPersonalInfoChange("lastName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={personal.email}
                onChange={(e) => onPersonalInfoChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={personal.phone}
                onChange={(e) => onPersonalInfoChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={personal.dateOfBirth}
                onChange={(e) =>
                  onPersonalInfoChange("dateOfBirth", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="partnerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Partner Name
              </label>
              <input
                id="partnerName"
                type="text"
                value={personal.partnerName}
                onChange={(e) =>
                  onPersonalInfoChange("partnerName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="partnerEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Partner Email
              </label>
              <input
                id="partnerEmail"
                type="text"
                value={personal.partnerEmail}
                onChange={(e) =>
                  onPersonalInfoChange("partnerEmail", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="partnerPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Partner Phone
              </label>
              <input
                id="partnerPhone"
                type="text"
                value={personal.partnerPhone}
                onChange={(e) =>
                  onPersonalInfoChange("partnerPhone", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    value="female"
                    checked={personal.gender === "female"}
                    onChange={(e) =>
                      onPersonalInfoChange("gender", e.target.value)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="female"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    value="male"
                    checked={personal.gender === "male"}
                    onChange={(e) =>
                      onPersonalInfoChange("gender", e.target.value)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="male" className="ml-2 text-sm text-gray-700">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="other"
                    name="gender"
                    type="radio"
                    value="other"
                    checked={personal.gender === "other"}
                    onChange={(e) =>
                      onPersonalInfoChange("gender", e.target.value)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="other" className="ml-2 text-sm text-gray-700">
                    Unknown
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                value={personal.address}
                onChange={(e) =>
                  onPersonalInfoChange("address", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div></div>
          </div>

          <div>
            <label
              htmlFor="medicalHistory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brief Medical History (Optional)
            </label>
            <textarea
              id="medicalHistory"
              rows={4}
              value={personal.medicalHistory}
              onChange={(e) =>
                onPersonalInfoChange("medicalHistory", e.target.value)
              }
              placeholder="Please provide any relevant medical history..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
