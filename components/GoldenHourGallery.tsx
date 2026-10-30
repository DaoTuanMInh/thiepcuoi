'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Imperial_Script, Cormorant_Infant, Marcellus } from 'next/font/google';
import { X, ChevronLeft, ChevronRight, ZoomIn, Heart } from 'lucide-react';

const imperialScript = Imperial_Script({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
});

const cormorantInfant = Cormorant_Infant({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
});

export interface GalleryPhoto {
  src: string;
  alt: string;
  timeTag?: string;
  caption?: string;
}

const DEFAULT_PHOTOS: GalleryPhoto[] = [
  {
    src: '/images/album/01.jpg',
    alt: 'Golden Hour of Love - Lễ cưới ngọt ngào',
    caption: 'Khoảnh khắc trao lời hẹn ước trăm năm',
  },
  {
    src: '/images/album/02.jpg',
    alt: 'Nụ cười rạng rỡ của đôi uyên ương',
    caption: 'Những nụ cười bình yên bên nhau',
  },
  {
    src: '/images/album/03.jpg',
    alt: 'Pháo hoa giấy và nụ hôn hạnh phúc',
    caption: 'Tình yêu đong đầy trong từng ánh mắt',
  },
  {
    src: '/images/album/04.jpg',
    alt: 'Khăn voan bay trong gió biển',
    caption: 'Cùng nhau bước qua mọi thăng trầm',
  },
  {
    src: '/images/album/05.jpg',
    alt: 'Đôi bàn tay đan chặt',
    timeTag: '11:28',
    caption: 'Nắm tay nhau đi qua giông bão',
  },
  {
    src: '/images/album/06.jpg',
    alt: 'Chiếc nhẫn đính ước thiêng liêng',
    timeTag: '11:28',
    caption: 'Minh chứng cho lời hứa trọn đời',
  },
  {
    src: '/images/album/09.jpg',
    alt: 'Chú rể lịch lãm bước tới hạnh phúc',
    timeTag: '11:29',
    caption: 'Ngày trọng đại nhất đời mình',
  },
  {
    src: '/images/album/08.jpg',
    alt: 'Forever and Always',
    timeTag: '11:29',
    caption: 'Forever & Always — Cho đến muôn đời',
  },
];

type RevealEffect =
  | 'flip-spin'
  | 'slide-from-right'
  | 'center-out-right'
  | 'center-out-left';

interface PhotoCardProps {
  photo: GalleryPhoto;
  effect: RevealEffect;
  index: number;
  delayMs?: number;
  className?: string;
  aspectRatioClass?: string;
  priority?: boolean;
  onOpenLightbox: (index: number) => void;
}

function PhotoCard({
  photo,
  effect,
  index,
  delayMs = 0,
  className = '',
  aspectRatioClass = 'aspect-[3/4]',
  priority = false,
  onOpenLightbox,
}: PhotoCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.9) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Define unique styles for each requested effect
  const getEffectStyles = (): React.CSSProperties => {
    const transition = `transform 1.15s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, opacity 0.85s ease-out ${delayMs}ms`;

    switch (effect) {
      // 1. Ảnh thứ nhất: Hiệu ứng lật quay (3D Flip & Spin)
      case 'flip-spin':
        return {
          transition: `transform 1.25s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, opacity 0.85s ease-out ${delayMs}ms`,
          transformStyle: 'preserve-3d',
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'perspective(1000px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1)'
            : 'perspective(1000px) rotateY(-105deg) rotateX(14deg) rotateZ(-6deg) scale(0.86)',
        };

      // 2. Ảnh dọc to bên dưới: Trượt từ bên phải sang
      case 'slide-from-right':
        return {
          transition,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0px)' : 'translateX(72px)',
        };

      // 3. Hiện dần từ giữa kéo ra bên phải (cho 2 ảnh bên cạnh ảnh dọc to & cột phải của 4 ảnh dưới)
      case 'center-out-right':
        return {
          transition,
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateX(0px) scale(1)'
            : 'translateX(-64px) scale(0.92)',
        };

      // 4. Hiện dần từ giữa kéo ra bên trái (cho cột trái của 4 ảnh dưới)
      case 'center-out-left':
        return {
          transition,
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateX(0px) scale(1)'
            : 'translateX(64px) scale(0.92)',
        };

      default:
        return {};
    }
  };

  return (
    <div
      ref={cardRef}
      style={getEffectStyles()}
      onClick={() => onOpenLightbox(index)}
      className={`group relative overflow-hidden rounded-[2px] bg-[#8A7E64]/30 cursor-pointer select-none shadow-md hover:shadow-xl transition-shadow ${aspectRatioClass} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`Xem ảnh: ${photo.alt}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenLightbox(index);
        }
      }}
    >
      {/* Time Tag for film aesthetic (matching reference image) */}
      {photo.timeTag && (
        <div className="absolute top-1.5 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <span className="text-[9px] sm:text-[10px] tracking-[0.22em] font-mono font-medium text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {photo.timeTag}
          </span>
        </div>
      )}

      {/* Image with smooth hover zoom */}
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 100vw, 500px"
        priority={priority}
        className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Hover Overlay with subtle tint & Zoom icon */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3">
        <div className="flex items-center justify-between text-white">
          <span className="text-[11px] font-sans tracking-wide text-white/90 line-clamp-1 drop-shadow-sm">
            {photo.caption || 'Nhấn để phóng to'}
          </span>
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0 ml-1">
            <ZoomIn className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GoldenHourGallery({ photos = DEFAULT_PHOTOS }: { photos?: GalleryPhoto[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const activePhotos = photos.length > 0 ? photos : DEFAULT_PHOTOS;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? activePhotos.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === activePhotos.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <section className="py-20 px-2 sm:px-4 bg-[#A29578] text-white relative overflow-hidden select-none">
      {/* Subtle background ambient light */}
      <div className="absolute inset-0 bg-radial from-white/[0.04] via-transparent to-black/10 pointer-events-none" />

      <div className="relative z-10 max-w-[440px] mx-auto w-full flex flex-col items-center">
        {/* HEADER SECTION - EXACTLY MATCHING THE REFERENCE IMAGE */}
        <div className="text-center w-full px-2 mb-6 sm:mb-8">
          {/* Main Title: GOLDEN HOUR of LOVE */}
          <h2
            className={`${marcellus.className} text-[27px] sm:text-[33px] tracking-[0.14em] uppercase text-white font-normal flex items-center justify-center flex-wrap gap-x-2 leading-tight`}
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}
          >
            <span>GOLDEN HOUR</span>
            <span
              className={`${imperialScript.className} text-[38px] sm:text-[44px] text-[#F6E7CF] lowercase italic leading-none font-normal -my-2 tracking-normal`}
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
            >
              of
            </span>
            <span>LOVE</span>
          </h2>

          {/* Subtitle Description */}
          <p
            className={`${cormorantInfant.className} text-[13px] sm:text-[14.5px] leading-[1.65] text-[#F3EEE6]/90 font-normal max-w-[390px] mx-auto mt-3 tracking-[0.015em]`}
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
          >
            Our wedding album captures the gentle glow of love — moments of laughter, tenderness, and forever promises, wrapped in a dreamy elegance that will never fade.
          </p>
        </div>

        {/* PHOTO COLLAGE CONTAINER - EXACT 8-PHOTO LAYOUT */}
        <div className="w-full flex flex-col gap-1 sm:gap-1.5">
          {/* 1. Ảnh thứ nhất: Hiệu ứng lật quay (flip-spin) */}
          {activePhotos[0] && (
            <PhotoCard
              photo={activePhotos[0]}
              effect="flip-spin"
              index={0}
              aspectRatioClass="aspect-[16/10]"
              priority
              onOpenLightbox={handleOpenLightbox}
            />
          )}

          {/* 2. Hàng thứ 2: Ảnh dọc to bên trái có chiều ngang rộng hơn một chút (56%) so với hàng 50% bên dưới */}
          <div className="grid grid-cols-[56%_1fr] gap-1 sm:gap-1.5 w-full">
            {/* Ảnh dọc to bên trái: Trượt từ phải sang */}
            {activePhotos[1] && (
              <div className="row-span-2 h-full">
                <PhotoCard
                  photo={activePhotos[1]}
                  effect="slide-from-right"
                  index={1}
                  className="h-full min-h-[290px] sm:min-h-[320px]"
                  aspectRatioClass="h-full"
                  onOpenLightbox={handleOpenLightbox}
                />
              </div>
            )}

            {/* 2 ảnh bên cạnh ảnh dọc to: Hiện dần từ giữa ra */}
            {activePhotos[2] && (
              <PhotoCard
                photo={activePhotos[2]}
                effect="center-out-right"
                index={2}
                delayMs={100}
                aspectRatioClass="aspect-[1/1.05]"
                onOpenLightbox={handleOpenLightbox}
              />
            )}

            {activePhotos[3] && (
              <PhotoCard
                photo={activePhotos[3]}
                effect="center-out-right"
                index={3}
                delayMs={220}
                aspectRatioClass="aspect-[1/1.05]"
                onOpenLightbox={handleOpenLightbox}
              />
            )}
          </div>

          {/* 3. Hàng thứ 3 (2 trong 4 ảnh bên dưới): Hiện dần từ giữa ra 2 bên */}
          <div className="grid grid-cols-2 gap-1 sm:gap-1.5 w-full">
            {activePhotos[4] && (
              <PhotoCard
                photo={activePhotos[4]}
                effect="center-out-left"
                index={4}
                aspectRatioClass="aspect-[3/4]"
                onOpenLightbox={handleOpenLightbox}
              />
            )}

            {activePhotos[5] && (
              <PhotoCard
                photo={activePhotos[5]}
                effect="center-out-right"
                index={5}
                aspectRatioClass="aspect-[3/4]"
                onOpenLightbox={handleOpenLightbox}
              />
            )}
          </div>

          {/* 4. Hàng thứ 4 (2 ảnh cuối trong 4 ảnh bên dưới): Hiện dần từ giữa ra 2 bên */}
          <div className="grid grid-cols-2 gap-1 sm:gap-1.5 w-full">
            {activePhotos[6] && (
              <PhotoCard
                photo={activePhotos[6]}
                effect="center-out-left"
                index={6}
                aspectRatioClass="aspect-[3/4]"
                onOpenLightbox={handleOpenLightbox}
              />
            )}

            {activePhotos[7] && (
              <PhotoCard
                photo={activePhotos[7]}
                effect="center-out-right"
                index={7}
                aspectRatioClass="aspect-[3/4]"
                onOpenLightbox={handleOpenLightbox}
              />
            )}
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={handleCloseLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Counter & Close */}
          <div
            className="w-full max-w-4xl flex items-center justify-between text-white z-20 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-white/80">
              <Heart className="w-4 h-4 text-[#F6E7CF] fill-[#F6E7CF]" />
              <span className={`${marcellus.className} text-sm tracking-widest`}>
                {lightboxIndex + 1} / {activePhotos.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCloseLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image View Area */}
          <div
            className="relative w-full max-w-4xl flex-1 flex items-center justify-center py-4 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-1 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm active:scale-90 cursor-pointer"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Displayed Image */}
            <div className="relative w-full h-[65vh] max-h-[720px] flex items-center justify-center select-none">
              <Image
                src={activePhotos[lightboxIndex].src}
                alt={activePhotos[lightboxIndex].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-1 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm active:scale-90 cursor-pointer"
              aria-label="Ảnh sau"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption & Thumbnail Strip */}
          <div
            className="w-full max-w-4xl flex flex-col items-center gap-3 z-20 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Caption */}
            {activePhotos[lightboxIndex].caption && (
              <p className={`${cormorantInfant.className} text-white/90 text-center text-sm sm:text-base italic tracking-wide px-4`}>
                "{activePhotos[lightboxIndex].caption}"
              </p>
            )}

            {/* Thumbnail carousel strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
              {activePhotos.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-[2px] overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                    lightboxIndex === idx
                      ? 'ring-2 ring-[#F6E7CF] scale-105 opacity-100'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={item.src} alt={item.alt} fill sizes="52px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
