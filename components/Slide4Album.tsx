'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Pinyon_Script } from 'next/font/google';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

export interface AlbumPhoto {
  src: string;
  alt: string;
  caption?: string;
}

const DEFAULT_ALBUM_PHOTOS: AlbumPhoto[] = [
  {
    src: '/images/album_real_1.jpg',
    alt: 'Ảnh cưới Xuân Tùng & Thuý Hiền - Đọc lời thề nguyện hạnh phúc',
    caption: 'Trao nhau lời hẹn thề cùng đi qua năm tháng bình yên',
  },
  {
    src: '/images/album_real_2.jpg',
    alt: 'Ảnh cưới Xuân Tùng & Thuý Hiền - Nụ hôn dưới voan cưới',
    caption: 'Tình yêu bắt đầu từ những điều ngọt ngào và chân thành nhất',
  },
  {
    src: '/images/album_real_3.jpg',
    alt: 'Ảnh cưới Xuân Tùng & Thuý Hiền - Dạo bước dưới túp lều voan cưới',
    caption: 'Bên anh là bình yên, cùng nhau đi qua mọi nẻo đường',
  },
  {
    src: '/images/album_real_4.jpg',
    alt: 'Ảnh cưới Xuân Tùng & Thuý Hiền - Ánh nhìn say đắm yêu thương',
    caption: 'Nụ cười và ánh mắt trao nhau tình yêu bất tận',
  },
  {
    src: '/images/album_real_5.jpg',
    alt: 'Ảnh cưới Xuân Tùng & Thuý Hiền - Nâng tà váy cưới giữa thảo nguyên',
    caption: 'Em là nàng thơ, anh là chàng kỵ sĩ của cuộc đời em',
  },
  {
    src: '/images/album_real_6.jpg',
    alt: 'Ảnh cưới Xuân Tùng & Thuý Hiền - Cử chỉ ngọt ngào và cuốn sổ nguyện ước',
    caption: 'Tình yêu đong đầy trong từng ánh mắt và cử chỉ dịu dàng trao nhau',
  },
  {
    src: '/images/album_real_7.jpg',
    alt: 'Ảnh cưới Xuân Tùng & Thuý Hiền - Áo dài truyền thống tại tháp cổ',
    caption: 'Bình yên là khi có anh và em cùng sẻ chia mọi phút giây',
  },
  {
    src: '/images/album_real_8.jpg',
    alt: 'Ảnh cưới Xuân Tùng & Thuý Hiền - Duyên dáng bên cầu đá thiên nhiên',
    caption: 'Nguyện cùng nhau đi qua năm tháng, trọn vẹn nghĩa phu thê',
  },
];

interface Slide4AlbumProps {
  title?: string;
  photos?: AlbumPhoto[];
}

export default function Slide4Album({
  title = 'Album Of Love',
  photos = DEFAULT_ALBUM_PHOTOS,
}: Slide4AlbumProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger smooth "slide out from center" animation when user scrolls into Slide 4
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % photos.length
    );
  }, [photos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#AC4558] text-white pt-8 pb-14 select-none overflow-hidden"
    >
      <div className="relative w-full max-w-[450px] mx-auto px-3.5 sm:px-4 flex flex-col items-center">
        {/* Title: Album Of Love */}
        <h2
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -16px, 0)',
            transition: 'opacity 1200ms ease-out, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform, opacity',
          }}
          className={`${pinyonScript.className} text-[48px] sm:text-[58px] text-white text-center leading-[1.15] mb-5 sm:mb-7 tracking-wide drop-shadow-sm`}
        >
          {title}
        </h2>

        {/* 8 Photos Grid (2 columns x 4 rows) - Hiệu ứng trượt từ giữa ra 2 bên chậm rãi, êm ái */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-3.5">
          {photos.map((photo, index) => {
            const isLeft = index % 2 === 0;
            const rowIndex = Math.floor(index / 2);
            // Softer, slower cascade delay: 180ms per row
            const delay = rowIndex * 180;

            return (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                style={{
                  transform: isVisible
                    ? 'translate3d(0, 0, 0) scale(1)'
                    : isLeft
                    ? 'translate3d(42px, 0, 0) scale(0.94)'
                    : 'translate3d(-42px, 0, 0) scale(0.94)',
                  opacity: isVisible ? 1 : 0,
                  transition: `transform 1600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 1400ms ease-out ${delay}ms`,
                  willChange: 'transform, opacity',
                }}
                className="group relative w-full aspect-[3/4] overflow-hidden bg-black/15 shadow-[0_4px_16px_rgba(0,0,0,0.18)] cursor-pointer hover:scale-[1.025] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] active:scale-95"
              >
                {/* Photo Image - unoptimized giữ 100% độ sắc nét nguyên bản của file gốc */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 480px) 50vw, 300px"
                  className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover Dark Overlay + Zoom Icon */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-[#AC4558] flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-md">
                    <ZoomIn size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 transition-opacity animate-in fade-in duration-200 select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar: Counter & Close */}
          <div
            className="w-full max-w-4xl flex items-center justify-between text-white/80 z-10 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm font-medium tracking-wider">
              {lightboxIndex + 1} / {photos.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full hover:bg-white/10 active:scale-90 transition text-white hover:text-white/80 cursor-pointer"
              aria-label="Đóng ảnh"
            >
              <X size={26} />
            </button>
          </div>

          {/* Center: Image Display + Navigation Buttons */}
          <div
            className="relative w-full max-w-3xl flex-1 flex items-center justify-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:-left-12 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition active:scale-90 cursor-pointer"
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Main Lightbox Image - unoptimized giữ 100% độ sắc nét tuyệt đối khi phóng to toàn màn hình */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] max-h-[750px]">
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:-right-12 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition active:scale-90 cursor-pointer"
              aria-label="Ảnh kế tiếp"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Bottom Caption */}
          <div
            className="w-full max-w-xl text-center py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {photos[lightboxIndex].caption && (
              <p className="text-sm sm:text-base text-white/85 font-light tracking-wide italic">
                {photos[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
