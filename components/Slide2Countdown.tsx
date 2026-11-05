'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Pinyon_Script, Prata } from 'next/font/google';

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

const prata = Prata({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

interface Slide2CountdownProps {
  targetDate?: string;
  photoUrl?: string;
  side?: 'nha-trai' | 'nha-gai';
}

function getInitialTimeLeft(targetIso: string) {
  const target = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const distance = target - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export default function Slide2Countdown({
  targetDate,
  photoUrl = '/images/slide2-wedding-meadow.jpg',
  side = 'nha-gai',
}: Slide2CountdownProps) {
  // Xác định ngày đếm ngược chính xác theo giờ Việt Nam (UTC+7):
  // Nhà Gái: 9:30 ngày 29.11.2026
  // Nhà Trai: 16:30 ngày 29.11.2026
  const finalTargetDate =
    targetDate ||
    (side === 'nha-trai'
      ? '2026-11-29T16:30:00+07:00'
      : '2026-11-29T09:30:00+07:00');

  const [timeLeft, setTimeLeft] = useState(() => getInitialTimeLeft(finalTargetDate));

  useEffect(() => {
    const target = new Date(finalTargetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [finalTargetDate]);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#FFFAF4] pt-4 pb-14 select-none overflow-x-hidden">
      <div className="relative w-full max-w-[450px] mx-auto flex flex-col items-center text-center">
        {/* Title: Ngày tình yêu đơm hoa... */}
        <div className="w-full px-4 flex flex-col items-center overflow-visible">
          <h2
            className={`${pinyonScript.className} text-[29px] min-[390px]:text-[33px] sm:text-[40px] text-[#8F3047] leading-[1.25] py-1 mb-4 sm:mb-5 tracking-[0.01em] text-center max-w-full select-none`}
          >
            Ngày tình yêu đơm hoa...
          </h2>

          {/* 4 Countdown Boxes */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mb-7 sm:mb-8">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="w-[58px] h-[58px] sm:w-[66px] sm:h-[66px] bg-[#A83F55] rounded-2xl flex items-center justify-center shadow-[0_4px_14px_rgba(168,63,85,0.25)] transition-transform hover:scale-105">
                <span
                  suppressHydrationWarning
                  className={`${prata.className} text-white text-[30px] sm:text-[34px] leading-none`}
                >
                  {format(timeLeft.days)}
                </span>
              </div>
              <span
                className={`${prata.className} text-[13px] sm:text-[14px] text-[#8F3047] tracking-wider mt-1.5`}
              >
                Ngày
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="w-[58px] h-[58px] sm:w-[66px] sm:h-[66px] bg-[#A83F55] rounded-2xl flex items-center justify-center shadow-[0_4px_14px_rgba(168,63,85,0.25)] transition-transform hover:scale-105">
                <span
                  suppressHydrationWarning
                  className={`${prata.className} text-white text-[30px] sm:text-[34px] leading-none`}
                >
                  {format(timeLeft.hours)}
                </span>
              </div>
              <span
                className={`${prata.className} text-[13px] sm:text-[14px] text-[#8F3047] tracking-wider mt-1.5`}
              >
                Giờ
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="w-[58px] h-[58px] sm:w-[66px] sm:h-[66px] bg-[#A83F55] rounded-2xl flex items-center justify-center shadow-[0_4px_14px_rgba(168,63,85,0.25)] transition-transform hover:scale-105">
                <span
                  suppressHydrationWarning
                  className={`${prata.className} text-white text-[30px] sm:text-[34px] leading-none`}
                >
                  {format(timeLeft.minutes)}
                </span>
              </div>
              <span
                className={`${prata.className} text-[13px] sm:text-[14px] text-[#8F3047] tracking-wider mt-1.5`}
              >
                Phút
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="w-[58px] h-[58px] sm:w-[66px] sm:h-[66px] bg-[#A83F55] rounded-2xl flex items-center justify-center shadow-[0_4px_14px_rgba(168,63,85,0.25)] transition-transform hover:scale-105">
                <span
                  suppressHydrationWarning
                  className={`${prata.className} text-white text-[30px] sm:text-[34px] leading-none`}
                >
                  {format(timeLeft.seconds)}
                </span>
              </div>
              <span
                className={`${prata.className} text-[13px] sm:text-[14px] text-[#8F3047] tracking-wider mt-1.5`}
              >
                Giây
              </span>
            </div>
          </div>
        </div>

        {/* Couple Photo: Tỷ lệ 1024/683 giữ trọn vẹn 100% toàn cảnh cô dâu & chú rể và tà váy dài */}
        <div className="relative w-full aspect-[1024/683] overflow-hidden bg-[#FFFAF4]">
          <Image
            src={photoUrl}
            alt="Ảnh cưới cô dâu & chú rể"
            fill
            unoptimized
            sizes="(max-width: 480px) 100vw, 450px"
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
