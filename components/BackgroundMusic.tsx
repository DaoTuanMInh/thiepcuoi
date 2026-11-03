'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Disc, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  audioUrl?: string;
  songTitle?: string;
}

export default function BackgroundMusic({
  audioUrl = '/music/ngay-dau-tien.mp3',
  songTitle = 'Ngày Đầu Tiên',
}: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth fade-in volume to avoid jarring audio starts
  const playWithFadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          let vol = 0;
          const targetVol = 0.75;
          const step = 0.05;
          fadeIntervalRef.current = setInterval(() => {
            if (!audio) return;
            vol = Math.min(vol + step, targetVol);
            audio.volume = vol;
            if (vol >= targetVol) {
              if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }
          }, 80);
        })
        .catch((err) => {
          // Browser prevented autoplay before user gesture
          console.log('Autoplay prevented by browser:', err);
          setIsPlaying(false);
        });
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    audio.pause();
    setIsPlaying(false);
  }, []);

  // 1. Tự động phát khi khách ấn mở cánh cổng sáp Song Hỷ (WaxSealGate)
  useEffect(() => {
    const handleGateOpen = () => {
      setHasInteracted(true);
      playWithFadeIn();
    };

    window.addEventListener('wedding-gate-opening', handleGateOpen);

    // 2. Fallback: Nếu cổng đã mở sẵn hoặc khách chạm vào bất kỳ đâu trên màn hình
    const handleFirstGesture = () => {
      if (!hasInteracted && audioRef.current && audioRef.current.paused) {
        setHasInteracted(true);
        playWithFadeIn();
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener('wedding-gate-opening', handleGateOpen);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [hasInteracted, playWithFadeIn]);

  // Toggle bật / tắt nhạc khi người dùng nhấn vào nút góc trên bên trái
  const togglePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      pauseAudio();
    } else {
      playWithFadeIn();
    }
  };

  return (
    <>
      {/* Thẻ audio phát nhạc Ngày Đầu Tiên */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* CSS Keyframes cho đĩa xoay và thanh sóng nhạc */}
      <style jsx global>{`
        @keyframes discRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes eqWave1 {
          0%, 100% { height: 4px; }
          50% { height: 15px; }
        }
        @keyframes eqWave2 {
          0%, 100% { height: 14px; }
          50% { height: 5px; }
        }
        @keyframes eqWave3 {
          0%, 100% { height: 6px; }
          50% { height: 16px; }
        }
        @keyframes eqWave4 {
          0%, 100% { height: 12px; }
          50% { height: 4px; }
        }
      `}</style>

      {/* Vị trí góc trên cùng bên trái (fixed top-left) */}
      <div className="fixed top-3.5 left-3.5 sm:top-5 sm:left-5 z-50 select-none animate-in fade-in duration-500">
        <button
          id="wedding-music-btn"
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Tạm dừng nhạc cưới' : 'Bật nhạc cưới'}
          className="group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#FFFAF4]/90 hover:bg-[#FFFAF4] text-[#AC4558] border border-[#AC4558]/35 shadow-[0_4px_18px_rgba(172,69,88,0.25)] backdrop-blur-md active:scale-95 transition-all cursor-pointer"
        >
          {/* Đĩa nhạc xoay tròn hoặc icon trạng thái */}
          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <Disc
                size={16}
                style={{ animation: 'discRotate 3.6s linear infinite' }}
                className="text-[#AC4558]"
              />
            ) : (
              <VolumeX size={16} className="text-[#888888]" />
            )}
          </div>

          {/* Cột sóng nhạc Equalizer 4 thanh nhún nhảy theo giai điệu */}
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-[16px] px-0.5">
              <span
                style={{ animation: 'eqWave1 0.65s ease-in-out infinite' }}
                className="w-[2.5px] bg-[#AC4558] rounded-full inline-block"
              />
              <span
                style={{ animation: 'eqWave2 0.85s ease-in-out infinite 0.15s' }}
                className="w-[2.5px] bg-[#C59B27] rounded-full inline-block"
              />
              <span
                style={{ animation: 'eqWave3 0.75s ease-in-out infinite 0.3s' }}
                className="w-[2.5px] bg-[#AC4558] rounded-full inline-block"
              />
              <span
                style={{ animation: 'eqWave4 0.95s ease-in-out infinite 0.45s' }}
                className="w-[2.5px] bg-[#C59B27] rounded-full inline-block"
              />
            </div>
          ) : (
            <div className="flex items-center gap-[2px] h-[16px] px-0.5">
              <span className="w-[2.5px] h-[3px] bg-stone-400 rounded-full inline-block" />
              <span className="w-[2.5px] h-[3px] bg-stone-400 rounded-full inline-block" />
              <span className="w-[2.5px] h-[3px] bg-stone-400 rounded-full inline-block" />
              <span className="w-[2.5px] h-[3px] bg-stone-400 rounded-full inline-block" />
            </div>
          )}

          {/* Nhãn chữ tên bài hát / trạng thái */}
          <span className="text-[11.5px] sm:text-[12.5px] font-semibold tracking-tight whitespace-nowrap">
            {isPlaying ? songTitle : 'Bật nhạc'}
          </span>
        </button>
      </div>
    </>
  );
}

