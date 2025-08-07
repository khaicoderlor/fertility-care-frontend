import Header from "./Header";
import RightSideBar from "../../assets/image/right_side_bar_home_page.png";
import AboutUs from "../../assets/image/about_us_home_page.jpg";

import { FaArrowDown } from "react-icons/fa";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      <Header />

      <div className="flex items-center justify-between p-8 max-w-full max-h-full">
        <div className="flex flex-col justify-start">
          <div className="max-w-4xl">
            <p className="font-mono text-gray-700 text-5xl">
              Hãy để chúng tôi đồng hành cùng bạn trong hành trình chạm đến
              thiên chức làm cha mẹ
            </p>
          </div>
          <div className="max-w-xl font-mono text-gray-700 mt-6 mb-6">
            <p className="text-justify">
              Tại Infertility Care System, chúng tôi hiểu rằng hành trình tìm
              kiếm cơ hội làm cha mẹ là một hành trình đầy cảm xúc và hy vọng.
              Với sứ mệnh đồng hành cùng bạn từ những bước đầu tiên, chúng tôi
              cung cấp giải pháp toàn diện cho điều trị vô sinh – hiếm muộn dựa
              trên công nghệ hiện đại, đội ngũ chuyên gia đầu ngành và quy trình
              chăm sóc cá nhân hóa.
            </p>
          </div>
          <div className="gap-x-4">
            <button onClick={() => navigate("/order")} className="transition-all hover:bg-gradient-to-tr hover:to-pink-400 hover:from-orange-600 bg-gradient-to-tr to-orange-400 from-pink-600 rounded-lg text-white p-5">
              Đặt lịch ngay
            </button>
            <button onClick={() => navigate("/journey")} className="p-5 border-red-400 border-l-4 ml-2 rounded-lg hover:bg-red-400 hover:text-white transition-all">
              Lộ trình
            </button>
          </div>
        </div>
        <div>
          <img src={RightSideBar} alt="" className="max-w-full" />
        </div>
      </div>

      <div className="mb-16 px-4">
        {/* Tiêu đề section */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col items-center">
            <p className="text-3xl font-mono text-gray-600">Về chúng tôi</p>
            <FaArrowDown className="text-4xl text-orange-600 mt-2 animate-bounce" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          <div className="w-full lg:w-1/2">
            <img
              src={AboutUs}
              alt="Giới thiệu về chúng tôi"
              className="w-full rounded-2xl shadow-xl object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 mt-6 lg:mt-0 items-center">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              🔬 Dịch vụ nổi bật
            </h3>
            <ul className="space-y-4 border-l-4 border-blue-300 pl-4 text-gray-700">
              <li>
                <strong>Tư vấn và chẩn đoán chuyên sâu:</strong> Thăm khám, phân
                tích nguyên nhân hiếm muộn bằng thiết bị y tế tiên tiến.
              </li>
              <li>
                <strong>Điều trị IUI, IVF, ICSI:</strong> Áp dụng phác đồ phù
                hợp với từng bệnh nhân.
              </li>
              <li>
                <strong>Theo dõi phôi và trứng điện tử:</strong> Hệ thống theo
                dõi minh bạch, trực tuyến, giúp bạn nắm rõ từng bước điều trị.
              </li>
              <li>
                <strong>Chăm sóc trước – trong – sau điều trị:</strong> Tư vấn
                tâm lý, dinh dưỡng và sức khỏe sinh sản toàn diện.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-pink-600 mt-8 mb-4">
              ❤️ Cam kết của chúng tôi
            </h3>
            <ul className="space-y-4 border-l-4 border-pink-300 pl-4 text-gray-700">
              <li>
                <strong>Cá nhân hóa lộ trình điều trị</strong> cho từng cặp vợ
                chồng.
              </li>
              <li>
                <strong>Bảo mật tuyệt đối</strong> thông tin y tế và dữ liệu cá
                nhân.
              </li>
              <li>
                <strong>Đồng hành 24/7</strong> với hệ thống hỗ trợ trực tuyến
                và chuyên viên chăm sóc riêng.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
