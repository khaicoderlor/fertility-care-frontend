import {
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/*Footer Brand section */}
          <div>
            <h4 className="text-xl font-bold text-purple-400 font-serif mb-4">
              FertilityCare
            </h4>
            <p className="text-sm mb-4">
              Chăm sóc sức khỏe sinh sản toàn diện và nhân văn dành cho bạn và
              người thân.
            </p>
            <div className="flex space-x-4 text-xl text-white">
              <FaFacebook className="hover:text-purple-300 cursor-pointer" />
              <FaTwitter className="hover:text-purple-300 cursor-pointer" />
              <FaInstagram className="hover:text-purple-300 cursor-pointer" />
              <FaLinkedin className="hover:text-purple-300 cursor-pointer" />
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Dịch vụ</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Khám sức khỏe sinh sản",
                "Xét nghiệm bệnh lây qua đường tình dục (STI)",
                "Chăm sóc trước khi sinh",
                "Tư vấn sinh sản & hiếm muộn",
                "Kế hoạch hóa gia đình",
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="hover:text-white text-gray-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tài nguyên */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Tài nguyên</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Bài viết chuyên môn",
                "Hỏi đáp thường gặp",
                "Câu chuyện khách hàng",
                "Công trình nghiên cứu",
                "Hội thảo & sự kiện",
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="hover:text-white text-gray-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Đăng ký nhận tin */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">
              Đăng ký nhận tin
            </h4>
            <p className="text-sm mb-4 text-gray-400">
              Nhận thông tin y tế hữu ích và cập nhật mới từ phòng khám.
            </p>
            <div className="flex bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="px-4 py-2 rounded-l-md w-full text-black placeholder-gray-400"
              />
              <button className="px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-r-md">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-sm flex flex-col md:flex-row justify-between text-gray-500">
          <p>© 2023 FertilityCare. Bản quyền thuộc về chúng tôi.</p>
          <div className="space-x-6 mt-2 md:mt-0">
            <a className="hover:text-white" href="#">
              Chính sách bảo mật
            </a>
            <a className="hover:text-white" href="#">
              Điều khoản sử dụng
            </a>
            <a className="hover:text-white" href="#">
              Hỗ trợ truy cập
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
