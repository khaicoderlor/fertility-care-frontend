import type { FormEvent } from "react";

interface RoleLoginProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmitLogin: (e: FormEvent<HTMLFormElement>) => void;
}

export default function RoleLoginForm({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmitLogin,
}: RoleLoginProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <form id="loginForm" className="space-y-6" onSubmit={handleSubmitLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-envelope mr-2"></i>Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
            placeholder="doctor@fertilitycare.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-lock mr-2"></i>Mật khẩu
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 pr-12"
              placeholder="Nhập mật khẩu"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => {}}
            >
              <i id="passwordIcon" className="fas fa-eye"></i>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          
          <a
            href="#"
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            Quên mật khẩu?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2"
        >
          <i className="fas fa-sign-in-alt"></i>
          <span>Đăng nhập</span>
        </button>
      </form>
    </div>
  );
}
