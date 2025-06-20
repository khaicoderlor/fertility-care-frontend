"use client";

import type React from "react";

import { useState, type FormEvent } from "react";

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Gửi tin nhắn cho chúng tôi
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Họ và tên
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Nhập họ và tên của bạn"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Địa chỉ email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dịch vụ bạn quan tâm
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="">Chọn dịch vụ</option>
            <option value="fertility-assessment">
              Đánh giá khả năng sinh sản
            </option>
            <option value="sti-testing">Xét nghiệm STI</option>
            <option value="prenatal-care">Chăm sóc tiền sản</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tin nhắn
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Chúng tôi có thể hỗ trợ gì cho bạn?"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
        </button>
      </form>
    </div>
  );
}
