import ivfVideo from "../assets/video/IVF.mp4";
import iuiVideo from "../assets/video/IUI.mp4";
import "../assets/css/StyleService.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Service() {

  // useEffect(() => {
  //   // Load services data
  //   setServices(treatmentServices);

  //   // Animate elements on scroll
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add("opacity-100", "translate-y-0");
  //           entry.target.classList.remove("opacity-0", "translate-y-8");
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   const fadeInElements = document.querySelectorAll(".fade-in");
  //   fadeInElements.forEach((element) => observer.observe(element));

  //   // Show scroll down animation
  //   setTimeout(() => setIsVisible(true), 1000);

  //   return () => observer.disconnect();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-purple-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Giải pháp sinh sản tiên tiến
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-serif">
            Dịch vụ{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              Sinh sản
            </span>{" "}
            tại FertilityCare
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Khám phá các dịch vụ IUI và IVF được cá nhân hóa, giúp bạn hiện thực
            hóa giấc mơ làm cha mẹ với sự hỗ trợ tận tâm từ đội ngũ chuyên gia
            của chúng tôi.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 hover:scale-105">
            Liên hệ ngay
          </button>
        </div>

      </section>
      {/* IVF Info Section */}
      <section className="py-16 bg-cyan-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-8">
          {/* Video */}
          <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
            <div className="relative w-full max-w-xl md:max-w-2xl aspect-video rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-black">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={ivfVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Text Content */}
          <div className="md:w-1/2 w-full md:pl-12">
            <h3 className="text-lg font-bold text-purple-600 mb-2">
              Lịch sử phát triển
            </h3>
            <p className="text-gray-700 mb-6">
              Công nghệ IVF đã có mặt hơn ba thập kỷ và cho thấy những thành tựu
              đáng kể. Steptoe và Robert Edwards bắt đầu hợp tác nghiên cứu IVF
              trên người từ năm 1968. Năm 1977, họ đạt được cột mốc đột phá khi
              thụ thai thành công em bé đầu tiên trên thế giới thông qua IVF.
            </p>
            <h3 className="text-lg font-bold text-purple-600 mb-2">
              IVF là gì?
            </h3>
            <p className="text-gray-700 mb-6">
              Thuật ngữ 'in vitro' có nghĩa là quá trình xảy ra bên ngoài cơ thể
              trong đĩa petri. IVF là quy trình kết hợp trứng của phụ nữ và tinh
              trùng của nam giới trong phòng thí nghiệm. Trong quá trình thụ
              tinh, tinh trùng sẽ bám vào và xâm nhập vào trứng, dẫn đến sự hình
              thành phôi.
            </p>
            <h3 className="text-lg font-bold text-purple-600 mb-2">
              Tại sao thực hiện điều trị IVF?
            </h3>
            <p className="text-gray-700">
              Thụ tinh trong ống nghiệm được lựa chọn cho nhiều tình trạng vô
              sinh khác nhau. Ví dụ, phụ nữ có vòi trứng bị tổn thương, tắc
              nghẽn hoặc thiếu vòi trứng, hoặc nam giới có bất thường về tinh
              trùng có thể cân nhắc phương pháp điều trị này.
            </p>
          </div>
        </div>
      </section>

      {/* IUI Info Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center px-4 sm:px-8">
          {/* Video */}
          <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
            <div className="relative w-full max-w-xl md:max-w-2xl aspect-video rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-purple-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl">💉</div>
                <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={iuiVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
                <p className="text-purple-600">
                  Quy trình thụ tinh trong tử cung
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="md:w-1/2 w-full md:pr-12">
            <h3 className="text-lg font-bold text-purple-600 mb-2">
              Lịch sử phát triển
            </h3>
            <p className="text-gray-700 mb-6">
              IUI (Intrauterine Insemination) là một trong những phương pháp hỗ
              trợ sinh sản đầu tiên được phát triển. Phương pháp này đã được sử
              dụng rộng rãi từ những năm 1970 và liên tục được cải tiến.
            </p>
            <h3 className="text-lg font-bold text-purple-600 mb-2">
              IUI là gì?
            </h3>
            <p className="text-gray-700 mb-6">
              IUI là phương pháp đưa tinh trùng đã được xử lý trực tiếp vào
              buồng tử cung của người phụ nữ vào thời điểm rụng trứng. Điều này
              giúp tinh trùng có thể tiếp cận trứng dễ dàng hơn và tăng khả năng
              thụ thai.
            </p>
            <h3 className="text-lg font-bold text-purple-600 mb-2">
              Tại sao thực hiện điều trị IUI?
            </h3>
            <p className="text-gray-700">
              IUI thường được khuyến nghị cho các cặp vợ chồng có vấn đề vô sinh
              nhẹ, rối loạn phóng noãn, hoặc vô sinh không rõ nguyên nhân. Đây
              là bước đầu tiên trước khi cân nhắc các phương pháp phức tạp hơn
              như IVF.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Information Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-8">
          {/* Text Content */}
          <div className="md:w-2/3 w-full md:pr-12">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
              Chi phí điều trị IVF và IUI
            </h3>
            <p className="text-gray-700 mb-4">
              Chi phí điều trị hỗ trợ sinh sản có thể thay đổi tùy thuộc vào
              nhiều yếu tố khác nhau như phương pháp điều trị, số lần thực hiện,
              và tình trạng sức khỏe cụ thể của từng cặp vợ chồng.
            </p>
            <p className="text-gray-700 mb-4">
              Tại FertilityCare, chúng tôi cam kết mang đến các gói điều trị
              minh bạch với chi phí hợp lý, cùng với các chương trình hỗ trợ tài
              chính cho những gia đình có hoàn cảnh khó khăn.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-3">
                Các yếu tố ảnh hưởng đến chi phí:
              </h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Loại phương pháp điều trị (IUI hoặc IVF)</li>
                <li>Số lần chu kỳ điều trị cần thiết</li>
                <li>Các xét nghiệm và thuốc cần sử dụng</li>
                <li>Các dịch vụ bổ sung như trữ đông phôi</li>
              </ul>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/3 w-full flex justify-center mt-10 md:mt-0">
            <div className="relative">
              <img
                src="https://img.freepik.com/free-photo/coins-hourglass_23-2147771509.jpg"
                alt="Cost and time concept"
                className="rounded-2xl shadow-lg w-full max-w-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-600">
            Những lợi ích khi sử dụng IUI & IVF đối với phụ nữ
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* IUI Benefits */}
            <div className="bg-purple-50 rounded-2xl p-8 shadow-lg flex flex-col items-center">
              <div className="text-5xl mb-6">💉</div>
              <h3 className="text-xl font-bold text-purple-700 mb-4">
                Lợi ích của IUI
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Ít xâm lấn, không cần phẫu thuật
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Chi phí thấp hơn so với IVF
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Thời gian điều trị ngắn
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Ít tác dụng phụ từ thuốc
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Có thể thực hiện nhiều lần
                </li>
              </ul>
            </div>

            {/* IVF Benefits */}
            <div className="bg-blue-50 rounded-2xl p-8 shadow-lg flex flex-col items-center">
              <div className="text-5xl mb-6">🧪</div>
              <h3 className="text-xl font-bold text-blue-700 mb-4">
                Lợi ích của IVF
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Tỷ lệ thành công cao hơn
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Có thể chẩn đoán di truyền trước cấy
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Kiểm soát được số lượng phôi cấy
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Có thể trữ đông phôi dư thừa
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Giải quyết được nhiều nguyên nhân vô sinh
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
