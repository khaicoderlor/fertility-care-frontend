export interface DoctorFeedback {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  patientName: string;
  rating: number; // 1-5 stars
  comment: string;
  feedbackDate: string;
  treatmentType: string;
  isVerified: boolean; // Đã xác thực feedback hay chưa
  isAnonymous: boolean; // Feedback ẩn danh
}

// Filter options
export const ratingFilterOptions = [
  { value: "all", label: "Tất cả đánh giá" },
  { value: "5", label: "5 sao" },
  { value: "4", label: "4 sao" },
  { value: "3", label: "3 sao" },
  { value: "2", label: "2 sao" },
  { value: "1", label: "1 sao" }
];

export const verificationFilterOptions = [
  { value: "all", label: "Tất cả" },
  { value: "verified", label: "Đã xác thực" },
  { value: "unverified", label: "Chưa xác thực" }
];

// Helper functions
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

export const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? "★" : "☆");
  }
  return stars.join("");
};

export const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return "text-green-600";
  if (rating >= 4) return "text-blue-600";
  if (rating >= 3) return "text-yellow-600";
  if (rating >= 2) return "text-orange-600";
  return "text-red-600";
};

export const getVerificationBadge = (isVerified: boolean) => {
  return isVerified 
    ? "bg-green-100 text-green-800" 
    : "bg-yellow-100 text-yellow-800";
};
