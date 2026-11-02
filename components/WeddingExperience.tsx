'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Slide1Hero from '@/components/Slide1Hero';
import Slide2Countdown from '@/components/Slide2Countdown';
import Slide3Invitation from '@/components/Slide3Invitation';
import Slide4Album from '@/components/Slide4Album';
import Slide5RSVP from '@/components/Slide5RSVP';
import Slide6ThankYou from '@/components/Slide6ThankYou';
import WaxSealGate from '@/components/WaxSealGate';
import AutoScrollController from '@/components/AutoScrollController';
import BackgroundMusic from '@/components/BackgroundMusic';

interface WeddingExperienceProps {
  side?: 'nha-trai' | 'nha-gai';
  guestName?: string;
}

function WeddingContent({
  side = 'nha-gai',
  guestName = '',
}: WeddingExperienceProps) {
  const searchParams = useSearchParams();

  // Mặc định luôn là Nhà Gái, chỉ khi có tham số hoặc đường dẫn Nhà Trai mới hiển thị Nhà Trai
  const sideQuery = searchParams.get('side')?.toLowerCase();
  let effectiveSide: 'nha-trai' | 'nha-gai' = side;
  if (sideQuery === 'trai' || sideQuery === 'nha-trai' || sideQuery === 'groom') {
    effectiveSide = 'nha-trai';
  } else if (sideQuery === 'gai' || sideQuery === 'nha-gai' || sideQuery === 'bride') {
    effectiveSide = 'nha-gai';
  }

  // Cho phép nhận tên khách mời từ URL query (?to=Tên+Khách)
  const toQuery = searchParams.get('to');
  const effectiveGuestName = toQuery || guestName;

  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Cổng mở thiệp đóng dấu sáp Song Hỷ */}
      <WaxSealGate />

      {/* Nhạc nền cưới và 3-4 icon nốt nhạc nháy góc trên cùng bên trái */}
      <BackgroundMusic />

      {/* Bộ điều khiển tự động cuộn mượt */}
      <AutoScrollController />

      {/* Khung thiệp chuẩn tỉ lệ di động thanh lịch */}
      <div className="w-full max-w-[430px] sm:max-w-[450px] mx-auto bg-[#FFFAF4] flex flex-col items-center shadow-2xl relative">
        {/* Slide 1: Bìa thiệp gối nhung đỏ & Tên CD-CR */}
        <Slide1Hero />

        {/* Slide 2: Đếm ngược ngày cưới & Ảnh thảo nguyên tình yêu */}
        <Slide2Countdown side={effectiveSide} />

        {/* Slide 3: Lời mời, thông tin 2 họ & 2 Ô Lễ Thành Hôn (bỏ bữa tiệc chung vui) */}
        <Slide3Invitation side={effectiveSide} />

        {/* Slide 4: Album ảnh cưới tuyệt đẹp */}
        <Slide4Album />

        {/* Slide 5: Form gửi lời chúc, xác nhận tham dự & Hộp mừng cưới QR */}
        <Slide5RSVP side={effectiveSide} guestName={effectiveGuestName} />

        {/* Slide 6: Lời cảm ơn chân thành từ Đôi Uyên Ương */}
        <Slide6ThankYou />
      </div>
    </main>
  );
}

export default function WeddingExperience(props: WeddingExperienceProps) {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#FFFAF4]" />}>
      <WeddingContent {...props} />
    </Suspense>
  );
}
