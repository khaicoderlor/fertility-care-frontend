// Đảm bảo đúng đường dẫn import, dùng dấu chấm "." thay vì ".." nếu file này nằm trong src/components
import logo1 from "../assets/image/logo_1.jpg";
import logo2 from "../assets/image/logo_2.jpg";
import logo3 from "../assets/image/logo_3.jpg";
import logo4 from "../assets/image/logo_4.jpg";
import logo5 from "../assets/image/logo_5.jpg";
import logo6 from "../assets/image/logo_6.jpg";

import "../assets/css/HomeStyle.css";
const logoPaths = [logo1, logo2, logo3, logo4, logo5, logo6];

const SponsorsMarquee: React.FC = () => {
  return (
    <div className="relative w-full bg-white py-1 mb-20 overflow-hidden">
      {/* Gradient hiệu ứng mờ hai đầu */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none z-10" />

      {/* Dải logo chạy ngang */}
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-16">
          {[...logoPaths, ...logoPaths].map((src, index) => (
            <img
              key={index}
              src={src}
              className="h-24 w-48 object-contain grayscale hover:grayscale-0 transition"
              alt={`Sponsor logo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorsMarquee;
