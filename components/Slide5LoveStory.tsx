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
  subsets: ['latin', 'vietnamese'],
});

const CALENDAR_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const WEEKDAYS = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'];

interface Slide5LoveStoryProps {
  bridePhotoSrc?: string;
  couplePhotoSrc?: string;
}

export default function Slide5LoveStory({
  bridePhotoSrc = '/images/slide5-bride.png',
  couplePhotoSrc = '/images/slide5-couple.png',
}: Slide5LoveStoryProps) {
  const [inView, setInView] = useState({
    header: false,
    bride: false,
    groom: false,
    ringsQuote: false,
    calendar: false,
    heart: false,
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const brideRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLDivElement>(null);
  const ringsQuoteRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements: { key: keyof typeof inView; el: HTMLDivElement | null }[] = [
      { key: 'header', el: headerRef.current },
      { key: 'bride', el: brideRef.current },
      { key: 'groom', el: groomRef.current },
      { key: 'ringsQuote', el: ringsQuoteRef.current },
      { key: 'calendar', el: calendarRef.current },
      { key: 'heart', el: heartRef.current },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.getAttribute('data-anim-key') as keyof typeof inView | null;
          if (!key) return;
          if (entry.isIntersecting) {
            setInView((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.9) {
            setInView((prev) => (!prev[key] ? prev : { ...prev, [key]: false }));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
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
      className={`${lora.className} lining-nums relative w-full pt-28 sm:pt-32 pb-32 sm:pb-36 flex flex-col items-center overflow-hidden select-none text-[#928362]`}
    >
      <style>{`
        @keyframes heartFadeIn {
          0% {
            transform: scale(0.92);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes heartGentlePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
        .animate-heart-appear {
          animation:
            heartFadeIn 0.5s ease-out 0.2s both,
            heartGentlePulse 2.6s ease-in-out 3.0s infinite;
        }
      `}</style>

      {/* Background Image - Tách hoa văn ở đầu và cuối trang, mở rộng khoảng trắng giấy ở giữa */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#F6F6F6]">
        {/* Hoa văn lan trắng nổi ở đầu trang đúng tỉ lệ gốc 463x1024 */}
        <div
          className="absolute top-0 inset-x-0 aspect-[463/1024] pointer-events-none"
          style={{
            clipPath: 'inset(0 0 83% 0)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
          }}
        >
          <Image
            src="/images/slide3-bg-v2.jpg"
            alt=""
            fill
            unoptimized
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-fill w-full h-full"
          />
        </div>

        {/* Hoa văn lan trắng nổi ở cuối trang đúng tỉ lệ gốc 463x1024 */}
        <div
          className="absolute bottom-0 inset-x-0 aspect-[463/1024] pointer-events-none"
          style={{
            clipPath: 'inset(83% 0 0 0)',
            WebkitMaskImage: 'linear-gradient(to top, black 75%, transparent 100%)',
            maskImage: 'linear-gradient(to top, black 75%, transparent 100%)',
          }}
        >
          <Image
            src="/images/slide3-bg-v2.jpg"
            alt=""
            fill
            unoptimized
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-fill w-full h-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Cụm đầu trang: Monogram LN + Đoạn lời tựa tình yêu 7 dòng */}
        <div
          ref={headerRef}
          data-anim-key="header"
          className="w-full flex flex-col items-center px-4"
        >
          {/* 1. Monogram Logo LN ở đầu trang */}
          <div
            className="mb-5 sm:mb-6"
            style={{
              transform: inView.header ? 'translateY(0px)' : 'translateY(28px)',
              opacity: inView.header ? 1 : 0,
              transition:
                'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
            }}
          >
            <svg
              viewBox="0 0 130 74"
              className="w-[96px] h-[55px] sm:w-[108px] sm:h-[62px] text-[#928362]"
              fill="none"
              aria-label="LN Monogram"
            >
              {/* Tall Serif Capital L */}
              <path
                d="M36 9 H48 M42 9 V55 H66 L68.5 46"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="square"
              />
              <path d="M36 55 H43" stroke="currentColor" strokeWidth="2.0" />
              {/* Intertwined Script N */}
              <path
                d="M23 58 C18 59, 17 64, 23 65 C35 66, 55 54, 73 24 L69.5 58 C78 38, 95 14, 110 14 C116 14, 118 19, 114 23"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 2. Đoạn lời tựa tình yêu 7 dòng */}
          <div
            className="w-full max-w-[420px] text-center px-1 mb-1"
            style={{
              WebkitTextStroke: '0.18px currentColor',
              transform: inView.header ? 'translateY(0px)' : 'translateY(32px)',
              opacity: inView.header ? 1 : 0,
              transition:
                'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.12s, opacity 0.85s ease-out 0.12s',
            }}
          >
            <p className="text-[12px] sm:text-[13.5px] font-semibold leading-[1.72] text-[#928362]">
              Tình yêu của anh và em là một hành trình kỳ diệu, vượt qua
              <br />
              bao thử thách để cùng nhau bước đến ngày trọng đại
              <br />
              - đám cưới của chúng mình.
              <br />
              Đám cưới này là lời cam kết chân thành, là sự bắt đầu của một
              <br />
              chương mới - nơi chúng ta cùng vun đắp tổ ấm, cùng sẻ chia
              <br />
              mọi vui buồn và cùng nắm tay nhau đi đến cuối con đường
              <br />
              mang tên hạnh phúc.
            </p>
          </div>
        </div>

        {/* 3. Cụm 2 khung ảnh chéo đè góc nhau chuẩn tỉ lệ 375x450 như ảnh mẫu */}
        <div className="relative w-full aspect-[375/450] shrink-0 mt-1">
          {/* Điểm neo quan sát cuộn cho hàng trên (Cô dâu) */}
          <div
            ref={brideRef}
            data-anim-key="bride"
            className="absolute inset-x-0 top-[8%] h-[42%] pointer-events-none"
          />

          {/* Điểm neo quan sát cuộn cho hàng dưới (Chú rể) */}
          <div
            ref={groomRef}
            data-anim-key="groom"
            className="absolute inset-x-0 top-[52%] h-[42%] pointer-events-none"
          />

          {/* Khung ảnh trên (Cô dâu): Nghiêng -10.6 độ, góc dưới bên phải đè lên góc trên bên trái của ảnh dưới (z-20) */}
          <div
            className="absolute left-[-2.1%] top-[8.4%] w-[53.9%] aspect-[202/207] bg-white p-[9px] sm:p-[11px] shadow-[0_6px_20px_rgba(0,0,0,0.12)] z-20"
            style={{
              transform: inView.bride
                ? 'translateX(0px) rotate(-10.6deg)'
                : 'translateX(-48px) rotate(-14deg)',
              opacity: inView.bride ? 1 : 0,
              transition:
                'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={bridePhotoSrc}
                alt="Cô dâu Thanh Nga"
                fill
                sizes="(max-width: 500px) 270px, 290px"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Context Cô dâu / THANH NGA: Hiệu ứng kéo từ bên phải sang */}
          <div
            className="absolute left-[55.5%] top-[14.8%] w-[41.5%] flex flex-col items-center text-center z-20"
            style={{
              transform: inView.bride ? 'translateX(0px)' : 'translateX(84px)',
              opacity: inView.bride ? 1 : 0,
              transition:
                'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, opacity 0.85s ease-out 0.1s',
            }}
          >
            {/* Nét chữ Cô dâu chuẩn mẫu với vòng lượn chữ C bên trái */}
            <div className="relative w-[122px] sm:w-[136px] aspect-[102/40] -ml-2">
              <Image
                src="/images/calligraphy-co-dau.png?v=2"
                alt="Cô dâu"
                fill
                unoptimized
                sizes="140px"
                className="object-contain"
              />
            </div>
            <p className="text-[23px] sm:text-[26px] font-normal tracking-[0.03em] uppercase text-[#928362] mt-1 whitespace-nowrap">
              THANH NGA
            </p>
          </div>

          {/* Context Chú rể / ANH LINH: Hiệu ứng kéo từ bên trái sang */}
          <div
            className="absolute left-[2.5%] top-[61.2%] w-[40.5%] flex flex-col items-center text-center z-20"
            style={{
              transform: inView.groom ? 'translateX(0px)' : 'translateX(-84px)',
              opacity: inView.groom ? 1 : 0,
              transition:
                'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, opacity 0.85s ease-out 0.1s',
            }}
          >
            {/* Nét chữ Chú rể chuẩn mẫu với vòng lượn chữ C bên trái */}
            <div className="relative w-[122px] sm:w-[136px] aspect-[102/40] -ml-1">
              <Image
                src="/images/calligraphy-chu-re.png?v=2"
                alt="Chú rể"
                fill
                unoptimized
                sizes="140px"
                className="object-contain"
              />
            </div>
            <p className="text-[23px] sm:text-[26px] font-normal tracking-[0.03em] uppercase text-[#928362] mt-1 whitespace-nowrap">
              ANH LINH
            </p>
          </div>

          {/* Khung ảnh dưới (Chú rể & Cô dâu): Nghiêng +10.5 độ, nằm dưới góc dưới-phải của ảnh trên (z-10) */}
          <div
            className="absolute left-[44.9%] top-[45.7%] w-[54.1%] aspect-[203/211] bg-white p-[9px] sm:p-[11px] shadow-[0_6px_20px_rgba(0,0,0,0.12)] z-10"
            style={{
              transform: inView.groom
                ? 'translateX(0px) rotate(10.5deg)'
                : 'translateX(48px) rotate(14deg)',
              opacity: inView.groom ? 1 : 0,
              transition:
                'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={couplePhotoSrc}
                alt="Chú rể Anh Linh & Cô dâu Thanh Nga"
                fill
                sizes="(max-width: 500px) 280px, 300px"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* 4. Phần ngay bên dưới: Lời nhắn 3 dòng + Đôi nhẫn cưới nối dây + Lịch December đánh dấu trái tim ngày 21 */}
        <div className="w-full flex flex-col items-center mt-5 sm:mt-6">
          {/* Lời nhắn 3 dòng & Hình vẽ đôi nhẫn cưới nối dây */}
          <div
            ref={ringsQuoteRef}
            data-anim-key="ringsQuote"
            className="w-full flex flex-col items-center"
          >
            <div
              className="w-full max-w-[380px] text-center px-4 mb-5 sm:mb-6"
              style={{
                transform: inView.ringsQuote ? 'translateY(0px)' : 'translateY(32px)',
                opacity: inView.ringsQuote ? 1 : 0,
                transition:
                  'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
              }}
            >
              <p className="text-[13px] sm:text-[14.5px] font-normal leading-[1.7] text-[#928362]">
                Hôm nay là ngày chúng mình cùng nắm tay
                <br />
                bước vào hành trình mới hành trình
                <br />
                của yêu thương và sẻ chia.
              </p>
            </div>

            {/* Hình vẽ vector SVG đôi nhẫn cưới với sợi dây uốn lượn tràn 2 mép sắc nét tuyệt đối */}
            <div
              className="relative w-full aspect-[378/64] my-1 sm:my-2"
              style={{
                transform: inView.ringsQuote ? 'scale(1)' : 'scale(0.95)',
                opacity: inView.ringsQuote ? 1 : 0,
                transition:
                  'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, opacity 0.9s ease-out 0.15s',
              }}
            >
              <svg
                viewBox="0 0 378 64"
                className="w-full h-full text-[#928362] overflow-visible"
                fill="none"
                aria-label="Nhẫn cưới"
              >
                {/* 1. Nhẫn bên trái (nằm ngang, lồng phía sau nhẫn phải) */}
                {/* Vành trên phía sau của nhẫn trái */}
                <path
                  d="M 131 21 C 133 11, 160 6.5, 179 10.5"
                  stroke="currentColor"
                  strokeWidth="0.78"
                  strokeLinecap="round"
                />
                {/* Vành trước trên & thành dưới của nhẫn trái */}
                <path
                  d="M 131 20 C 139 28.5, 158 31, 174.5 29"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                {/* Lòng trong phía sau của nhẫn trái */}
                <path
                  d="M 140 25.5 C 151 22.5, 164 22, 173.5 23"
                  stroke="currentColor"
                  strokeWidth="0.68"
                  strokeLinecap="round"
                />
                {/* Cạnh trái và đáy nhẫn trái nối vào nút thắt dây */}
                <path
                  d="M 131 20.5 C 129.5 29, 130 37, 136 41.5 C 144 47.5, 164 49, 178 46"
                  stroke="currentColor"
                  strokeWidth="0.78"
                  strokeLinecap="round"
                />

                {/* 2. Nhẫn bên phải (nghiêng ~24 độ, lồng vào nhẫn trái) */}
                {/* Vành ngoài phía trên-phải của nhẫn phải */}
                <path
                  d="M 174.5 16 C 181 5.5, 202 4, 222 12.5 C 240 20, 248 34.5, 242.5 45.5"
                  stroke="currentColor"
                  strokeWidth="0.82"
                  strokeLinecap="round"
                />
                {/* Vành elip lòng trong của nhẫn phải */}
                <path
                  d="M 180 15.5 C 185 8.5, 203 8.5, 220 16.5 C 236 24, 242 35.5, 236.5 41.5 C 231 47, 212 43, 196 34 C 182 26, 177 19.5, 180 15.5 Z"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Cạnh lòng trong phía trên của nhẫn phải (tạo độ dày thành trong) */}
                <path
                  d="M 181.5 16.5 C 193 14.5, 211 18.5, 225 26.5 C 233 31, 236.5 36.5, 236 40.5"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                />
                {/* Đáy ngoài phía dưới-trái của nhẫn phải */}
                <path
                  d="M 174.5 16 C 171 25, 178 39, 196 47.5 C 214 56, 235 55.5, 242.5 45.5"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />

                {/* 3. Sợi dây uốn lượn bên trái (3 vòng xoắn mềm mại tràn sát mép trái) */}
                <path
                  d="M 0 51.5 C 10 56.5, 24 57, 38 51.5 C 52 46, 68 47, 68 53.5 C 68 58.5, 63 58.5, 63.5 53 C 64 46, 82 44.5, 98 51.5 C 114 58.5, 134 59, 135 50.5 C 135.5 45.5, 130 45.5, 130.5 50.5 C 131.5 58, 155 59, 171 50.5 C 179 46, 185 41, 182.5 40 C 180 39, 177.5 43.5, 180.5 45.5"
                  stroke="currentColor"
                  strokeWidth="0.72"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 4. Sợi dây uốn lượn bên phải (3 vòng xoắn mềm mại tràn sát mép phải) */}
                <path
                  d="M 239 42.5 C 240.5 46, 236 50.5, 232.5 49 C 229.5 47.5, 232.5 44, 237.5 45.5 C 248 48.5, 260 56.5, 275 56 C 289 55.5, 294.5 47.5, 292.5 42 C 291 38.5, 287 40.5, 288.5 46.5 C 290.5 54.5, 304 57.5, 318 53 C 333 48, 353 47.5, 354 54 C 354.5 59, 349.5 59, 350 53.5 C 350.5 48.5, 365 49.5, 378 55"
                  stroke="currentColor"
                  strokeWidth="0.72"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Cụm Lịch December */}
          <div
            ref={calendarRef}
            data-anim-key="calendar"
            className="w-full flex flex-col items-center px-6 sm:px-8 mt-5 sm:mt-6"
          >
            {/* Tiêu đề tháng December */}
            <h3
              className={`${imperialScript.className} text-[54px] sm:text-[62px] leading-[0.95] text-[#928362] font-normal mb-5 sm:mb-6`}
              style={{
                transform: inView.calendar ? 'translateY(0px)' : 'translateY(28px)',
                opacity: inView.calendar ? 1 : 0,
                transition:
                  'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s ease-out',
              }}
            >
              December
            </h3>

            {/* Bảng lịch: Thứ trong tuần (MON -> SUN) */}
            <div
              className="grid grid-cols-7 w-full max-w-[360px] sm:max-w-[385px] text-center mb-3.5 sm:mb-4"
              style={{
                WebkitTextStroke: '0.2px currentColor',
                transform: inView.calendar ? 'translateY(0px)' : 'translateY(24px)',
                opacity: inView.calendar ? 1 : 0,
                transition:
                  'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, opacity 0.85s ease-out 0.1s',
              }}
            >
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="text-[12.5px] sm:text-[14px] font-bold tracking-[0.02em] uppercase text-[#928362]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Điểm neo quan sát cuộn tới dòng ngày 21 để kích hoạt hiệu ứng hiện trái tim */}
            <div
              ref={heartRef}
              data-anim-key="heart"
              className="grid grid-cols-7 w-full max-w-[360px] sm:max-w-[385px] text-center gap-y-3.5 sm:gap-y-4"
              style={{
                WebkitTextStroke: '0.16px currentColor',
                transform: inView.calendar ? 'translateY(0px)' : 'translateY(26px)',
                opacity: inView.calendar ? 1 : 0,
                transition:
                  'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1) 0.18s, opacity 0.85s ease-out 0.18s',
              }}
            >
              {CALENDAR_DAYS.map((date) => {
                const isWeddingDay = date === 21;
                return (
                  <div
                    key={date}
                    className="relative flex items-center justify-center h-[28px] sm:h-[32px] text-[13.5px] sm:text-[15px] font-medium text-[#928362]"
                  >
                    <span className="relative z-10">{date}</span>

                    {/* Trái tim đánh dấu ngày 21: Khi vuốt xuống đến sẽ hiện ra và vẽ nét quanh số 21 */}
                    {isWeddingDay && (
                      <div
                        className={`
                          pointer-events-none absolute inset-0 flex items-center justify-center
                          ${inView.heart ? 'animate-heart-appear' : 'opacity-0 scale-50'}
                        `}
                      >
                        <svg
                          viewBox="0 0 48 44"
                          className="w-[40px] h-[37px] sm:w-[44px] sm:h-[40px] text-[#928362]/75 overflow-visible"
                          fill="none"
                          aria-label="Ngày cưới 21/12"
                        >
                          {/* Nét vẽ trái tim bầu bĩnh đúng chuẩn ảnh mẫu */}
                          <path
                            d="M24 39.5 C21 37, 5 27.5, 5 15 C5 7.8, 10.6 3.5, 16.8 3.5 C20.4 3.5, 22.8 5.4, 24 7.6 C25.2 5.4, 27.6 3.5, 31.2 3.5 C37.4 3.5, 43 7.8, 43 15 C43 27.5, 27 37, 24 39.5 Z"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              strokeDasharray: 135,
                              strokeDashoffset: inView.heart ? 0 : 135,
                              transition:
                                'stroke-dashoffset 2.6s cubic-bezier(0.35, 0, 0.25, 1) 0.3s',
                            }}
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


