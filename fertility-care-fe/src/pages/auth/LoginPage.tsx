import { GoogleLoginButton } from "../../components/auth/GoogleLoginButton";
import { LoginForm } from "../../components/auth/LoginForm";
import "../../assets/css/LoginPageStyle.css";
import { FaUserDoctor } from "react-icons/fa6";
import { GiHealthNormal } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { GrLogin } from "react-icons/gr";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gray-200/30 rounded-full floating-animation"></div>
        <div
          className="absolute top-1/3 right-20 w-16 h-16 bg-gray-300/20 rounded-full floating-animation"
          style={{ animationDelay: "-2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gray-100/30 rounded-full floating-animation"
          style={{ animationDelay: "-4s" }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 bg-gray-200/30 rounded-full floating-animation"
          style={{ animationDelay: "-1s" }}
        ></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 h-full min-h-[700px] rounded-3xl shadow-xl overflow-hidden">
          <div className="relative h-full w-full rounded-l-3xl overflow-hidden">
            <img
              src="https://theforumcenter.com/wp-content/uploads/2023/02/topic-talk-about-your-family.jpg"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-blue-200/50 backdrop-blur-sm"></div>
            <div className="relative z-10 p-10 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shadow">
                  <i className="fas fa-heartbeat text-red-500 text-2xl"></i>
                </div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
                  FertilityCare+
                </h1>
              </div>

              <h2 className="text-4xl font-bold text-gray-800 leading-snug">
                Chào mừng đến với
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                  Tương lai Y tế
                </span>
              </h2>

              <p className="text-lg text-gray-900 leading-relaxed">
                Trải nghiệm chăm sóc sức khỏe hiện đại với AI. Kết nối bác sĩ
                chuyên khoa, theo dõi và quản lý hồ sơ y tế thông minh. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
                neque ex odit commodi qui cupiditate earum fuga vero recusandae
                maiores, dolor at aliquid eius consequatur eveniet, reiciendis
                labore. Dignissimos, neque.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 pt-4">
                <div className="bg-white rounded-xl p-5 border transition hover-lift">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                    <FaUserDoctor className="fas fa-user-md text-blue-500 text-lg"/>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-1">
                    Bác sĩ chuyên khoa
                  </h3>
                  <p className="text-sm text-gray-600">Tư vấn 24/7</p>
                </div>

                <div className="bg-white rounded-xl p-5 border hover-lift transition">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                    <GiHealthNormal className="fas fa-chart-line text-green-500 text-lg"/>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-1">
                    Theo dõi sức khỏe
                  </h3>
                  <p className="text-sm text-gray-600">
                    Luôn hỗ trợ mọi lúc
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 border hover-lift transition">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                    <MdOutlineSecurity className="fas fa-shield-alt text-purple-500 text-lg"/>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-1">Bảo mật</h3>
                  <p className="text-sm text-gray-600">
                    Dữ liệu của bạn là bí mật
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 bg-white">
            <div className="glass-effect rounded-xl p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <GrLogin className="fas fa-stethoscope text-indigo-600 text-xl"/>
                </div>
                <h1 className="text-xl font-bold text-gray-800 mb-1">
                  Đăng nhập
                </h1>
                <p className="text-sm text-gray-500">
                  Vào tài khoản FertilityCare+ của bạn
                </p>
              </div>
              <LoginForm />
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
