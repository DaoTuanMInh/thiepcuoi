'use client';

import { Playfair_Display, Prata } from 'next/font/google';

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
});

const prata = Prata({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

export interface EventCardInfo {
  title: string;
  time: string;
  date: string;
  lunarDate: string;
  venueName: string;
  address: string;
  mapUrl?: string;
}

export interface ParentsInfo {
  groom: {
    father: string;
    mother: string;
    groomName: string;
    groomRole: string;
  };
  bride: {
    father: string;
    mother: string;
    brideName: string;
    brideRole: string;
  };
}

interface Slide3InvitationProps {
  parentsInfo?: ParentsInfo;
  events?: EventCardInfo[];
}

const DEFAULT_PARENTS: ParentsInfo = {
  groom: {
    father: 'Phạm Đức Phong',
    mother: 'Đinh Thị Lan',
    groomName: 'Phạm Xuân Tùng',
    groomRole: 'Trưởng nam',
  },
  bride: {
    father: 'Nguyễn Văn Công',
    mother: 'Phạm Thị Liên',
    brideName: 'Nguyễn Thuý Hiền',
    brideRole: 'Út nữ',
  },
};

const DEFAULT_EVENTS: EventCardInfo[] = [
  {
    title: 'LỄ THÀNH HÔN',
    time: 'ĐƯỢC TỔ CHỨC VÀO LÚC 9:00, CHỦ NHẬT',
    date: '29.11.2026',
    lunarDate: '(Tức ngày 21 tháng 10 năm Bính Ngọ)',
    venueName: 'TẠI HỘI TRƯỜNG KHU YÊN LÃNG 2',
    address: 'Phường Mạo Khê, TP. Quảng Ninh',
    mapUrl: 'https://maps.google.com/?q=Hội+trường+khu+Yên+Lãng+2+Mạo+Khê+Quảng+Ninh',
  },
  {
    title: 'BỮA TIỆC CHUNG VUI',
    time: 'ĐƯỢC TỔ CHỨC VÀO LÚC 16:30, THỨ BẢY',
    date: '28.11.2026',
    lunarDate: '(Tức ngày 20 tháng 10 năm Bính Ngọ)',
    venueName: 'TẠI HỘI TRƯỜNG KHU YÊN LÃNG 2',
    address: 'Phường Mạo Khê, TP. Quảng Ninh',
    mapUrl: 'https://maps.google.com/?q=Hội+trường+khu+Yên+Lãng+2+Mạo+Khê+Quảng+Ninh',
  },
  {
    title: 'LỄ THÀNH HÔN',
    time: 'ĐƯỢC TỔ CHỨC VÀO LÚC 16:30, CHỦ NHẬT',
    date: '29.11.2026',
    lunarDate: '(Tức ngày 21 tháng 10 năm Bính Ngọ)',
    venueName: 'TẠI HUY HOÀNG PALACE',
    address: 'Sảnh A, tổ 1, Phường Mạo Khê, TP. Quảng Ninh',
    mapUrl: 'https://maps.google.com/?q=Huy+Hoàng+Palace+Mạo+Khê+Quảng+Ninh',
  },
];

export default function Slide3Invitation({
  parentsInfo = DEFAULT_PARENTS,
  events = DEFAULT_EVENTS,
}: Slide3InvitationProps) {
  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#FFFAF4] pt-6 pb-16 select-none overflow-x-hidden">
      <div className="relative w-full max-w-[450px] mx-auto px-4 sm:px-0 flex flex-col items-center text-center">
        {/* 1. Header: Trân trọng kính mời quý khách */}
        <div className="flex flex-col items-center">
          <h3
            className={`${playfair.className} text-[18px] sm:text-[21px] text-[#AC4558] tracking-[0.04em] uppercase leading-tight font-bold`}
          >
            TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH
          </h3>
          <h3
            className={`${playfair.className} text-[18px] sm:text-[21px] text-[#AC4558] tracking-[0.04em] uppercase leading-tight mt-1.5 font-bold`}
          >
            TỚI THAM DỰ VÀ CHIA SẺ NIỀM VUI
          </h3>
        </div>

        {/* 2. Hai cột Nhà Trai & Nhà Gái kèm thông tin Chú rể & Cô dâu */}
        <div className="flex items-start justify-center my-6 sm:my-7 w-full max-w-[400px]">
          {/* Nhà Trai */}
          <div className="flex-1 text-center pr-2">
            <h4
              className={`${playfair.className} text-[15px] sm:text-[16px] text-[#AC4558] uppercase tracking-wider mb-2 font-bold`}
            >
              NHÀ TRAI
            </h4>
            <p
              className={`${playfair.className} text-[13.5px] sm:text-[14.5px] text-[#AC4558] leading-relaxed font-medium`}
            >
              Ông: {parentsInfo.groom.father}
            </p>
            <p
              className={`${playfair.className} text-[13.5px] sm:text-[14.5px] text-[#AC4558] leading-relaxed font-medium`}
            >
              Bà: {parentsInfo.groom.mother}
            </p>
            <div className="mt-2.5 pt-1.5 border-t border-[#AC4558]/20">
              <p
                className={`${playfair.className} text-[12.5px] sm:text-[13.5px] text-[#AC4558]/85 italic font-medium`}
              >
                Chú rể ({parentsInfo.groom.groomRole}):
              </p>
              <p
                className={`${playfair.className} text-[16px] sm:text-[17px] text-[#AC4558] font-bold leading-snug mt-0.5`}
              >
                {parentsInfo.groom.groomName}
              </p>
            </div>
          </div>

          {/* Vạch kẻ dọc phân chia */}
          <div className="w-[1.5px] self-stretch min-h-[120px] bg-[#AC4558]/35 mx-3 sm:mx-4" />

          {/* Nhà Gái */}
          <div className="flex-1 text-center pl-2">
            <h4
              className={`${playfair.className} text-[15px] sm:text-[16px] text-[#AC4558] uppercase tracking-wider mb-2 font-bold`}
            >
              NHÀ GÁI
            </h4>
            <p
              className={`${playfair.className} text-[13.5px] sm:text-[14.5px] text-[#AC4558] leading-relaxed font-medium`}
            >
              Ông: {parentsInfo.bride.father}
            </p>
            <p
              className={`${playfair.className} text-[13.5px] sm:text-[14.5px] text-[#AC4558] leading-relaxed font-medium`}
            >
              Bà: {parentsInfo.bride.mother}
            </p>
            <div className="mt-2.5 pt-1.5 border-t border-[#AC4558]/20">
              <p
                className={`${playfair.className} text-[12.5px] sm:text-[13.5px] text-[#AC4558]/85 italic font-medium`}
              >
                Cô dâu ({parentsInfo.bride.brideRole}):
              </p>
              <p
                className={`${playfair.className} text-[16px] sm:text-[17px] text-[#AC4558] font-bold leading-snug mt-0.5`}
              >
                {parentsInfo.bride.brideName}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Phần ô đỏ (3 ô sự kiện chi tiết) */}
        <div className="w-full flex flex-col gap-6 sm:gap-7 mt-2">
          {events.map((event, index) => (
            <div
              key={index}
              className="w-full bg-[#AC4558] rounded-[28px] sm:rounded-[32px] px-6 py-7 sm:px-8 sm:py-8 text-center text-white shadow-[0_8px_24px_rgba(172,69,88,0.22)] flex flex-col items-center transition-transform hover:-translate-y-1 duration-300"
            >
              {/* Tiêu đề sự kiện */}
              <h4
                className={`${playfair.className} font-bold text-[19px] sm:text-[21px] uppercase tracking-wider leading-snug mb-1 text-white`}
              >
                {event.title}
              </h4>

              {/* Thời gian tổ chức */}
              <p
                className={`${playfair.className} text-[13px] sm:text-[14px] uppercase tracking-wide text-white/95 mb-3 font-semibold`}
              >
                {event.time}
              </p>

              {/* Đường kẻ ngang trên ngày */}
              <div className="w-4/5 h-[1px] bg-white/40 my-1" />

              {/* Ngày dương lịch to rõ nét - Giữ nguyên font số Prata tuyệt đẹp */}
              <div
                className={`${prata.className} text-[44px] sm:text-[50px] tracking-tight leading-tight my-0.5 text-white`}
              >
                {event.date}
              </div>

              {/* Đường kẻ ngang dưới ngày */}
              <div className="w-4/5 h-[1px] bg-white/40 my-1" />

              {/* Ngày âm lịch */}
              <p
                className={`${playfair.className} text-[13px] sm:text-[14px] italic text-white/95 mt-2.5 mb-3.5 font-medium`}
              >
                {event.lunarDate}
              </p>

              {/* Địa điểm tổ chức */}
              <h5
                className={`${playfair.className} font-bold text-[16.5px] sm:text-[18px] uppercase tracking-wide mb-1 text-white`}
              >
                {event.venueName}
              </h5>

              {/* Địa chỉ chi tiết */}
              <p
                className={`${playfair.className} text-[13.5px] sm:text-[14.5px] text-white/95 leading-relaxed max-w-[320px] mb-5 font-medium`}
              >
                {event.address}
              </p>

              {/* Nút Xem chỉ đường */}
              <a
                href={
                  event.mapUrl ||
                  `https://maps.google.com/?q=${encodeURIComponent(
                    `${event.venueName} ${event.address}`
                  )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`${playfair.className} uppercase font-bold text-[13px] sm:text-[14px] tracking-wider text-[#AC4558] bg-white px-7 py-2.5 rounded-full shadow-md hover:bg-stone-50 active:scale-95 transition-all inline-flex items-center gap-1.5`}
              >
                XEM CHỈ ĐƯỜNG
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
