'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Imperial_Script, Lora } from 'next/font/google';

const imperialScript = Imperial_Script({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
});

export default function Slide3Invitation() {
  const [inView, setInView] = useState({
    parents: false,
    invite: false,
    names: false,
    date: false,
    venue: false,
  });

  const parentsRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements: { key: keyof typeof inView; el: HTMLDivElement | null }[] = [
      { key: 'parents', el: parentsRef.current },
      { key: 'invite', el: inviteRef.current },
      { key: 'names', el: namesRef.current },
      { key: 'date', el: dateRef.current },
      { key: 'venue', el: venueRef.current },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.getAttribute('data-anim-key') as keyof typeof inView | null;
          if (!key) return;
          if (entry.isIntersecting) {
            setInView((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.85) {
            // Reset when user scrolls back up above this block so scrolling down replays the effect
            setInView((prev) => (!prev[key] ? prev : { ...prev, [key]: false }));
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    elements.forEach(({ el }) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className={`${lora.className} lining-nums relative w-full aspect-[463/1024] py-14 sm:py-16 px-5 flex flex-col items-center justify-center text-center overflow-hidden select-none text-[#928362]`}
    >
      <style>{`
        @keyframes gentleZoomPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.09);
          }
        }
        .animate-gentle-zoom {
          animation: gentleZoomPulse 2.2s ease-in-out infinite;
        }
      `}</style>

      {/* Background Image - Hiển thị đầy đủ 100% chiều dọc bức ảnh để giữ nguyên hoa văn nổi ở đầu và cuối */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/slide3-bg-v2.jpg"
          alt="Nền Slide 3"
          fill
          priority
          unoptimized
          sizes="(max-width: 500px) 100vw, 500px"
          className="object-fill w-full h-full"
        />
      </div>

      <div
        className="relative z-10 w-full flex flex-col items-center"
        style={{ WebkitTextStroke: '0.22px currentColor' }}
      >
        {/* 1. Nhà Trai & Nhà Gái: Lướt đến mới hiện dần từ ở giữa kéo sang 2 bên */}
        <div
          ref={parentsRef}
          data-anim-key="parents"
          className="grid grid-cols-2 gap-3 w-full max-w-[395px] mb-7 sm:mb-8"
        >
          {/* Nhà Trai: Kéo từ giữa sang bên trái */}
          <div
            className="flex flex-col items-center text-center"
            style={{
              transform: inView.parents ? 'translateX(0px)' : 'translateX(64px)',
              opacity: inView.parents ? 1 : 0,
              transition:
                'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
            }}
          >
            <p className="text-[14px] sm:text-[15.5px] font-bold uppercase tracking-[0.03em] mb-1.5 text-[#928362]">
              NHÀ TRAI
            </p>
            <p className="text-[13.5px] sm:text-[14.5px] font-semibold leading-[1.5] text-[#928362]">
              Ông Nguyễn Văn Kiên
            </p>
            <p className="text-[13.5px] sm:text-[14.5px] font-semibold leading-[1.5] text-[#928362]">
              Bà Bùi Thị Mai
            </p>
          </div>

          {/* Nhà Gái: Kéo từ giữa sang bên phải */}
          <div
            className="flex flex-col items-center text-center"
            style={{
              transform: inView.parents ? 'translateX(0px)' : 'translateX(-64px)',
              opacity: inView.parents ? 1 : 0,
              transition:
                'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
            }}
          >
            <p className="text-[14px] sm:text-[15.5px] font-bold uppercase tracking-[0.03em] mb-1.5 text-[#928362]">
              NHÀ GÁI
            </p>
            <p className="text-[13.5px] sm:text-[14.5px] font-semibold leading-[1.5] text-[#928362]">
              Ông Phạm Văn Lập
            </p>
            <p className="text-[13.5px] sm:text-[14.5px] font-semibold leading-[1.5] text-[#928362]">
              Bà Nguyễn Thị Hội
            </p>
          </div>
        </div>

        {/* 2. Chữ Kính mời: Lướt đến mới hiện dần từ dưới lên */}
        <div
          ref={inviteRef}
          data-anim-key="invite"
          className="flex flex-col items-center mb-5 sm:mb-6"
          style={{
            transform: inView.invite ? 'translateY(0px)' : 'translateY(38px)',
            opacity: inView.invite ? 1 : 0,
            transition:
              'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
          }}
        >
          <p className="text-[13.5px] sm:text-[15px] font-semibold uppercase tracking-[0.03em] leading-[1.6] text-[#928362]">
            KÍNH MỜI THAM DỰ TIỆC CHUNG VUI
          </p>
          <p className="text-[13.5px] sm:text-[15px] font-semibold uppercase tracking-[0.03em] leading-[1.6] text-[#928362]">
            CỦA GIA ĐÌNH CHÚNG TÔI
          </p>
        </div>

        {/* 3. Tên Cô Dâu & Chú Rể (Giữ nguyên kiểu chữ Imperial Script): Lướt đến mới hiện dần từ dưới lên */}
        <div
          ref={namesRef}
          data-anim-key="names"
          className="flex flex-col items-center justify-center my-1 sm:my-2"
          style={{
            WebkitTextStroke: '0px',
            transform: inView.names ? 'translateY(0px)' : 'translateY(40px)',
            opacity: inView.names ? 1 : 0,
            transition:
              'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
          }}
        >
          <h2
            className={`${imperialScript.className} text-[58px] sm:text-[66px] leading-[0.92] text-[#928362] font-normal whitespace-nowrap`}
          >
            Anh Linh
          </h2>
          <span
            className={`${imperialScript.className} text-[38px] sm:text-[42px] leading-none text-[#928362] my-[-2px]`}
          >
            &amp;
          </span>
          <h2
            className={`${imperialScript.className} text-[58px] sm:text-[66px] leading-[0.92] text-[#928362] font-normal whitespace-nowrap`}
          >
            Thanh Nga
          </h2>
        </div>

        {/* 4. Ngày giờ tổ chức: Lướt đến mới hiện ra */}
        <div
          ref={dateRef}
          data-anim-key="date"
          className="w-full flex flex-col items-center mt-5 sm:mt-6"
        >
          {/* Giờ + Thứ: Hiện dần từ dưới lên */}
          <p
            className="text-[15.5px] sm:text-[17px] font-semibold tracking-[0.03em] uppercase text-[#928362] mb-2.5"
            style={{
              transform: inView.date ? 'translateY(0px)' : 'translateY(34px)',
              opacity: inView.date ? 1 : 0,
              transition:
                'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease-out',
            }}
          >
            11:30, CHỦ NHẬT
          </p>

          {/* Cụm THÁNG 12 - 21 - NĂM 2025 */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 w-full max-w-[335px] sm:max-w-[355px] my-0.5">
            {/* Bên trái số lớn (THÁNG 12): Hiện từ số lớn ở giữa kéo sang bên trái */}
            <div
              className="flex-1 border-y border-[#928362]/85 py-[6px] text-center"
              style={{
                transform: inView.date ? 'translateX(0px)' : 'translateX(56px)',
                opacity: inView.date ? 1 : 0,
                transition:
                  'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.18s, opacity 0.85s ease-out 0.18s',
              }}
            >
              <span className="text-[14px] sm:text-[15.5px] font-semibold tracking-[0.03em] uppercase text-[#928362]">
                THÁNG 12
              </span>
            </div>

            {/* Số to nằm ở giữa (21): Hiện dần từ dưới lên */}
            <span
              className="relative z-10 text-[58px] sm:text-[66px] font-medium leading-[0.82] text-[#928362] px-1"
              style={{
                transform: inView.date ? 'translateY(0px)' : 'translateY(36px)',
                opacity: inView.date ? 1 : 0,
                transition:
                  'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1) 0.08s, opacity 0.85s ease-out 0.08s',
              }}
            >
              21
            </span>

            {/* Bên phải số lớn (NĂM 2025): Hiện từ số lớn ở giữa kéo sang bên phải */}
            <div
              className="flex-1 border-y border-[#928362]/85 py-[6px] text-center"
              style={{
                transform: inView.date ? 'translateX(0px)' : 'translateX(-56px)',
                opacity: inView.date ? 1 : 0,
                transition:
                  'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.18s, opacity 0.85s ease-out 0.18s',
              }}
            >
              <span className="text-[14px] sm:text-[15.5px] font-semibold tracking-[0.03em] uppercase text-[#928362]">
                NĂM 2025
              </span>
            </div>
          </div>

          {/* Nội dung trong ngoặc: Hiện dần từ dưới lên */}
          <p
            className="italic font-medium text-[13.5px] sm:text-[15px] text-[#928362] mt-3"
            style={{
              transform: inView.date ? 'translateY(0px)' : 'translateY(32px)',
              opacity: inView.date ? 1 : 0,
              transition:
                'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1) 0.25s, opacity 0.85s ease-out 0.25s',
            }}
          >
            ( Tức ngày 2 tháng 11 năm Ất Tỵ)
          </p>
        </div>

        {/* 5. Nội dung còn lại bên dưới (Địa điểm & Chỉ đường): Lướt đến mới hiện dần từ dưới lên */}
        <div
          ref={venueRef}
          data-anim-key="venue"
          className="w-full flex flex-col items-center mt-5 sm:mt-6"
          style={{
            transform: inView.venue ? 'translateY(0px)' : 'translateY(38px)',
            opacity: inView.venue ? 1 : 0,
            transition:
              'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
          }}
        >
          <p className="font-semibold text-[14.5px] sm:text-[16px] text-[#928362] mb-1">
            Tổ chức tại
          </p>
          <p className="text-[17.5px] sm:text-[19.5px] font-bold tracking-[0.03em] uppercase text-[#928362] mb-1.5">
            TƯ GIA NHÀ TRAI
          </p>
          <p className="font-semibold text-[14px] sm:text-[15.5px] text-[#928362] mb-5">
            Thôn 16, xã Bảo Lâm 3, tỉnh Lâm Đồng
          </p>

          {/* Nút CHỈ ĐƯỜNG: Hiệu ứng zoom ra zoom vào nhẹ nhẹ + bấm ra Google Maps */}
          <a
            href="https://maps.app.goo.gl/vAfvEernK21HtXTJA"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-gentle-zoom inline-flex items-center justify-center gap-1.5 px-3 py-1 text-[#928362] hover:opacity-85 transition-opacity cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] fill-current"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            <span className="text-[14.5px] sm:text-[16px] font-bold tracking-[0.04em] uppercase">
              CHỈ ĐƯỜNG
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
