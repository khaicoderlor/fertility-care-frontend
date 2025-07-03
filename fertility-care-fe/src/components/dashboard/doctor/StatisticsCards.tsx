import React from "react";

interface StatisticsCardsProps {
  stats: {
    totalToday: number;
    iuiToday: number;
    ivfToday: number;
    completed: number;
  };
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: "Tổng ca hôm nay",
      value: stats.totalToday,
      subtitle: "IUI + IVF",
      color: "blue",
      icon: "fas fa-calendar-check",
    },
    {
      title: "IUI hôm nay",
      value: stats.iuiToday,
      subtitle: `${Math.round(
        (stats.iuiToday / stats.totalToday) * 100
      )}% tổng ca`,
      color: "purple",
      icon: "fas fa-syringe",
    },
    {
      title: "IVF hôm nay",
      value: stats.ivfToday,
      subtitle: `${Math.round(
        (stats.ivfToday / stats.totalToday) * 100
      )}% tổng ca`,
      color: "blue",
      icon: "fas fa-microscope",
    },
    {
      title: "Hoàn thành",
      value: stats.completed,
      subtitle: `${Math.round(
        (stats.completed / stats.totalToday) * 100
      )}% tiến độ`,
      color: "green",
      icon: "fas fa-check-circle",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-${card.color}-500`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className={`text-2xl font-bold text-${card.color}-600`}>
                {card.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
            </div>
            <div
              className={`w-12 h-12 bg-${card.color}-100 rounded-full flex items-center justify-center`}
            >
              <i className={`${card.icon} text-${card.color}-600 text-lg`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
