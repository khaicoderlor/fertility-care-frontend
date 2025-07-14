import React from "react";

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  return (
    <div className="card-hover bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{stat.title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
          {stat.change && (
            <p 
              className={`text-sm mt-1 ${
                stat.changeType === "increase"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <i
                className={`fas ${
                  stat.changeType === "increase"
                    ? "fa-arrow-up"
                    : "fa-arrow-down"
                } mr-1`}
              ></i>
              {stat.change}
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}
        >
          <i className={`${stat.icon} ${stat.iconColor} text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
