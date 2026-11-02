'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Cormorant_Infant } from 'next/font/google';

const cormorantInfant = Cormorant_Infant({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
});

interface Slide1HeroProps {
  guestName?: string;
}

export default function Slide1Hero({ guestName }: Slide1HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#FFFAF4] pt-2 pb-0 select-none overflow-x-hidden">
      {/* Slide Container: Perfectly sized and centered for mobile & desktop */}
      <div
        className={`relative w-full max-w-[450px] mx-auto transition-all duration-1000 ease-out ${
          mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.99]'
        }`}
      >
        {/* Main Artwork: Toned wedding envelope with ruffled heart and flowers */}
        <div className="relative w-full aspect-[682/1024] bg-[#FFFAF4] overflow-hidden">
          <Image
            src="/images/wedding-card-toned.png"
            alt="Thiệp cưới Xuân Tùng & Thuý Hiền"
            fill
            priority
            unoptimized
            sizes="(max-width: 480px) 100vw, 450px"
            className="object-contain w-full h-full"
          />
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
