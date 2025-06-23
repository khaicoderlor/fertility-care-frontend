import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../apis/AxiosInstance";
import Swal from "sweetalert2";

export const LoginForm = () => {
  const { login, setPatientInfo } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmitLoginUsernamePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", {
        Email: email,
        Password: password,
      });

      const { accessToken, user } = res.data;
      console.log(user);
      login(accessToken, user.profileId);

      const info = await axiosInstance.get(`/patients/profile/${user.profileId}`);
      const res2 =  info.data.data;
      console.log("res2", res2);
      setPatientInfo(res2.patientId, res2.orderIds);

      Swal.fire({
        title: "Đăng nhập thành công",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Đăng nhập thất bại",
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmitLoginUsernamePassword(e)}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          <i className="fas fa-user mr-2"></i>Email
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập tên đăng nhập"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          <i className="fas fa-lock mr-2"></i>Password
        </label>
        <div className="relative">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-eye"></i>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 rounded border-gray-300 text-indigo-600"
          />
          Ghi nhớ đăng nhập
        </label>
        <a href="#" className="text-indigo-500 hover:underline">
          Quên mật khẩu?
        </a>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        <i className="fas fa-sign-in-alt mr-2"></i> Đăng nhập
      </button>
    </form>
  );
};
