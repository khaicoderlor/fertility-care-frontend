import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";

export default function Header() {
  const { isAuthenticated, userProfileId } = useAuth();


  return (
    <div className="relative px-12 h-20 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo bên trái */}
        <div className="flex items-center cursor-pointer select-none transition-transform duration-200 hover:scale-105 focus:outline-none">
          <h1 className="text-2xl font-bold font-serif leading-none">
            <span className="bg-gradient-to-r from-[#a06ad9] to-[#6a4fcf] text-transparent bg-clip-text">
              Fertility
            </span>
            <span className="bg-gradient-to-r from-[#5cc6f5] to-[#3b82f6] text-transparent bg-clip-text">
              Care
            </span>
          </h1>
        </div>

        {/* Links ở giữa */}
        <nav>
          <ul className="flex space-x-10">
            <li>
              <a
                href="/home"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
              >
                Contact
              </a>
            </li>
            {isAuthenticated && (
              <li>
                <a
                  href="/profile"
                  className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
                >
                  Profile
                </a>
              </li>
            )}
          </ul>
        </nav>

        {/* Avatar và Button bên phải */}
        <div className="flex items-center gap-6">
          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 hover:shadow-md transition-all duration-300 cursor-pointer group">
            {/* Avatar */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80 "
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover shadow-lg ring-2 ring-white group-hover:ring-purple-200 transition-all duration-300"
              />
              {/*icon online màu xanh*/}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>

            {/* Xin chào - Name*/}
            {isAuthenticated && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">
                  Xin chào,
                </span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  Nguyễn Thị Mai
                </span>
              </div>
            )}
          </div>

          {/* | */}
          <div className="w-px h-8 bg-gray-200"></div>

          {/* Button */}
          <Button
            label="Đặt lịch ngay"
            variant="solid"
            color="primary"
            size="md"
            href="/order"
          />
        </div>
      </div>
    </div>
  );
}
