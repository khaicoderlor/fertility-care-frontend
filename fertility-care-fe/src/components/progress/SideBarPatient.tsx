"use client";

import { useState } from "react";
import {
  HomeIcon,
  CalendarIcon,
  DocumentTextIcon,
  BookOpenIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  KeyIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import type { Patient } from "../../models/Patient";

import { Link } from "react-router-dom";
import { convertFullName } from "../../functions/CommonFunction";

interface SideBarProps {
  patient: Patient | null,
}

export function SideBarPatient({
  patient,
}: SideBarProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarCollapsed ? "w-16" : "w-64"
      } translate-x-0`}
    >
      <div className="flex flex-col h-full">
        {/* Patient Info Header */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500 to-purple-600 relative">
          {!sidebarCollapsed && (
            <>
              <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-pink-600 font-semibold">
                  {patient?.profile?.avatarUrl} {/* avatar */}
                </div>
              </div>
              <div className="text-white flex-1">
                <h3 className="font-semibold text-lg">{patient?.profile ? convertFullName(patient.profile) : ""}</h3>
              </div>
            </>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-md text-white hover:bg-white/20 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Logo */}
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <HeartIconSolid className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Your fertility journey</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          {!sidebarCollapsed && (
            <div className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-3">
                Cổng thông tin
              </div>
            </div>
          )}
          <nav className={`${sidebarCollapsed ? "px-2" : "px-4"} space-y-1`}>
            <Link
              to="/profile"
              className={`flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <HomeIcon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Hồ sơ</span>}
            </Link>
            <Link
              to="/progress/me"
              className={`flex items-center gap-3 px-3 py-2 text-pink-600 bg-pink-50 rounded-lg ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <HeartIconSolid className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Tiến trinh điều trị</span>}
            </Link>
            <Link
              to="/appointment/me"
              className={`flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <CalendarIcon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Lịch hẹn</span>}
            </Link>
            <Link
              to="/change-password"
              className={`flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <KeyIcon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Đổi mật khẩu</span>}
            </Link>
            <Link
              to="/prescription/me"
              className={`flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <DocumentTextIcon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Đơn thuốc</span>}
            </Link>
            <Link
              to="/payment/history"
              className={`flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <CreditCardIcon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Lịch sử thanh toán</span>}
            </Link>
          </nav>

          {!sidebarCollapsed && (
            <div className="p-4 border-t mt-4">
              <div className="text-sm font-medium text-gray-500 mb-3">
                Hỗ trợ & tài nguyên
              </div>
              <nav className="space-y-1">
                <Link
                  to="/support"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  <span>Hỗ trợ</span>
                </Link>
                <Link
                  to="/explore/our"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <BookOpenIcon className="w-5 h-5" />
                  <span>Tìm hiểu thêm</span>
                </Link>
                <Link
                  to="/emergency-contact"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span>Liên lạc khẩn cấp</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
