'use client';

import React, { useState, useEffect, useRef } from 'react';
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

// Single Event Card with slide-up text lines and zoom-in date effect
function EventCardItem({ event }: { event: EventCardInfo; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 36px, 0)',
        transition:
          'opacity 900ms ease-out, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
      }}
      className="w-full bg-[#AC4558] rounded-[28px] sm:rounded-[32px] px-6 py-7 sm:px-8 sm:py-8 text-center text-white shadow-[0_8px_24px_rgba(172,69,88,0.22)] flex flex-col items-center transition-transform hover:-translate-y-1 duration-300"
    >
      {/* 1. Tiêu đề sự kiện: trượt từ dưới lên */}
      <h4
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
          transition:
            'opacity 800ms ease-out 100ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 100ms',
          willChange: 'transform, opacity',
        }}
        className={`${playfair.className} font-bold text-[19px] sm:text-[21px] uppercase tracking-wider leading-snug mb-1 text-white`}
      >
        {event.title}
      </h4>

      {/* 2. Thời gian tổ chức: trượt từ dưới lên */}
      <p
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
          transition:
            'opacity 800ms ease-out 180ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 180ms',
          willChange: 'transform, opacity',
        }}
        className={`${playfair.className} text-[13px] sm:text-[14px] uppercase tracking-wide text-white/95 mb-3 font-semibold`}
      >
        {event.time}
      </p>

      {/* Đường kẻ ngang trên ngày */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition:
            'opacity 700ms ease-out 220ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 220ms',
          transformOrigin: 'center',
        }}
        className="w-4/5 h-[1px] bg-white/40 my-1"
      />

      {/* 3. RIÊNG NGÀY THÁNG NĂM: HIỆU ỨNG ZOOM PHÓNG TO NỔI BẬT */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.55)',
          transition:
            'opacity 850ms ease-out 260ms, transform 1100ms cubic-bezier(0.34, 1.56, 0.64, 1) 260ms',
          willChange: 'transform, opacity',
          transformOrigin: 'center',
        }}
        className={`${prata.className} text-[44px] sm:text-[50px] tracking-tight leading-tight my-0.5 text-white drop-shadow-sm select-none`}
      >
        {event.date}
      </div>

      {/* Đường kẻ ngang dưới ngày */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition:
            'opacity 700ms ease-out 320ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 320ms',
          transformOrigin: 'center',
        }}
        className="w-4/5 h-[1px] bg-white/40 my-1"
      />

      {/* 4. Ngày âm lịch: trượt từ dưới lên */}
      <p
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 22px, 0)',
          transition:
            'opacity 800ms ease-out 360ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 360ms',
          willChange: 'transform, opacity',
        }}
        className={`${playfair.className} text-[13px] sm:text-[14px] italic text-white/95 mt-2.5 mb-3.5 font-medium`}
      >
        {event.lunarDate}
      </p>

      {/* 5. Địa điểm tổ chức: trượt từ dưới lên */}
      <h5
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 22px, 0)',
          transition:
            'opacity 800ms ease-out 420ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 420ms',
          willChange: 'transform, opacity',
        }}
        className={`${playfair.className} font-bold text-[16.5px] sm:text-[18px] uppercase tracking-wide mb-1 text-white`}
      >
        {event.venueName}
      </h5>

      {/* 6. Địa chỉ chi tiết: trượt từ dưới lên */}
      <p
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 22px, 0)',
          transition:
            'opacity 800ms ease-out 480ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 480ms',
          willChange: 'transform, opacity',
        }}
        className={`${playfair.className} text-[13.5px] sm:text-[14.5px] text-white/95 leading-relaxed max-w-[320px] mb-5 font-medium`}
      >
        {event.address}
      </p>

      {/* 7. Nút Xem chỉ đường: trượt từ dưới lên */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 22px, 0)',
          transition:
            'opacity 800ms ease-out 540ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 540ms',
          willChange: 'transform, opacity',
        }}
      >
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
    </div>
  );
}

export default function Slide3Invitation({
  parentsInfo = DEFAULT_PARENTS,
  events = DEFAULT_EVENTS,
}: Slide3InvitationProps) {
  // Intersection observers for header and parents columns
  const headerRef = useRef<HTMLDivElement>(null);
  const parentsRef = useRef<HTMLDivElement>(null);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [parentsVisible, setParentsVisible] = useState(false);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (headerEl) {
      const headerObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHeaderVisible(true);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
      );
      headerObs.observe(headerEl);
      return () => headerObs.disconnect();
    }
  }, []);

  useEffect(() => {
    const parentsEl = parentsRef.current;
    if (parentsEl) {
      const parentsObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setParentsVisible(true);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
      );
      parentsObs.observe(parentsEl);
      return () => parentsObs.disconnect();
    }
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#FFFAF4] pt-6 pb-16 select-none overflow-x-hidden">
      <div className="relative w-full max-w-[450px] mx-auto px-4 sm:px-0 flex flex-col items-center text-center">
        {/* 1. HEADER: 'TRÂN TRỌNG KÍNH MỜI...' BẬT TỪ GIỮA RA, ZOOM NHỎ VÀ PHÓNG TO RA */}
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'scale(1)' : 'scale(0.55)',
            filter: headerVisible ? 'blur(0px)' : 'blur(4px)',
            transition:
              'opacity 900ms ease-out, transform 1150ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 800ms ease-out',
            transformOrigin: 'center',
            willChange: 'transform, opacity, filter',
          }}
          className="flex flex-col items-center text-center"
        >
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

        {/* 2. HAI CỘT NHÀ TRAI & NHÀ GÁI: TRƯỢT TỪ 2 BÊN VÀO */}
        <div
          ref={parentsRef}
          className="flex items-start justify-center my-6 sm:my-7 w-full max-w-[400px] overflow-hidden"
        >
          {/* Cột bên trái: Nhà Trai - trượt từ bên trái vào */}
          <div
            style={{
              opacity: parentsVisible ? 1 : 0,
              transform: parentsVisible
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(-55px, 0, 0)',
              filter: parentsVisible ? 'blur(0px)' : 'blur(3px)',
              transition:
                'opacity 900ms ease-out 100ms, transform 1050ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, filter 900ms ease-out 100ms',
              willChange: 'transform, opacity, filter',
            }}
            className="flex-1 text-center pr-2"
          >
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

          {/* Vạch kẻ dọc phân chia: mở dần theo chiều dọc */}
          <div
            style={{
              opacity: parentsVisible ? 1 : 0,
              transform: parentsVisible ? 'scaleY(1)' : 'scaleY(0)',
              transition:
                'opacity 700ms ease-out 250ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 250ms',
              transformOrigin: 'center',
            }}
            className="w-[1.5px] self-stretch min-h-[120px] bg-[#AC4558]/35 mx-3 sm:mx-4"
          />

          {/* Cột bên phải: Nhà Gái - trượt từ bên phải vào */}
          <div
            style={{
              opacity: parentsVisible ? 1 : 0,
              transform: parentsVisible
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(55px, 0, 0)',
              filter: parentsVisible ? 'blur(0px)' : 'blur(3px)',
              transition:
                'opacity 900ms ease-out 100ms, transform 1050ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, filter 900ms ease-out 100ms',
              willChange: 'transform, opacity, filter',
            }}
            className="flex-1 text-center pl-2"
          >
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

        {/* 3. PHẦN 3 Ô ĐỎ BÊN DƯỚI: CHỮ TRƯỢT TỪ DƯỚI LÊN, RIÊNG NGÀY THÁNG NĂM ZOOM PHÓNG TO */}
        <div className="w-full flex flex-col gap-6 sm:gap-7 mt-2">
          {events.map((event, index) => (
            <EventCardItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
