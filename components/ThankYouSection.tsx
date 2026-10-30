'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Cormorant_Infant, Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
});

const cormorantInfant = Cormorant_Infant({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
});

export default function ThankYouSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Accurate visibility detector combining getBoundingClientRect and IntersectionObserver
    const checkVisibility = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger when the section enters the viewport (top of section is within 85% of screen height)
      if (rect.top <= windowHeight * 0.85 && rect.bottom >= windowHeight * 0.1) {
        setIsVisible(true);
      } else if (rect.top > windowHeight || rect.bottom < 0) {
        // Reset when completely out of view so re-scrolling replays the animation
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    // Initial check in case user loaded the page already scrolled to bottom
    checkVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full aspect-[4/3] min-h-[390px] sm:min-h-[450px] flex flex-col items-center justify-between overflow-hidden select-none"
    >
      {/* Background Image: Clean high-res couple photo in front of chateau */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/thankyou-bg.jpg"
          alt="Linh & Nga - Cảm ơn quý khách"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 500px"
          className="object-cover w-full h-full"
        />
        {/* Subtle Dark Vignette at top to ensure pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/35 pointer-events-none" />
      </div>

      {/* Animated Text Content Container */}
      <div className="relative z-10 w-full px-5 pt-8 sm:pt-10 flex flex-col items-center text-center text-white">
        {/* 1. Header Line - Floats up first */}
        <div
          style={{
            transition: 'all 900ms cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
            filter: isVisible ? 'blur(0px)' : 'blur(6px)',
          }}
          className="max-w-[420px] mx-auto mb-2"
        >
          <p
            className={`${cormorantInfant.className} text-[15px] sm:text-[17px] font-bold text-white tracking-[0.02em]`}
            style={{
              textShadow:
                '0 2px 10px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.95)',
            }}
          >
            Cảm ơn bạn đã dành tình cảm cho chúng mình!
          </p>
        </div>

        {/* 2. Gratitude Body - Floats up next with a stagger */}
        <div
          style={{
            transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1) 220ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            filter: isVisible ? 'blur(0px)' : 'blur(6px)',
          }}
          className="max-w-[420px] mx-auto"
        >
          <p
            className={`${cormorantInfant.className} text-[13.5px] sm:text-[15.5px] leading-[1.65] font-medium text-white/95 tracking-[0.015em]`}
            style={{
              textShadow:
                '0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.95)',
            }}
          >
            Sự hiện diện của bạn chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.
          </p>
        </div>

        {/* 3. Cursive 'Thank you!' - Rises up gracefully as the grand finale */}
        <div
          style={{
            transition: 'all 1150ms cubic-bezier(0.16, 1, 0.3, 1) 480ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'translateY(0) scale(1)'
              : 'translateY(46px) scale(0.88)',
          }}
          className="mt-3 sm:mt-5"
        >
          <h2
            className={`${greatVibes.className} text-[50px] sm:text-[62px] leading-tight text-white font-normal italic`}
            style={{
              textShadow:
                '0 4px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.9)',
            }}
          >
            Thank you!
          </h2>
        </div>
      </div>

      {/* Bottom spacer so the couple walking on the lawn remains perfectly visible */}
      <div className="relative z-10 w-full h-12 sm:h-16 pointer-events-none" />
    </section>
  );
}
