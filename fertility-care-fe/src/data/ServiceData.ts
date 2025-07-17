import type { TreatmentService } from '../models/TreatmentService';
import type { TreatmentStep } from '../models/TreatmentStep';

// IDs from your SQL data
const IVF_ID = '9B0A7B2B-FEBF-4B20-B63C-5EC967C8DEEB';
const IUI_ID = '9A34FA9B-DF26-4D79-8C01-AC2F1A30A776';

export const treatmentSteps: TreatmentStep[] = [
  // IVF Steps
  {
    Id: '1',
    stepName: 'Khám ban đầu & xét nghiệm',
    description: 'Ở bước đầu tiên, hai vợ chồng sẽ đến khám tại cơ sở hỗ trợ sinh sản để được bác sĩ chuyên khoa khai thác tiền sử bệnh lý, thời gian mong con, các vấn đề về kinh nguyệt, tiền sử điều trị trước đó (nếu có) và tư vấn tổng quan về các phương pháp điều trị phù hợp. Đồng thời người vợ sẽ được siêu âm đầu dò âm đạo vào ngày thứ 2–3 của chu kỳ kinh để kiểm tra nang noãn và tử cung.',
    stepOrder: 1,
    estimatedDurationDays: 1,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    Id: '2',
    stepName: 'Kích thích buồng trứng',
    description: 'Người vợ sẽ dùng thuốc kích trứng liên tục trong nhiều ngày. Bác sĩ sẽ theo dõi bằng siêu âm và xét nghiệm máu để điều chỉnh liều thuốc và xác định thời điểm chọc hút trứng.',
    stepOrder: 2,
    estimatedDurationDays: 10,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    Id: '3',
    stepName: 'Chọc hút trứng & lấy tinh trùng',
    description: 'Khi nang trứng đạt kích thước phù hợp, bác sĩ sẽ chọc hút trứng qua đường âm đạo dưới gây mê nhẹ. Đồng thời, người chồng sẽ lấy tinh trùng để chuẩn bị thụ tinh.',
    stepOrder: 3,
    estimatedDurationDays: 1,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    Id: '4',
    stepName: 'Thụ tinh & nuôi cấy phôi',
    description: 'Trứng sau khi lấy ra sẽ được kết hợp với tinh trùng trong phòng lab để thụ tinh. Phôi tạo thành được nuôi cấy từ 3–5 ngày để chọn ra phôi tốt nhất.',
    stepOrder: 4,
    estimatedDurationDays: 5,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    Id: '5',
    stepName: 'Chuyển phôi',
    description: 'Bác sĩ sẽ chuyển 1–2 phôi tốt nhất vào tử cung bằng catheter mềm, không gây đau. Các phôi dư được trữ lạnh cho lần sau nếu cần.',
    stepOrder: 5,
    estimatedDurationDays: 1,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    Id: '6',
    stepName: 'Theo dõi kết quả',
    description: 'Sau 12–14 ngày, người vợ sẽ xét nghiệm beta-hCG để kiểm tra có thai hay không. Nếu dương tính sẽ tiếp tục theo dõi thai kỳ; nếu không sẽ tư vấn hướng tiếp theo.',
    stepOrder: 6,
    estimatedDurationDays: 14,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // IUI Steps
  {
    Id: '7',
    stepName: 'Khám ban đầu & xét nghiệm',
    description: 'Bác sĩ thăm khám tổng quát, khai thác tiền sử sinh sản, chỉ định làm các xét nghiệm nội tiết, siêu âm và kiểm tra chất lượng tinh trùng.',
    stepOrder: 1,
    estimatedDurationDays: 1,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    Id: '8',
    stepName: 'Kích thích buồng trứng',
    description: 'Người vợ được tiêm thuốc kích trứng nhẹ để tạo ra 1–2 nang trứng trưởng thành, được theo dõi bằng siêu âm định kỳ.',
    stepOrder: 2,
    estimatedDurationDays: 8,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    Id: '9',
    stepName: 'Chuẩn bị tinh trùng & Bơm tinh trùng vào tử cung',
    description: 'Tinh trùng được lọc rửa và cô đặc để chọn tinh trùng khỏe mạnh. Sau đó được bơm trực tiếp vào buồng tử cung vào đúng thời điểm rụng trứng.',
    stepOrder: 3,
    estimatedDurationDays: 1,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    Id: '10',
    stepName: 'Theo dõi kết quả',
    description: 'Khoảng 14 ngày sau bơm, người vợ sẽ được xét nghiệm beta-hCG để xác định có thai hay không và theo dõi các dấu hiệu sớm của thai kỳ.',
    stepOrder: 4,
    estimatedDurationDays: 14,
    amount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const treatmentServices: TreatmentService[] = [
  {
    id: IVF_ID,
    name: 'IVF',
    description: 'Thụ tinh trong ống nghiệm (In Vitro Fertilization) là phương pháp hỗ trợ sinh sản tiên tiến, giúp giải quyết các vấn đề về vô sinh hiếm muộn.',
    estimatePrice: 80000000, // 80 triệu VND
    duration: 45,
    successRate: 65,
    recommendedFor: 'Phụ nữ có vấn đề về vòi trứng, nam giới có vấn đề về tinh trùng, vô sinh không rõ nguyên nhân',
    contraindications: 'Bệnh lý tử cung nghiêm trọng, bệnh lý toàn thân nặng',
    createdAt: new Date().toISOString(),
    treatmentSteps: treatmentSteps.filter((_, index) => index < 6)
  },
  {
    id: IUI_ID,
    name: 'IUI',
    description: 'Thụ tinh trong tử cung (Intrauterine Insemination) là phương pháp đơn giản, ít xâm lấn, giúp tăng khả năng thụ thai tự nhiên.',
    estimatePrice: 15000000, // 15 triệu VND
    duration: 20,
    successRate: 45,
    recommendedFor: 'Vô sinh không rõ nguyên nhân, vấn đề nhẹ về tinh trùng, rối loạn phóng noãn',
    contraindications: 'Tắc vòi trứng hoàn toàn, nội mạc tử cung quá mỏng',
    createdAt: new Date().toISOString(),
    treatmentSteps: treatmentSteps.filter((_, index) => index >= 6)
  }
];
