import { GoogleLoginButton } from "../../components/auth/GoogleLoginButton";
import { LoginForm } from "../../components/auth/LoginForm";
import { GrLogin } from "react-icons/gr";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-indigo-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <GrLogin className="text-indigo-600 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Đăng nhập</h1>
          <p className="text-sm text-gray-500">Vào tài khoản FertilityCare+ của bạn</p>
        </div>

        <LoginForm />

        <div className="mt-6">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
