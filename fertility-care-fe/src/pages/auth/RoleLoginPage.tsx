import { useState, type FormEvent } from "react";
import RoleLoginForm from "../../components/auth/RoleLoginForm";
import axiosInstance from "../../apis/AxiosInstance";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";
import Swal from "sweetalert2";

export interface FormData {
  email: string;
  password: string;
}

export default function RoleLoginPage() {
  const { login } = useCompetenceAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginWithCompetence = async (
    e: FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      const authResult = response.data;
      if (authResult.isSuccess) {
        const data = authResult.data;
        const token = data.accessToken;
        const role = data.role;
        const userProfileId = data.user.profileId;

        await login(token, userProfileId, role);

        Swal.fire({
          title: "Đăng nhập thành công",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Đăng nhập thất bại",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-md text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">FertilityCare</h1>
          <p className="text-gray-600 mt-2">
            Đăng nhập dành cho cá nhân có thẩm quyền
          </p>
        </div>
        <RoleLoginForm
          email={email}
          password={password}
          setEmail={(value) => setEmail(value)}
          setPassword={(value) => setPassword(value)}
          handleSubmitLogin={(e) =>
            handleLoginWithCompetence(e, { email, password })
          }
        />
      </div>
    </div>
  );
}
