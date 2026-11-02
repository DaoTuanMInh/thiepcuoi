'use client';

import React from 'react';
import Image from 'next/image';
import { Great_Vibes, Cormorant_Garamond, Playfair_Display } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
});

const playfair = Playfair_Display({
  weight: ['500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
});

// Helper component thay thế chữ 'Q' bằng font Playfair Display thanh thoát, gọn gàng, không bị đuôi dài quét xấu
function WithCleanQ({ children }: { children: string }) {
  const parts = children.split(/(Q)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === 'Q' ? (
          <span
            key={i}
            className={`${playfair.className} font-semibold inline-block text-[0.98em]`}
            style={{ marginRight: '0.01em', verticalAlign: 'baseline' }}
          >
            Q
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

interface Slide6ThankYouProps {
  photoUrl?: string;
  title?: string;
}

export default function Slide6ThankYou({
  photoUrl = '/images/thankyou-bg.jpg',
  title = 'Thank you',
}: Slide6ThankYouProps) {
  return (
    <section className="relative w-full aspect-[538/389] min-h-[340px] sm:min-h-[390px] flex flex-col justify-end overflow-hidden select-none">
      {/* 1. Background Couple Photo - Ảnh mới tươi sáng, độ nét cao */}
      <div className="absolute inset-0 z-0">
        <Image
          src={photoUrl}
          alt="Cảm ơn Quý Khách - Xuân Tùng & Thuý Hiền"
          fill
          priority
          sizes="(max-width: 480px) 100vw, 450px"
          className="object-cover w-full h-full"
        />

        {/* 2. Giảm độ đậm màn phủ tối: chuyển sang lớp phủ nhẹ nhàng để ảnh sáng rõ nét */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* 3. Text Overlay */}
      <div className="relative z-10 w-full px-4 sm:px-6 pb-5 sm:pb-6 flex flex-col items-center text-center text-white">
        {/* 'Thank you' calligraphy */}
        <h2
          className={`${greatVibes.className} text-[48px] sm:text-[58px] leading-tight text-white font-normal italic drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-1 sm:mb-2`}
        >
          {title}
        </h2>

        {/* 4 lines of gratitude: Giữ nguyên font Cormorant Garamond tuyệt đẹp, chỉ tinh chỉnh chữ Q gọn gàng */}
        <div className="max-w-[400px] mx-auto space-y-0.5">
          <p
            className={`${cormorantGaramond.className} text-[14px] sm:text-[15.5px] font-semibold text-white leading-[1.55] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]`}
          >
            <WithCleanQ>Cảm ơn Quý Khách đã dành tình cảm cho gia đình chúng tôi!</WithCleanQ>
          </p>
          <p
            className={`${cormorantGaramond.className} text-[13.5px] sm:text-[15px] font-semibold text-white/95 leading-[1.55] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]`}
          >
            <WithCleanQ>Sự hiện diện của Quý Khách chính là món quà ý nghĩa nhất,</WithCleanQ>
          </p>
          <p
            className={`${cormorantGaramond.className} text-[13.5px] sm:text-[15px] font-semibold text-white/95 leading-[1.55] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]`}
          >
            <WithCleanQ>gia đình chúng tôi vô cùng trân quý khi được cùng Quý Khách</WithCleanQ>
          </p>
          <p
            className={`${cormorantGaramond.className} text-[13.5px] sm:text-[15px] font-semibold text-white/95 leading-[1.55] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]`}
          >
            <WithCleanQ>chia sẻ niềm hạnh phúc trong ngày trọng đại này.</WithCleanQ>
          </p>
        </div>
      </div>
    </section>
  );
}

