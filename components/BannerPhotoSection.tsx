'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Imperial_Script, Marcellus } from 'next/font/google';

const imperialScript = Imperial_Script({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
});

interface BannerPhotoSectionProps {
  imageSrc?: string;
}

export default function BannerPhotoSection({
  imageSrc = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
}: BannerPhotoSectionProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full aspect-[500/398] overflow-hidden select-none"
    >
      <Image
        src={imageSrc}
        alt="This day our hearts become one"
        fill
        sizes="(max-width: 500px) 100vw, 500px"
        className="object-cover w-full h-full"
      />
      {/* Subtle top vignette so the white text is crisp over any photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/20 pointer-events-none" />

      {/* SVG filter to delicately thin the strokes while keeping all hairline loops crisp */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="thin-stroke-script" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.62" result="blurred" />
            <feComponentTransfer in="blurred" result="thinned">
              <feFuncA type="linear" slope="2.1" intercept="-0.95" />
            </feComponentTransfer>
            <feDropShadow in="thinned" dx="0" dy="1" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.35" />
          </filter>
          <filter id="thin-stroke-serif" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.38" result="blurred" />
            <feComponentTransfer in="blurred" result="thinned">
              <feFuncA type="linear" slope="1.75" intercept="-0.55" />
            </feComponentTransfer>
            <feDropShadow in="thinned" dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>
      </svg>

      {/* Text Overlay near top-center matching reference image with slender strokes */}
      <div className="absolute inset-x-0 top-[7.5%] z-10 flex flex-col items-center text-center px-4 pointer-events-none antialiased">
        <h2
          className={`${imperialScript.className} text-[54px] sm:text-[60px] leading-[0.82] text-white font-normal`}
          style={{
            transform: isInView ? 'translateY(0px)' : 'translateY(40px)',
            opacity: isInView ? 1 : 0,
            transition:
              'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s ease-out',
          }}
        >
          <span className="inline-block px-2" style={{ filter: 'url(#thin-stroke-script)' }}>
            This day
          </span>
        </h2>
        <p
          className={`${marcellus.className} text-[12px] sm:text-[13.5px] tracking-[0.05em] uppercase text-white font-normal mt-[-2px]`}
          style={{
            transform: isInView ? 'translateY(0px)' : 'translateY(40px)',
            opacity: isInView ? 1 : 0,
            transition:
              'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, opacity 0.9s ease-out 0.15s',
          }}
        >
          <span className="inline-block px-1" style={{ filter: 'url(#thin-stroke-serif)' }}>
            OUR HEARTS BECOME ONE
          </span>
        </p>
      </div>
    </section>
  );
}
