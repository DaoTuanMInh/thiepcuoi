'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Cormorant_Infant, Pinyon_Script } from 'next/font/google';

const cormorantInfant = Cormorant_Infant({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
});

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

interface Slide1HeroProps {
  guestName?: string;
}

export default function Slide1Hero({ guestName }: Slide1HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [namesVisible, setNamesVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gateOpenedRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    // If gate was already opened in this session
    if (typeof window !== 'undefined' && (window as any).__weddingGateOpened) {
      gateOpenedRef.current = true;
      setNamesVisible(true);
      return;
    }

    // STRICT: Only animate WHEN the user taps to open the gate
    const handleGateOpening = () => {
      gateOpenedRef.current = true;
      // Wait 380ms as the curtains part to reveal the velvet heart, then start sliding up!
      setTimeout(() => {
        setNamesVisible(true);
      }, 380);
    };

    const handleGateRemoved = () => {
      gateOpenedRef.current = true;
      setNamesVisible(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('wedding-gate-opening', handleGateOpening);
      window.addEventListener('wedding-gate-removed', handleGateRemoved);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('wedding-gate-opening', handleGateOpening);
        window.removeEventListener('wedding-gate-removed', handleGateRemoved);
      }
    };
  }, []);

  // Re-trigger animation when the user scrolls back into Slide 1 (ONLY after gate has opened!)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // STRICT: Do NOT trigger while the gate is still closed before user touches it!
          if (!gateOpenedRef.current) return;

          if (entry.isIntersecting) {
            setNamesVisible(true);
          } else if (entry.boundingClientRect.top > 120) {
            // Reset state when user scrolls down away from Slide 1 so scrolling back replays it
            setNamesVisible(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center bg-[#FFFAF4] pt-2 pb-0 select-none overflow-x-hidden"
    >
      {/* Slide Container: Perfectly sized and centered for mobile & desktop */}
      <div
        className={`relative w-full max-w-[450px] mx-auto transition-all duration-1000 ease-out ${
          mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.99]'
        }`}
      >
        {/* Main Artwork: Toned wedding envelope with ruffled velvet heart and flowers */}
        <div className="relative w-full aspect-[682/1024] bg-[#FFFAF4] overflow-hidden">
          <Image
            src="/images/wedding-card-velvet-clean.png"
            alt="Thiệp cưới Xuân Tùng & Thuý Hiền"
            fill
            priority
            sizes="(max-width: 480px) 100vw, 450px"
            className="object-contain w-full h-full"
          />

          {/* Couple Names on Velvet Heart with prominent slide-up from bottom animation */}
          <div className="absolute top-[70.2%] left-0 right-0 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none z-10 px-4">
            {/* Line 1: Chú rể Xuân Tùng */}
            <div
              style={{
                opacity: namesVisible ? 1 : 0,
                transform: namesVisible
                  ? 'translate3d(0, 0, 0)'
                  : 'translate3d(0, 50px, 0)',
                filter: namesVisible ? 'blur(0px)' : 'blur(5px)',
                transition:
                  'opacity 1100ms ease-out 60ms, transform 1250ms cubic-bezier(0.16, 1, 0.3, 1) 60ms, filter 1000ms ease-out 60ms',
                textShadow:
                  '0 2px 10px rgba(45, 8, 16, 0.85), 0 1px 4px rgba(0, 0, 0, 0.7)',
                willChange: 'transform, opacity, filter',
              }}
              className={`${pinyonScript.className} text-white text-[30px] min-[390px]:text-[34px] sm:text-[37px] leading-[1.12] tracking-[0.01em] select-none`}
            >
              Xuân Tùng
            </div>

            {/* Line 2: Cô dâu Thuý Hiền */}
            <div
              style={{
                opacity: namesVisible ? 1 : 0,
                transform: namesVisible
                  ? 'translate3d(0, 0, 0)'
                  : 'translate3d(0, 50px, 0)',
                filter: namesVisible ? 'blur(0px)' : 'blur(5px)',
                transition:
                  'opacity 1100ms ease-out 240ms, transform 1250ms cubic-bezier(0.16, 1, 0.3, 1) 240ms, filter 1000ms ease-out 240ms',
                textShadow:
                  '0 2px 10px rgba(45, 8, 16, 0.85), 0 1px 4px rgba(0, 0, 0, 0.7)',
                willChange: 'transform, opacity, filter',
              }}
              className={`${pinyonScript.className} text-white text-[30px] min-[390px]:text-[34px] sm:text-[37px] leading-[1.12] tracking-[0.01em] select-none`}
            >
              Thuý Hiền
            </div>
          </div>
        </div>

        {/* Long content written directly in HTML text with original elegant serif typography */}
        <div className="w-full px-6 pt-5 pb-3 text-center bg-[#FFFAF4]">
          <p
            className={`${cormorantInfant.className} text-[14.5px] sm:text-[15.5px] text-[#8F3047] italic font-medium leading-[1.85] tracking-[0.01em]`}
          >
            Từ những ngày đầu gặp gỡ, chúng tôi đã cùng nhau vun đắp nên một tình yêu đẹp.
            Giờ đây, chúng tôi mong được cùng {guestName || 'Quý khách'} chia sẻ niềm vui
            và chứng kiến khoảnh khắc ý nghĩa khi hai trái tim chính thức chung một hành trình.
          </p>
        </div>
      </div>
      {/* Seamless transition into Slide 2 */}
      <div className="w-full h-4 bg-[#FFFAF4]" />
    </section>
  );
}
