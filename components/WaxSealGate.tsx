'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface WaxSealGateProps {
  onOpen?: () => void;
  autoOpenDelay?: number; // 0 = Do NOT auto-open (waits for guest to tap seal)
}

export default function WaxSealGate({
  onOpen,
  autoOpenDelay = 0,
}: WaxSealGateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onOpen) onOpen();

    if (typeof window !== 'undefined') {
      (window as any).__weddingGateOpened = true;
      window.dispatchEvent(new CustomEvent('wedding-gate-opening'));
    }

    // Remove from DOM only after the grand slow slide animation completes (3.7s)
    setTimeout(() => {
      setIsRemoved(true);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('wedding-gate-removed'));
      }
    }, 3700);
  };

  // Auto-open only if autoOpenDelay is explicitly set > 0
  useEffect(() => {
    if (autoOpenDelay && autoOpenDelay > 0) {
      const timer = setTimeout(() => {
        handleOpen();
      }, autoOpenDelay);
      return () => clearTimeout(timer);
    }
  }, [autoOpenDelay]);

  // Keep body overflow hidden during the ENTIRE animation and ensure page starts firmly at top on reload
  useEffect(() => {
    // 1. Force browser scrollRestoration to manual
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }

    document.body.style.overflow = 'hidden';

    // 2. Firmly pin scroll to top across initial paint frames to counteract delayed browser auto-scroll restoration
    const pinTop = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };
    pinTop();
    const t1 = setTimeout(pinTop, 50);
    const t2 = setTimeout(pinTop, 150);
    const t3 = setTimeout(pinTop, 350);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      onClick={handleOpen}
      onTouchStart={handleOpen}
      onWheel={handleOpen}
      className={`fixed inset-0 z-[100] overflow-hidden select-none cursor-pointer ${
        isOpen ? 'pointer-events-none' : ''
      }`}
      aria-label="Cánh cửa mở thiệp cưới"
    >
      {/* ======================================================== */}
      {/* CÁNH CỬA BÊN TRÁI - Dạt sang trái từ từ, mở chậm dần */}
      {/* ======================================================== */}
      <div
        style={{
          backgroundImage: "url('/images/door_fabric_seamless.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '360px auto',
          backgroundColor: '#AF5364',
          transform: isOpen ? 'translate3d(-100%, 0, 0)' : 'translate3d(0, 0, 0)',
          WebkitTransform: isOpen ? 'translate3d(-100%, 0, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 3500ms cubic-bezier(0.35, 0.05, 0.15, 1)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        className="absolute top-0 bottom-0 left-0 w-1/2 h-full shadow-[inset_-8px_0_18px_rgba(0,0,0,0.18)] border-r border-white/10 z-10"
      />

      {/* ======================================================== */}
      {/* CÁNH CỬA BÊN PHẢI - Mang theo con dấu dạt sang phải chậm dần */}
      {/* ======================================================== */}
      <div
        style={{
          backgroundImage: "url('/images/door_fabric_seamless.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '360px auto',
          backgroundColor: '#AF5364',
          transform: isOpen ? 'translate3d(100%, 0, 0)' : 'translate3d(0, 0, 0)',
          WebkitTransform: isOpen ? 'translate3d(100%, 0, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 3500ms cubic-bezier(0.35, 0.05, 0.15, 1)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        className="absolute top-0 bottom-0 right-0 w-1/2 h-full shadow-[inset_8px_0_18px_rgba(0,0,0,0.18)] border-l border-white/10 z-20 flex items-center"
      >
        {/* Con dấu Song Hỷ đính chặt vào cánh cửa bên phải (không tan biến, trượt theo cánh phải) */}
        <div
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none flex flex-col items-center"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/95 p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105 animate-[pulse_3s_ease-in-out_infinite]">
            <Image
              src="/images/song_hy_seal.png"
              alt="Con dấu Song Hỷ"
              fill
              sizes="120px"
              className="object-contain p-1"
              priority
            />
          </div>

          {/* Dòng chữ mời mở thiệp dưới con dấu */}
          {!isOpen && (
            <div className="mt-4 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-[12px] sm:text-[13px] font-medium tracking-wider whitespace-nowrap shadow-lg animate-pulse flex items-center gap-1.5">
              <span>Chạm vào con dấu để mở thiệp</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
