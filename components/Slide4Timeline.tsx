'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Great_Vibes, Lora } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

const lora = Lora({
  weight: ['400', '500'],
  subsets: ['latin', 'vietnamese'],
});

interface Slide4TimelineProps {
  imageSrc?: string;
}

export default function Slide4Timeline({
  imageSrc = 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
}: Slide4TimelineProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.85) {
            setIsInView(false);
          }
        });
      },
      {
        threshold: 0.22,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const timelineEvents = [
    {
      time: '11:30',
      title: 'ĐÓN KHÁCH',
      delay: '0.15s',
      icon: (
        /* Sketch Vintage Camera with Top-Right Flash */
        <svg
          viewBox="0 0 68 54"
          className="w-[52px] h-[42px] sm:w-[58px] sm:h-[46px] text-white fill-none stroke-current drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Top-right flash cube */}
          <rect x="44" y="3" width="13" height="10" rx="1" />
          <rect x="46.5" y="5" width="8" height="6" rx="0.5" strokeWidth="1.15" />
          <line x1="48" y1="13" x2="48" y2="16" />
          <line x1="53" y1="13" x2="53" y2="16" />
          {/* Top-left shutter button */}
          <path d="M13 16v-2.5h8V16" />
          {/* Camera body outer & inner top bar */}
          <rect x="6" y="16" width="52" height="33" rx="2" />
          <line x1="6" y1="20.5" x2="58" y2="20.5" strokeWidth="1.2" />
          {/* Left & right vintage grip curves */}
          <path d="M6 25c4.5 1 6.5 4.5 6.5 9.5S10.5 43 6 44" strokeWidth="1.25" />
          <path d="M58 25c-4.5 1-6.5 4.5-6.5 9.5S53.5 43 58 44" strokeWidth="1.25" />
          <circle cx="9.5" cy="34.5" r="1.2" />
          <circle cx="54.5" cy="34.5" r="1.2" />
          {/* Concentric camera lens */}
          <circle cx="32" cy="33.5" r="11" />
          <circle cx="32" cy="33.5" r="8.2" strokeWidth="1.2" />
          <circle cx="32" cy="33.5" r="5.5" strokeWidth="1.1" />
          <path d="M28.5 30a4.5 4.5 0 0 1 5-1" strokeWidth="1.1" />
          {/* Small viewfinder */}
          <rect x="44" y="22.5" width="5.5" height="3.5" rx="0.8" strokeWidth="1.15" />
        </svg>
      ),
    },
    {
      time: '12:00',
      title: 'KHAI TIỆC',
      delay: '0.3s',
      icon: (
        /* Sketch Plate with Fork on Left & Knife/Spoon on Right */
        <svg
          viewBox="0 0 68 50"
          className="w-[52px] h-[38px] sm:w-[58px] sm:h-[42px] text-white fill-none stroke-current drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Left Fork */}
          <path d="M9 11v9.5c0 2.2 1.4 3.5 2.8 3.5s2.8-1.3 2.8-3.5V11" />
          <line x1="11.8" y1="11" x2="11.8" y2="19" />
          <path d="M11.2 24v16.5c0 1 .6 1.5 1.2 1.5s1.2-.5 1.2-1.5V24" />
          {/* Center Sketch Plate (double organic rings) */}
          <circle cx="33" cy="26" r="15.5" />
          <circle cx="33" cy="26" r="11.5" strokeWidth="1.2" />
          <path d="M21 16.5a15.5 15.5 0 0 1 21.5-1" strokeWidth="1.1" />
          <path d="M24 37.5a14.5 14.5 0 0 0 19-1.5" strokeWidth="1.1" />
          {/* Right Knife */}
          <path d="M52.5 11c-1.8 2.5-2.2 7.5-2.2 12.5h2.2V40c0 .9.5 1.5 1.1 1.5s1.1-.6 1.1-1.5V11h-2.2z" />
          {/* Far-Right Spoon */}
          <ellipse cx="59.5" cy="16" rx="2.6" ry="5" />
          <path d="M59.5 21v19c0 .8.4 1.3.9 1.3" />
        </svg>
      ),
    },
    {
      time: '13:00',
      title: 'AFTER PARTY',
      delay: '0.45s',
      icon: (
        /* Detailed Sketch Wedding Flower Bouquet */
        <svg
          viewBox="0 0 68 62"
          className="w-[52px] h-[48px] sm:w-[58px] sm:h-[52px] text-white fill-none stroke-current drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Central & surrounding rose blooms */}
          <circle cx="34" cy="23" r="6.5" />
          <path d="M31.5 22.5c1-1.8 3.5-1.8 4.5 0s-.8 3.8-2.5 3.2-2.5-2-2-3.2z" />
          <circle cx="24" cy="20" r="5.2" />
          <path d="M22 19.5c.8-1.4 2.8-1.4 3.5 0s-.6 2.8-2 2.4" />
          <circle cx="43.5" cy="20.5" r="5.2" />
          <path d="M41.5 20c.8-1.4 2.8-1.4 3.5 0s-.6 2.8-2 2.4" />
          <circle cx="28.5" cy="13" r="4.5" />
          <circle cx="39" cy="13.5" r="4.5" />
          <circle cx="26.5" cy="29" r="4.8" />
          <circle cx="41" cy="29" r="4.8" />
          {/* Delicate leaves & baby's breath sprigs */}
          <path d="M18.5 18c-3.5-1.5-5.5.5-4 3.5 1.5 2.5 4.5 2.5 6 1" />
          <path d="M49 18c3.5-1.5 5.5.5 4 3.5-1.5 2.5-4.5 2.5-6 1" />
          <path d="M21 28c-4 1-5 4-2 5.5s5.5-.5 6.5-2" />
          <path d="M46.5 28c4 1 5 4 2 5.5s-5.5-.5-6.5-2" />
          <path d="M33.5 8.5c0-3 2-4.5 3.5-2.5s-.5 4-2 4.5" />
          <path d="M23 11c-2-2.5-4-1.5-3 1s3 2.5 4.5 1.5" />
          <path d="M45 11c2-2.5 4-1.5 3 1s-3 2.5-4.5 1.5" />
          {/* Stems & Ribbon Bow */}
          <path d="M29.5 34.5L31 54" />
          <path d="M33 35v20" />
          <path d="M35.5 35v19.5" />
          <path d="M38 34.5L36.8 54" />
          {/* Ribbon knot & flowing tails */}
          <rect x="29.5" y="38.5" width="8.5" height="3.2" rx="1" />
          <path d="M30 41.5c-3.5 3-5.5 7-6 11" />
          <path d="M38 41.5c3.5 3 5.5 7 6 11" />
        </svg>
      ),
    },
  ];

  const dressCodeColors = [
    { hex: '#050505', label: 'Black', zIndex: 10 },
    { hex: '#FFFFFF', label: 'White', zIndex: 20 },
    { hex: '#F2E8CF', label: 'Cream', zIndex: 30 },
    { hex: '#E8CBB8', label: 'Blush', zIndex: 40 },
    { hex: '#8D6849', label: 'Mocha', zIndex: 50 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full aspect-[378/597] overflow-hidden select-none text-white antialiased"
    >
      {/* Background Photo */}
      <Image
        src={imageSrc}
        alt="Wedding Timeline & Dress Code"
        fill
        sizes="(max-width: 500px) 100vw, 500px"
        className="object-cover w-full h-full"
      />
      {/* Warm dark overlay matching reference tone */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      {/* Main Content Container - Lùi cụm nội dung từ Timeline đến Dress code xuống dưới */}
      <div className="relative z-10 w-full h-full flex flex-col justify-start pt-[25%] sm:pt-[27%] pb-[4%]">
        {/* 1. TOP HEADER: Left horizontal line + "Timeline" sliding from right to left up to the line */}
        <div className="relative w-full flex items-center mb-11 sm:mb-12">
          {/* Left horizontal line anchored at the left edge */}
          <div
            className="w-[34px] sm:w-[40px] h-[1.5px] bg-white/95 shrink-0"
            style={{
              opacity: isInView ? 1 : 0,
              transition: 'opacity 0.8s ease-out',
            }}
          />

          {/* "Timeline" text in Great Vibes */}
          <h2
            className={`${greatVibes.className} text-[50px] sm:text-[56px] leading-[0.9] tracking-[0.02em] text-white font-normal ml-2.5 whitespace-nowrap`}
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.45)',
              transform: isInView ? 'translateX(0px)' : 'translateX(95px)',
              opacity: isInView ? 1 : 0,
              transition:
                'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1) 0.05s, opacity 0.9s ease-out 0.05s',
            }}
          >
            Timeline
          </h2>
        </div>

        {/* 2. MIDDLE TIMELINE: Center vertical line + items sliding outward from the center line to both sides */}
        <div className="relative w-full py-2">
          {/* Center vertical spine at x = 44.5% matching reference image */}
          <div
            className="absolute top-1 bottom-1 left-[44.5%] w-[1.2px] bg-white/90"
            style={{
              transform: isInView ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0.2)',
              opacity: isInView ? 1 : 0,
              transformOrigin: 'center',
              transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease-out',
            }}
          />

          <div className="flex flex-col space-y-6 sm:space-y-7">
            {timelineEvents.map((item, idx) => (
              <div key={idx} className="relative w-full flex items-center min-h-[52px]">
                {/* Left Side (0% -> 44.5%): Icon sliding outward from the center line to the left */}
                <div className="w-[44.5%] pr-5 sm:pr-6 flex justify-end items-center overflow-hidden">
                  <div
                    style={{
                      transform: isInView ? 'translateX(0px)' : 'translateX(54px)',
                      opacity: isInView ? 1 : 0,
                      transition: `transform 1.15s cubic-bezier(0.22, 1, 0.36, 1) ${item.delay}, opacity 0.85s ease-out ${item.delay}`,
                    }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Center Dot dead-center on the vertical spine */}
                <div
                  className="absolute left-[44.5%] w-[8px] h-[8px] rounded-full bg-white shadow-[0_0_6px_rgba(0,0,0,0.35)] z-10"
                  style={{
                    transform: isInView
                      ? 'translateX(-50%) scale(1)'
                      : 'translateX(-50%) scale(0)',
                    opacity: isInView ? 1 : 0,
                    transition: `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${item.delay}, opacity 0.6s ease-out ${item.delay}`,
                  }}
                />

                {/* Right Side (44.5% -> 100%): Time & Title với nét mảnh vừa vặn (font-normal, không viền đậm) */}
                <div className="w-[55.5%] pl-5 sm:pl-6 flex flex-col items-start text-left overflow-hidden">
                  <div
                    className={`${lora.className} lining-nums flex flex-col items-start`}
                    style={{
                      transform: isInView ? 'translateX(0px)' : 'translateX(-54px)',
                      opacity: isInView ? 1 : 0,
                      transition: `transform 1.15s cubic-bezier(0.22, 1, 0.36, 1) ${item.delay}, opacity 0.85s ease-out ${item.delay}`,
                    }}
                  >
                    <span
                      className="text-[17px] sm:text-[18.5px] font-normal leading-tight tracking-[0.02em] text-white/95"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}
                    >
                      {item.time}
                    </span>
                    <span
                      className="text-[14px] sm:text-[15.5px] font-normal uppercase leading-snug tracking-[0.03em] text-white/95 mt-0.5"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. DRESS CODE HEADING: Tách độc lập với dải màu để giữ nguyên vị trí chuẩn */}
        <div className="w-full flex items-center justify-end pr-3.5 sm:pr-4 mt-11 sm:mt-12">
          <h2
            className={`${greatVibes.className} text-[48px] sm:text-[54px] leading-[0.9] tracking-[0.02em] text-white font-normal mr-3 whitespace-nowrap`}
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.45)',
              transform: isInView ? 'translateX(0px)' : 'translateX(-95px)',
              opacity: isInView ? 1 : 0,
              transition:
                'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.35s, opacity 0.9s ease-out 0.35s',
            }}
          >
            Dress code
          </h2>

          {/* Right horizontal line */}
          <div
            className="w-[40px] sm:w-[46px] h-[1.5px] bg-white/95 shrink-0 mt-1"
            style={{
              opacity: isInView ? 1 : 0,
              transition: 'opacity 0.8s ease-out 0.35s',
            }}
          />
        </div>

        {/* 4. DẢI MÀU (5 Overlapping Dress Code Color Swatches): Xuống dưới cùng */}
        <div
          className="w-full flex items-center pl-[27%] mt-auto pb-2 sm:pb-3"
          style={{
            transform: isInView ? 'translateY(0px)' : 'translateY(20px)',
            opacity: isInView ? 1 : 0,
            transition:
              'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1) 0.5s, opacity 0.85s ease-out 0.5s',
          }}
        >
          <div className="flex items-center -space-x-3 sm:-space-x-3.5">
            {dressCodeColors.map((swatch, idx) => (
              <div
                key={idx}
                title={swatch.label}
                className="w-[38px] h-[38px] sm:w-[44px] sm:h-[44px] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
                style={{
                  backgroundColor: swatch.hex,
                  zIndex: swatch.zIndex,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

