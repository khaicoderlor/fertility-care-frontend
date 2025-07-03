import React from "react";

interface ReviewStats {
  avg: number;
  total: number;
  growth: number;
  stars: number[];
  latest: {
    name: string;
    comment: string;
    stars: number;
    date: string;
  };
}

const PatientReviewStats: React.FC<{ reviewStats: ReviewStats }> = ({
  reviewStats,
}) => (
  <div className="bg-white rounded-xl p-6 shadow flex-1">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-xl">Đánh giá từ bệnh nhân</h2>
      <span className="text-green-500 font-semibold">
        {reviewStats.growth}%
      </span>
    </div>
    <div className="flex items-center gap-4 mb-2">
      <span className="text-4xl font-bold">{reviewStats.avg}</span>
      <span className="text-yellow-400 text-2xl">★★★★☆</span>
      <span className="text-gray-500">
        Dựa trên {reviewStats.total} đánh giá
      </span>
    </div>
    <div className="mb-4">
      {reviewStats.stars.map((count, idx) => (
        <div className="flex items-center mb-1" key={5 - idx}>
          <span className="w-6">{5 - idx}★</span>
          <div className="flex-1 bg-gray-100 h-2 mx-2 rounded">
            <div
              className="bg-black h-2 rounded"
              style={{ width: `${(count / reviewStats.stars[0]) * 100}%` }}
            ></div>
          </div>
          <span className="w-6 text-right">{count}</span>
        </div>
      ))}
    </div>
    <div>
      <div className="font-semibold mb-1">Đánh giá gần đây</div>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="font-bold">{reviewStats.latest.name}</div>
        <div className="text-gray-600 text-sm mb-1">
          {reviewStats.latest.comment}
        </div>
        <div className="flex items-center text-yellow-400">
          {"★".repeat(reviewStats.latest.stars)}
          <span className="ml-2 text-xs text-gray-400">
            {reviewStats.latest.date}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default PatientReviewStats;
