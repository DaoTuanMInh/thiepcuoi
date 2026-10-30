'use client';

import { useState, useEffect } from 'react';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({ 
  weight: ['400', '500', '600'], 
  subsets: ['latin'], 
});

interface CountdownProps {
  targetDate: string;
  compact?: boolean;
  className?: string;
}

export default function Countdown({ 
  targetDate, 
  compact = false,
  className = "" 
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate).getTime();
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTime());

    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  const format = (num: number) => num.toString().padStart(2, '0');

  // Compact layout designed specifically for the deckle-edge wedding card
  if (compact) {
    const daysStr = mounted ? format(timeLeft.days) : '00';
    const hoursStr = mounted ? format(timeLeft.hours) : '00';
    const minStr = mounted ? format(timeLeft.minutes) : '00';
    const secStr = mounted ? format(timeLeft.seconds) : '00';

    return (
      <div 
        suppressHydrationWarning 
        className={`flex items-center justify-center gap-1 sm:gap-1.5 text-[#928362] select-none ${className}`}
      >
        <div className="flex flex-col items-center min-w-[26px] sm:min-w-[32px]">
          <span className={`${cormorant.className} text-[16px] sm:text-[20px] md:text-[22px] font-semibold leading-none text-[#928362]`}>
            {daysStr}
          </span>
          <span className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] uppercase font-serif tracking-wider text-[#928362]/90 mt-0.5 sm:mt-1">
            Ngày
          </span>
        </div>
        
        <span className="text-[13px] sm:text-[15px] font-serif leading-none -mt-3 sm:-mt-3.5 opacity-70">:</span>
        
        <div className="flex flex-col items-center min-w-[26px] sm:min-w-[32px]">
          <span className={`${cormorant.className} text-[16px] sm:text-[20px] md:text-[22px] font-semibold leading-none text-[#928362]`}>
            {hoursStr}
          </span>
          <span className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] uppercase font-serif tracking-wider text-[#928362]/90 mt-0.5 sm:mt-1">
            Giờ
          </span>
        </div>
        
        <span className="text-[13px] sm:text-[15px] font-serif leading-none -mt-3 sm:-mt-3.5 opacity-70">:</span>
        
        <div className="flex flex-col items-center min-w-[26px] sm:min-w-[32px]">
          <span className={`${cormorant.className} text-[16px] sm:text-[20px] md:text-[22px] font-semibold leading-none text-[#928362]`}>
            {minStr}
          </span>
          <span className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] uppercase font-serif tracking-wider text-[#928362]/90 mt-0.5 sm:mt-1">
            Phút
          </span>
        </div>
        
        <span className="text-[13px] sm:text-[15px] font-serif leading-none -mt-3 sm:-mt-3.5 opacity-70">:</span>
        
        <div className="flex flex-col items-center min-w-[26px] sm:min-w-[32px]">
          <span className={`${cormorant.className} text-[16px] sm:text-[20px] md:text-[22px] font-semibold leading-none text-[#928362]`}>
            {secStr}
          </span>
          <span className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] uppercase font-serif tracking-wider text-[#928362]/90 mt-0.5 sm:mt-1">
            Giây
          </span>
        </div>
      </div>
    );
  }

  // Default layout for other sections
  if (!mounted) {
    return (
      <div suppressHydrationWarning className={`flex gap-2 text-[#928362] items-start justify-center mt-2 mb-4 ${className}`}>
        <div className="flex flex-col items-center w-12"><span className={`${cormorant.className} text-3xl md:text-4xl leading-none`}>00</span><span className="text-[10px] uppercase mt-2 font-sans tracking-widest text-[#928362]">Ngày</span></div>
        <span className="text-2xl pt-1">:</span>
        <div className="flex flex-col items-center w-12"><span className={`${cormorant.className} text-3xl md:text-4xl leading-none`}>00</span><span className="text-[10px] uppercase mt-2 font-sans tracking-widest text-[#928362]">Giờ</span></div>
        <span className="text-2xl pt-1">:</span>
        <div className="flex flex-col items-center w-12"><span className={`${cormorant.className} text-3xl md:text-4xl leading-none`}>00</span><span className="text-[10px] uppercase mt-2 font-sans tracking-widest text-[#928362]">Phút</span></div>
        <span className="text-2xl pt-1">:</span>
        <div className="flex flex-col items-center w-12"><span className={`${cormorant.className} text-3xl md:text-4xl leading-none`}>00</span><span className="text-[10px] uppercase mt-2 font-sans tracking-widest text-[#928362]">Giây</span></div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className={`flex gap-1 md:gap-2 text-[#928362] items-start justify-center mt-2 mb-4 ${className}`}>
      <div className="flex flex-col items-center w-10 md:w-12"><span className={`${cormorant.className} text-3xl md:text-4xl leading-none`}>{format(timeLeft.days)}</span><span className="text-[10px] uppercase mt-2 font-sans tracking-widest text-[#928362]">Ngày</span></div>
      <span className="text-2xl pt-1">:</span>
      <div className="flex flex-col items-center w-10 md:w-12"><span className={`${cormorant.className} text-3xl md:text-4xl leading-none`}>{format(timeLeft.hours)}</span><span className="text-[10px] uppercase mt-2 font-sans tracking-widest text-[#928362]">Giờ</span></div>
      <span className="text-2xl pt-1">:</span>
      <div className="flex flex-col items-center w-10 md:w-12"><span className={`${cormorant.className} text-3xl md:text-4xl leading-none`}>{format(timeLeft.minutes)}</span><span className="text-[10px] uppercase mt-2 font-sans tracking-widest text-[#928362]">Phút</span></div>
      <span className="text-2xl pt-1">:</span>
      <div className="flex flex-col items-center w-10 md:w-12"><span className={`${cormorant.className} text-3xl md:text-4xl leading-none`}>{format(timeLeft.seconds)}</span><span className="text-[10px] uppercase mt-2 font-sans tracking-widest text-[#928362]">Giây</span></div>
    </div>
  );
}
