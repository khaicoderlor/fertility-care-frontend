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

export interface DoctorFeedbackSummary {
  doctorId: string;
  doctorName: string;
  specialization: string;
  totalFeedbacks: number;
  averageRating: number;
  ratingDistribution: {
    star5: number;
    star4: number;
    star3: number;
    star2: number;
    star1: number;
  };
  recentFeedbacks: DoctorFeedback[];
}

// Mock data cho feedback bác sĩ
export const doctorFeedbackData: DoctorFeedback[] = [
  {
    id: "feedback_001",
    doctorId: "doctor_001",
    doctorName: "BS. Nguyễn Văn A",
    doctorSpecialization: "Sản phụ khoa",
    patientName: "Nguyễn Thị Mai",
    rating: 5,
    comment: "Bác sĩ rất tận tâm và chuyên nghiệp. Quá trình IVF diễn ra thuận lợi, bác sĩ luôn giải thích rõ ràng từng bước.",
    feedbackDate: "2025-01-14",
    treatmentType: "IVF",
    isVerified: true,
    isAnonymous: false
  },
  {
    id: "feedback_002",
    doctorId: "doctor_001",
    doctorName: "BS. Nguyễn Văn A",
    doctorSpecialization: "Sản phụ khoa",
    patientName: "Bệnh nhân ẩn danh",
    rating: 4,
    comment: "Kỹ thuật tốt, tuy nhiên thời gian chờ hơi lâu. Nhìn chung hài lòng với kết quả điều trị.",
    feedbackDate: "2025-01-12",
    treatmentType: "IUI",
    isVerified: true,
    isAnonymous: true
  },
  {
    id: "feedback_003",
    doctorId: "doctor_002",
    doctorName: "BS. Lê Thị B",
    doctorSpecialization: "Nội tiết sinh sản",
    patientName: "Trần Thị Lan",
    rating: 5,
    comment: "Bác sĩ rất chu đáo, kiến thức chuyên môn sâu rộng. Luôn động viên và hỗ trợ tinh thần cho bệnh nhân.",
    feedbackDate: "2025-01-13",
    treatmentType: "IVF",
    isVerified: true,
    isAnonymous: false
  },
  {
    id: "feedback_004",
    doctorId: "doctor_002",
    doctorName: "BS. Lê Thị B",
    doctorSpecialization: "Nội tiết sinh sản",
    patientName: "Lê Thị Hoa",
    rating: 5,
    comment: "Quá trình IUI thành công ngay lần đầu. Bác sĩ rất kinh nghiệm và tạo cảm giác an tâm cho bệnh nhân.",
    feedbackDate: "2025-01-10",
    treatmentType: "IUI",
    isVerified: true,
    isAnonymous: false
  },
  {
    id: "feedback_005",
    doctorId: "doctor_003",
    doctorName: "BS. Hoàng Văn C",
    doctorSpecialization: "Sản phụ khoa",
    patientName: "Bệnh nhân ẩn danh",
    rating: 4,
    comment: "Bác sĩ có kinh nghiệm, tuy nhiên cần cải thiện thêm về giao tiếp với bệnh nhân.",
    feedbackDate: "2025-01-11",
    treatmentType: "IVF",
    isVerified: true,
    isAnonymous: true
  },
  {
    id: "feedback_006",
    doctorId: "doctor_003",
    doctorName: "BS. Hoàng Văn C",
    doctorSpecialization: "Sản phụ khoa",
    patientName: "Phạm Thị Thu",
    rating: 3,
    comment: "Kỹ thuật ổn nhưng thái độ chưa thật sự thân thiện. Cần cải thiện dịch vụ chăm sóc khách hàng.",
    feedbackDate: "2025-01-09",
    treatmentType: "IUI",
    isVerified: false,
    isAnonymous: false
  },
  {
    id: "feedback_007",
    doctorId: "doctor_004",
    doctorName: "BS. Đặng Thị D",
    doctorSpecialization: "Phẫu thuật nội soi",
    patientName: "Võ Thị Kim",
    rating: 5,
    comment: "Phẫu thuật rất thành công. Bác sĩ kỹ thuật cao, tư vấn rõ ràng và theo dõi sát sao sau phẫu thuật.",
    feedbackDate: "2025-01-08",
    treatmentType: "Phẫu thuật nội soi",
    isVerified: true,
    isAnonymous: false
  },
  {
    id: "feedback_008",
    doctorId: "doctor_004",
    doctorName: "BS. Đặng Thị D",
    doctorSpecialization: "Phẫu thuật nội soi",
    patientName: "Bệnh nhân ẩn danh",
    rating: 4,
    comment: "Phẫu thuật thành công, thời gian hồi phục nhanh. Đội ngũ y bác sĩ chuyên nghiệp.",
    feedbackDate: "2025-01-07",
    treatmentType: "Phẫu thuật nội soi",
    isVerified: true,
    isAnonymous: true
  },
  {
    id: "feedback_009",
    doctorId: "doctor_005",
    doctorName: "BS. Phan Văn E",
    doctorSpecialization: "Nội tiết sinh sản",
    patientName: "Nguyễn Thị Linh",
    rating: 4,
    comment: "Bác sĩ tư vấn kỹ lưỡng, theo dõi sát. Quá trình điều trị hiệu quả và an toàn.",
    feedbackDate: "2025-01-06",
    treatmentType: "IUI",
    isVerified: true,
    isAnonymous: false
  },
  {
    id: "feedback_010",
    doctorId: "doctor_001",
    doctorName: "BS. Nguyễn Văn A",
    doctorSpecialization: "Sản phụ khoa",
    patientName: "Bệnh nhân ẩn danh",
    rating: 5,
    comment: "Rất hài lòng với dịch vụ. Bác sĩ nhiệt tình, tận tâm và có trách nhiệm cao.",
    feedbackDate: "2025-01-05",
    treatmentType: "IVF",
    isVerified: true,
    isAnonymous: true
  }
];

// Tính toán summary cho từng bác sĩ
export const getDoctorFeedbackSummary = (): DoctorFeedbackSummary[] => {
  const doctorMap = new Map<string, DoctorFeedbackSummary>();
  
  doctorFeedbackData.forEach(feedback => {
    if (!doctorMap.has(feedback.doctorId)) {
      doctorMap.set(feedback.doctorId, {
        doctorId: feedback.doctorId,
        doctorName: feedback.doctorName,
        specialization: feedback.doctorSpecialization,
        totalFeedbacks: 0,
        averageRating: 0,
        ratingDistribution: {
          star5: 0,
          star4: 0,
          star3: 0,
          star2: 0,
          star1: 0
        },
        recentFeedbacks: []
      });
    }
    
    const summary = doctorMap.get(feedback.doctorId)!;
    summary.totalFeedbacks++;
    
    // Update rating distribution
    switch (feedback.rating) {
      case 5: summary.ratingDistribution.star5++; break;
      case 4: summary.ratingDistribution.star4++; break;
      case 3: summary.ratingDistribution.star3++; break;
      case 2: summary.ratingDistribution.star2++; break;
      case 1: summary.ratingDistribution.star1++; break;
    }
    
    // Add to recent feedbacks (keep only 3 most recent)
    summary.recentFeedbacks.push(feedback);
    summary.recentFeedbacks.sort((a, b) => new Date(b.feedbackDate).getTime() - new Date(a.feedbackDate).getTime());
    if (summary.recentFeedbacks.length > 3) {
      summary.recentFeedbacks = summary.recentFeedbacks.slice(0, 3);
    }
  });
  
  // Calculate average rating for each doctor
  doctorMap.forEach(summary => {
    const totalRating = 
      summary.ratingDistribution.star5 * 5 +
      summary.ratingDistribution.star4 * 4 +
      summary.ratingDistribution.star3 * 3 +
      summary.ratingDistribution.star2 * 2 +
      summary.ratingDistribution.star1 * 1;
    
    summary.averageRating = summary.totalFeedbacks > 0 ? totalRating / summary.totalFeedbacks : 0;
  });
  
  return Array.from(doctorMap.values()).sort((a, b) => b.averageRating - a.averageRating);
};

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
