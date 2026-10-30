'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Cormorant_Infant, Marcellus, Imperial_Script } from 'next/font/google';
import Countdown from '@/components/Countdown';

const imperialScript = Imperial_Script({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
});

const cormorantInfant = Cormorant_Infant({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
});

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
});

interface Slide2EnvelopeProps {
  guestName: string;
  targetDate?: string;
}

export default function Slide2Envelope({
  guestName,
  targetDate = '2025-12-21T09:00:00',
}: Slide2EnvelopeProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = containerRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  return (
    <section
      id="slide-2"
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
    >
      <div className="relative w-full aspect-[624/1024]">
        {/* LAYER 1 (z-0): Base full Slide 2 image (background + open envelope back flap) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/slide2-full.jpg"
            alt="Thiệp cưới Slide 2"
            fill
            priority
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover"
          />
        </div>

        {/* LAYER 2 (z-10): The Deckle-Edge Letter Card inside the envelope pocket */}
        <div
          className="absolute z-10"
          style={{
            left: '21.0%',
            top: '16.5%',
            width: '58.0%',
            height: '50.0%',
            transform: isInView ? 'translateY(0%)' : 'translateY(28%)',
            opacity: isInView ? 1 : 0.9,
            transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease',
          }}
        >
          <div className="relative w-full h-full drop-shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
            {/* Clean deckle-edged paper background cropped strictly inside the cream paper bounds */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2px]"
              style={{
                backgroundImage: "url('/images/envelope-blank-2x.png')",
                backgroundSize: '202% 245%',
                backgroundPosition: '46.6% 21.5%',
              }}
            />

            {/* Letter Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-start text-center pt-5 sm:pt-6 px-3">
              {/* Header */}
              <div className="flex flex-col items-center mb-2 sm:mb-2.5">
                <p
                  className={`${marcellus.className} uppercase tracking-[0.06em] text-[9px] sm:text-[10.5px] text-[#928362] leading-snug`}
                >
                  YOU&apos;RE INVITED TO THE
                </p>
                <p
                  className={`${marcellus.className} uppercase tracking-[0.06em] text-[9px] sm:text-[10.5px] text-[#928362] leading-snug`}
                >
                  WEDDING OF
                </p>
              </div>

              {/* Bride & Groom Names in Imperial Script Calligraphy */}
              <div className="flex flex-col items-center justify-center my-0.5">
                <h2 className={`${imperialScript.className} text-[40px] sm:text-[45px] leading-[0.92] text-[#928362] whitespace-nowrap`}>
                  Anh Linh
                </h2>
                <span className={`${imperialScript.className} text-[28px] sm:text-[32px] leading-none text-[#928362] my-[-2px]`}>
                  &amp;
                </span>
                <h2 className={`${imperialScript.className} text-[40px] sm:text-[45px] leading-[0.92] text-[#928362] whitespace-nowrap`}>
                  Thanh Nga
                </h2>
              </div>

              {/* Countdown Section */}
              <div className="w-full flex flex-col items-center mt-2.5 sm:mt-3">
                <p
                  className={`${marcellus.className} uppercase tracking-[0.06em] text-[8.5px] sm:text-[9.5px] text-[#928362] mb-1`}
                >
                  IS HAPPENING IN
                </p>
                <Countdown targetDate={targetDate} compact />
              </div>

              {/* Guest Personalization */}
              {guestName && (
                <div className="mt-2 px-1">
                  <p
                    className={`${cormorantInfant.className} text-[11px] sm:text-[12.5px] text-[#928362] italic font-semibold`}
                  >
                    Kính mời: {guestName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LAYER 3 (z-20): Front pocket & bronze wax seal of slide2-full.jpg */}
        {/* Clipped strictly along the V-opening of the envelope so the lower half of the letter is tucked inside */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            clipPath:
              'polygon(0% 47.8%, 12.0% 47.8%, 39.5% 59.8%, 43.0% 55.4%, 50.0% 54.2%, 57.0% 55.4%, 60.5% 59.8%, 88.5% 47.8%, 100% 47.8%, 100% 100%, 0% 100%)',
          }}
        >
          <Image
            src="/images/slide2-full.jpg"
            alt="Nắp trước phong bì"
            fill
            priority
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover"
          />
        </div>

        {/* LAYER 4 (z-30): Left Orchid & Pearl String with Fade-In + Slide-Up (~1.5cm) */}
        <svg
          viewBox="0 0 1308 1476"
          className="absolute z-30 pointer-events-none"
          style={{
            left: '-3.5%',
            top: '21.5%',
            width: '100%',
            height: '78%',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.08))',
            transform: isInView ? 'translateY(0px)' : 'translateY(56px)',
            opacity: isInView ? 1 : 0,
            transition:
              'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, opacity 0.95s ease-out 0.1s',
          }}
        >
          <defs>
            <filter id="leftOrchidFeather" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <mask id="leftOrchidMask">
              <rect width="1308" height="1476" fill="black" />
              <g fill="white" filter="url(#leftOrchidFeather)">
                {/* Large top orchid flower */}
                <path d="M 218 672 C 245 668, 265 685, 275 705 C 315 708, 355 745, 365 788 C 372 825, 345 852, 295 858 C 280 860, 268 852, 258 842 C 245 872, 222 892, 198 885 C 180 878, 178 852, 182 828 C 142 818, 112 782, 114 742 C 116 702, 152 678, 195 685 C 202 675, 210 672, 218 672 Z" />
                {/* Medium middle orchid flower */}
                <path d="M 272 885 C 312 885, 348 912, 345 948 C 342 978, 320 1012, 292 1010 C 275 1008, 265 992, 258 982 C 242 995, 215 995, 206 972 C 198 950, 215 910, 248 895 Z" />
                {/* Small lower-left orchid flower */}
                <path d="M 196 1032 C 225 1032, 242 1055, 238 1082 C 234 1105, 210 1115, 188 1108 C 165 1102, 150 1082, 155 1058 C 160 1038, 178 1032, 196 1032 Z" />
                {/* Tight left pearl strand */}
                <path d="M 188 865 L 203 865 L 209 1422 L 188 1422 Z" />
                {/* Tight right pearl strand */}
                <path d="M 251 845 L 266 845 L 260 1345 L 245 1345 Z" />
              </g>
            </mask>
          </defs>
          <image
            href="/images/slide2-orchids-source.png"
            width="1308"
            height="1476"
            mask="url(#leftOrchidMask)"
          />
        </svg>

        {/* LAYER 5 (z-30): Right Orchid & Pearl String with Fade-In + Slide-Up (~1.5cm) */}
        <svg
          viewBox="0 0 1308 1476"
          className="absolute z-30 pointer-events-none"
          style={{
            left: '-1.2%',
            top: '15.5%',
            width: '100%',
            height: '78%',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.08))',
            transform: isInView ? 'translateY(0px)' : 'translateY(56px)',
            opacity: isInView ? 1 : 0,
            transition:
              'transform 1.25s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, opacity 1.0s ease-out 0.2s',
          }}
        >
          <defs>
            <filter id="rightOrchidFeather" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
            <mask id="rightOrchidMask">
              <rect width="1308" height="1476" fill="black" />
              <g fill="white" filter="url(#rightOrchidFeather)">
                {/* Main right orchid flower (strictly inside white petals) */}
                <path d="M 1058 476 C 1072 456, 1092 452, 1115 454 C 1138 456, 1156 472, 1166 492 C 1175 512, 1172 538, 1152 556 C 1140 586, 1118 600, 1090 590 C 1080 584, 1075 570, 1072 558 C 1060 578, 1028 580, 1002 560 C 985 545, 985 514, 1002 498 C 1012 490, 1018 474, 1032 468 C 1044 464, 1052 468, 1058 476 Z" />
                {/* Small orchid flower on left strand */}
                <path d="M 1020 692 C 1042 692, 1056 708, 1054 726 C 1052 742, 1036 752, 1018 748 C 998 745, 984 732, 986 714 C 988 698, 1002 692, 1020 692 Z" />
                {/* Right pearl strand 1 (longest, leftmost of the right trio) */}
                <path d="M 1011 568 L 1013 700 L 1021 800 L 1027 900 L 1027 1000 L 1019 1100 L 1021 1150 L 1027 1200 L 1035 1300 L 1035 1350 L 1029 1400 L 1024 1434 L 1044 1434 L 1049 1400 L 1055 1350 L 1053 1300 L 1045 1200 L 1039 1150 L 1039 1100 L 1046 1000 L 1045 900 L 1039 800 L 1031 700 L 1029 568 Z" />
                {/* Right pearl strand 2 (middle) */}
                <path d="M 1053 558 L 1053 650 L 1056 750 L 1062 850 L 1067 950 L 1061 1000 L 1054 1050 L 1052 1092 L 1069 1092 L 1071 1050 L 1078 1000 L 1084 950 L 1079 850 L 1073 750 L 1070 650 L 1070 558 Z" />
                {/* Right pearl strand 3 (rightmost) */}
                <path d="M 1095 588 L 1095 650 L 1101 750 L 1103 850 L 1104 950 L 1105 1058 L 1123 1058 L 1123 950 L 1124 850 L 1122 750 L 1116 650 L 1116 588 Z" />
              </g>
            </mask>
          </defs>
          <image
            href="/images/slide2-orchids-source.png"
            width="1308"
            height="1476"
            mask="url(#rightOrchidMask)"
          />
        </svg>
      </div>
    </section>
  );
}
