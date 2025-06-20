import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ServiceCard from "../components/ServiceCard";
import ImageSponsorsMarquee from "../components/ImageSponsorsMarquee";
import TestimonialCard from "../components/TestimonialCard";
import ContactForm from "../components/ContactForm";

import "../assets/css/HomeStyle.css"; // Import your custom styles
import { IoMdPlayCircle } from "react-icons/io";
import {
  ClipboardDocumentCheckIcon,
  BeakerIcon,
  HeartIcon,
  ArrowRightIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <>
      <Header />

      <section className="pt-12 pb-20 relative overflow-hidden bg-gradient-to-b from-pink-200 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Chăm sóc sức khỏe sinh sản chu đáo và tận tâm
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-serif">
              <span className="gradient-text">FertilityCare</span> - Hành trình
              làm cha mẹ
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8">
              Chăm sóc chuyên sâu về khả năng sinh sản, sức khỏe sinh sản và xét
              nghiệm các bệnh lây truyền qua đường tình dục. Giải pháp cá nhân
              hóa cho nhu cầu về kế hoạch hóa gia đình của bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                label="Dịch vụ"
                variant="solid" // hoặc "outline"
                color="primary" // hoặc "purple"
                size="lg" //
                href="/order" //
              />

              <Button
                label="Câu chuyện"
                variant="outline" // hoặc "outline"
                color="primary" // hoặc "purple"
                size="lg" //
                href="https://example.com" //
                icon={<IoMdPlayCircle className="mr-2 text-3xl" />} //
              />
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex items-center justify-center h-[450px]">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 z-10">
              <img
                src="https://womensmentalhealth.org/wp-content/uploads/2021/10/Young-Couple-and-Infant.jpg"
                alt="Happy family"
                className="h-full w-full object-cover rounded-full border-8 border-white shadow-xl"
              />
            </div>

            {/* Floating shapes */}
            <div className="absolute -left-10 top-1/4 w-20 h-20 bg-purple-200 rounded-full blur-2xl opacity-70 z-0"></div>
            <div className="absolute -right-10 bottom-1/3 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-70 z-0"></div>

            {/* Small floating images */}
            {/* Ảnh 1  */}
            <div className="absolute -left-20 top-1/3 w-16 h-16 z-10 orbit-animate-1">
              <img
                src="https://www.mysmarthealth.in/wp-content/uploads/2022/03/indian-doctor-receives-patient-tells-him-about-results-tests-medicine-health_496169-2765.webp"
                alt="Doctor consultation"
                className="h-full w-full object-cover rounded-xl border-4 border-white shadow-md"
              />
            </div>
            {/* Ảnh 2 */}
            <div className="absolute -right-20 bottom-1/4 w-20 h-20 z-10 orbit-animate-2">
              <img
                src="https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Pregnant woman"
                className="h-full w-full object-cover rounded-xl border-4 border-white shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* // ImageSponsorsMarquee */}
      <ImageSponsorsMarquee />

      {/* // <!-- About Section --> */}

      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 serif">
              <span className="text-gray-900">Về</span>{" "}
              <span className="gradient-text">FertilityCare</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Sứ mệnh của chúng tôi là cung cấp dịch vụ chăm sóc sức khỏe sinh
              sản dựa trên bằng chứng, đầy thấu cảm cho cá nhân và các cặp đôi
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden soft-shadow">
              <img
                src="https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Doctor with patient"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Phương Pháp</h3>
                <p className="text-purple-100">
                  Chăm sóc cá nhân hóa kết hợp với những tiến bộ y học mới nhất
                </p>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 serif">
                  Chăm sóc sức khỏe sinh sản toàn diện
                </h3>
                <p className="text-gray-600 mb-6">
                  Tại FertilityCare, chúng tôi hiểu rằng sức khỏe sinh sản là
                  vấn đề riêng tư và nhạy cảm. Đội ngũ chuyên gia của chúng tôi
                  luôn thấu cảm và cung cấp dịch vụ chăm sóc phù hợp với nhu cầu
                  riêng của từng người — dù bạn đang có kế hoạch sinh con, gặp
                  khó khăn về khả năng sinh sản hay cần kiểm tra các bệnh lây
                  truyền qua đường tình dục (STI).
                </p>
                <p className="text-gray-600">
                  Với cơ sở vật chất hiện đại và phương pháp lấy bệnh nhân làm
                  trung tâm, chúng tôi cam kết đồng hành cùng bạn trong mọi giai
                  đoạn của hành trình sinh sản.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white mb-4">
                    <i className="fas fa-heartbeat text-xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    Tiếp cận toàn diện
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Chăm sóc sức khỏe sinh sản từ thể chất, cảm xúc đến tinh
                    thần.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white mb-4">
                    <i className="fas fa-flask text-xl"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    Xét nghiệm tiên tiến
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Ứng dụng công nghệ chẩn đoán hiện đại trong đánh giá khả
                    năng sinh sản và sàng lọc STI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // <!-- Services Section --> */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 serif">
              Dịch <span className="gradient-text">vụ</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Chăm sóc toàn diện cho mọi nhu cầu sức khỏe sinh sản của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <ServiceCard
              icon={<ClipboardDocumentCheckIcon className="w-6 h-6" />}
              title="Đánh giá khả năng sinh sản"
              description="Đánh giá toàn diện sức khỏe sinh sản dành cho cá nhân và các cặp đôi đang có kế hoạch mang thai."
              items={[
                "Theo dõi rụng trứng",
                "Phân tích tinh dịch",
                "Xét nghiệm nội tiết tố",
              ]}
              iconColorClass="text-purple-500"
            />
            <ServiceCard
              icon={<BeakerIcon className="w-6 h-6" />}
              title="Xét nghiệm STI"
              description="Xét nghiệm bảo mật, chính xác kết hợp tư vấn tâm lý đầy thấu cảm."
              items={[
                "Gói xét nghiệm STI toàn diện",
                "Xét nghiệm HIV nhanh",
                "Dịch vụ thông báo cho bạn đời",
              ]}
              iconColorClass="text-blue-500"
            />
            <ServiceCard
              icon={<HeartIcon className="w-6 h-6" />}
              title="Chăm sóc trước sinh"
              description="Đồng hành cùng bạn trong suốt thai kỳ để đảm bảo sức khỏe tối ưu cho mẹ và bé."
              items={[
                "Chăm sóc thai kỳ nguy cơ cao",
                "Tư vấn dinh dưỡng",
                "Lập kế hoạch sinh nở",
              ]}
              iconColorClass="text-purple-500"
            />
          </div>

          <div className="text-center mt-12">
            <Button
              label="Xem tất cả dịch vụ"
              variant="solid"
              size="lg"
              href="/service"
            />
          </div>
        </div>
      </section>

      {/* // <!-- Testimonials Section --> */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 serif">
              Trải nghiệm <span className="gradient-text">khách hàng</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Lắng nghe những chia sẻ chân thật từ những người đã đồng hành cùng
              chúng tôi trên hành trình làm cha mẹ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            <TestimonialCard
              name="Sarah J."
              service="Fertility Treatment"
              testimonial="After years of struggling, FertilityCare gave us hope and ultimately our beautiful daughter. The compassionate care made all the difference."
              avatar="./images/sarah-avatar.png"
              rating={5}
            />
            <TestimonialCard
              name="Michael T."
              service="STI Testing"
              testimonial="The STI testing was quick, confidential, and professional. I appreciated the non-judgmental approach and clear explanations."
              avatar="/images/michael-avatar.png"
              rating={5}
            />
            <TestimonialCard
              name="Priya K."
              service="Prenatal Care"
              testimonial="From conception to delivery, the team supported me through a high-risk pregnancy. I couldn't have asked for better care."
              avatar="/images/priya-avatar.png"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* <!-- Blog Section --> */}
      <section id="blog" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 serif">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                FertilityCare
              </span>{" "}
              <span className="text-gray-800">Blog</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Góc nhìn và lời khuyên từ các chuyên gia sức khỏe sinh sản của
              chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="blog-card bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 hover:-translate-y-1 fade-in flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Hiểu về khả năng thụ thai"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>15 Tháng 6, 2023</span>
                  <span className="mx-2">•</span>
                  <span>Đọc trong 5 phút</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Hiểu về cửa sổ thụ thai của bạn
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Tìm hiểu cách xác định những ngày dễ thụ thai nhất để tăng khả
                  năng thụ thai tự nhiên.
                </p>
                <div className="mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      console.log("Navigating to article...");
                    }}
                    className="text-purple-600 font-medium flex items-center group hover:text-purple-700 transition-colors duration-200"
                  >
                    <span>Đọc bài viết</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="blog-card bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 hover:-translate-y-1 fade-in flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Xét nghiệm bệnh lây truyền qua đường tình dục"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>28 Tháng 5, 2023</span>
                  <span className="mx-2">•</span>
                  <span>Đọc trong 4 phút</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Tầm quan trọng của việc xét nghiệm STI định kỳ
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Vì sao việc sàng lọc định kỳ lại thiết yếu đối với sức khỏe
                  tình dục của bạn và tần suất bạn nên xét nghiệm.
                </p>
                <div className="mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Navigating to article...");
                    }}
                    className="text-blue-600 font-medium flex items-center group hover:text-blue-700 transition-colors duration-200"
                  >
                    <span>Đọc bài viết</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="blog-card bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 hover:-translate-y-1 fade-in flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://www.riversideonline.com/-/media/patients-and-visitors/healthy-you/healthy-nutrition-pregnant.jpg"
                  alt="Dinh dưỡng trong thai kỳ"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>10 Tháng 4, 2023</span>
                  <span className="mx-2">•</span>
                  <span>Đọc trong 7 phút</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Dinh dưỡng cho một thai kỳ khỏe mạnh
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Các dưỡng chất thiết yếu dành cho phụ nữ mang thai và thực
                  phẩm hỗ trợ sự phát triển của thai nhi.
                </p>
                <div className="mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      console.log("Navigating to article...");
                    }}
                    className="text-purple-600 font-medium flex items-center group hover:text-purple-700 transition-colors duration-200"
                  >
                    <span>Đọc bài viết</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 rounded-full font-medium text-lg border-2 border-purple-500 text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
              <span>Xem tất cả bài viết</span>
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* <!-- CTA Section --> */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 serif leading-tight">
            Bạn đã sẵn sàng cho bước tiếp theo trên hành trình chăm sóc sức khỏe
            sinh sản?
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-10 leading-relaxed">
            Đội ngũ giàu kinh nghiệm của chúng tôi luôn sẵn sàng hỗ trợ bạn bằng
            các phương pháp chăm sóc cá nhân hóa, dựa trên bằng chứng khoa học.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              label="Đặt lịch hẹn"
              variant="outline" // hoặc "outline"
              color="primary" // hoặc "purple"
              size="lg" //
              href="https://example.com" //
            />

            <Button
              label="Gọi ngay"
              variant="outline" // hoặc "outline"
              color="primary" // hoặc "purple"
              size="lg" //
              href="tel:+1234567890" //
              icon={<PhoneIcon className="mr-2 h-5 w-5" />}
            />
          </div>
        </div>
      </section>

      {/* // contact section  */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 serif">
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  Liên hệ
                </span>{" "}
                với phòng khám của chúng tôi
              </h2>
              <p className="text-gray-600 mb-8">
                Bạn có câu hỏi về dịch vụ của chúng tôi hoặc muốn đặt lịch hẹn?
                Hãy liên hệ với đội ngũ thân thiện của chúng tôi.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white mr-4">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Địa chỉ</h4>
                    <p className="text-gray-600">
                      123 Wellness Way, Tầng 4
                      <br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white mr-4">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">
                      Số điện thoại
                    </h4>
                    <p className="text-gray-600">
                      (415) 555-1234
                      <br />
                      Thứ 2 - Thứ 6: 8h sáng - 6h tối
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white mr-4">
                    <EnvelopeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">
                      info@fertilitycare.com
                      <br />
                      Hỗ trợ 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* // Footer component */}

      <div>
        <Footer />
      </div>
    </>
  );
}
