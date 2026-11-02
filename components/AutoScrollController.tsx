'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Pause, Play, ChevronsDown } from 'lucide-react';

const SCROLL_SPEED_PX_PER_SEC = 46; // Tốc độ cuộn chậm rãi, êm ái (~46px/giây)
const IDLE_RESUME_DELAY_MS = 2600; // Thời gian chờ sau khi người dùng dừng thao tác (2.6 giây)

export default function AutoScrollController() {
  const [gateOpened, setGateOpened] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  // Mutable refs to prevent stale closures inside rAF loop & event handlers
  const isManuallyPausedRef = useRef(false);
  const isInteractingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const isGateOpenedRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const subPixelAccumulatorRef = useRef(0);

  // Sync state to ref
  useEffect(() => {
    isManuallyPausedRef.current = isManuallyPaused;
  }, [isManuallyPaused]);

  // Pause rAF loop
  const pauseLoop = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    lastTimeRef.current = null;
    setIsAutoScrolling(false);
  }, []);

  // Frame step function
  const step = useCallback((timestamp: number) => {
    // Do not scroll if manually paused or user is currently interacting/holding
    if (
      isManuallyPausedRef.current ||
      isInteractingRef.current ||
      isTouchingRef.current ||
      !isGateOpenedRef.current
    ) {
      lastTimeRef.current = null;
      return;
    }

    // Do not scroll if an input, textarea or select is focused (guest is writing a wish or selecting RSVP)
    const activeEl = document.activeElement;
    if (
      activeEl &&
      (activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT')
    ) {
      lastTimeRef.current = null;
      return;
    }

    // Do not scroll if any modal dialog is open (Wishes guestbook modal or QR gift modal)
    if (document.querySelector('[role="dialog"]')) {
      lastTimeRef.current = null;
      return;
    }

    // Do not scroll if reached the very bottom of the page
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 8) {
      lastTimeRef.current = null;
      setIsAutoScrolling(false);
      setIsHolding(false);
      return;
    }

    if (lastTimeRef.current !== null) {
      // Cap delta time to prevent jumping after tab backgrounding
      const deltaMs = Math.min(timestamp - lastTimeRef.current, 60);
      const toScroll = (SCROLL_SPEED_PX_PER_SEC * deltaMs) / 1000;
      subPixelAccumulatorRef.current += toScroll;

      if (subPixelAccumulatorRef.current >= 1) {
        const px = Math.floor(subPixelAccumulatorRef.current);
        window.scrollBy(0, px);
        subPixelAccumulatorRef.current -= px;
      }
    }

    lastTimeRef.current = timestamp;
    rafIdRef.current = requestAnimationFrame(step);
  }, []);

  // Start rAF loop
  const startLoop = useCallback(() => {
    if (!isGateOpenedRef.current) return;
    if (isManuallyPausedRef.current) return;
    if (isInteractingRef.current || isTouchingRef.current) return;

    // Check if at bottom
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 8) return;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    lastTimeRef.current = null;
    setIsAutoScrolling(true);
    setIsHolding(false);
    rafIdRef.current = requestAnimationFrame(step);
  }, [step]);

  // Handle user interaction (hold auto-scroll and schedule resume)
  const handleUserActivity = useCallback(() => {
    // If manually paused by the user button, maintain manual pause
    if (isManuallyPausedRef.current) return;

    // Immediately pause auto-scroll and set holding status
    isInteractingRef.current = true;
    setIsHolding(true);
    pauseLoop();

    // Clear any existing idle countdown
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    // If user's finger is currently touching/dragging the screen, don't start the countdown yet
    if (isTouchingRef.current) {
      return;
    }

    // User is idle: resume after IDLE_RESUME_DELAY_MS
    idleTimerRef.current = setTimeout(() => {
      // Ensure user hasn't started touching again or focused an input
      if (isTouchingRef.current) return;
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT')
      ) {
        return;
      }
      if (document.querySelector('[role="dialog"]')) {
        return;
      }

      isInteractingRef.current = false;
      setIsHolding(false);
      startLoop();
    }, IDLE_RESUME_DELAY_MS);
  }, [pauseLoop, startLoop]);

  // Ensure page is pinned to top on mount / reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  }, []);

  // Listen for gate opening
  useEffect(() => {
    const onGateOpening = () => {
      window.scrollTo(0, 0);
      // When gate starts opening, wait 2.2s for doors to part widely and reveal Slide 1 before auto-scrolling
      setTimeout(() => {
        setGateOpened(true);
        isGateOpenedRef.current = true;
        startLoop();
      }, 2200);
    };

    const onGateRemoved = () => {
      setGateOpened(true);
      isGateOpenedRef.current = true;
      startLoop();
    };

    window.addEventListener('wedding-gate-opening', onGateOpening);
    window.addEventListener('wedding-gate-removed', onGateRemoved);

    // Fallback: If no gate event fired within 5.5s (e.g. dev reload or bypass), start anyway
    const fallbackTimer = setTimeout(() => {
      if (!isGateOpenedRef.current) {
        setGateOpened(true);
        isGateOpenedRef.current = true;
        startLoop();
      }
    }, 5500);

    return () => {
      window.removeEventListener('wedding-gate-opening', onGateOpening);
      window.removeEventListener('wedding-gate-removed', onGateRemoved);
      clearTimeout(fallbackTimer);
    };
  }, [startLoop]);

  // Setup user interaction event listeners
  useEffect(() => {
    const onTouchStart = () => {
      isTouchingRef.current = true;
      handleUserActivity();
    };

    const onTouchMove = () => {
      isTouchingRef.current = true;
      handleUserActivity();
    };

    const onTouchEnd = () => {
      isTouchingRef.current = false;
      handleUserActivity();
    };

    const onWheel = () => {
      handleUserActivity();
    };

    const onPointerDown = (e: PointerEvent) => {
      // Don't register toggle button click as page scroll interruption
      if ((e.target as HTMLElement)?.closest('#auto-scroll-toggle-btn')) {
        return;
      }
      handleUserActivity();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        [
          'ArrowDown',
          'ArrowUp',
          'PageDown',
          'PageUp',
          'Space',
          'Home',
          'End',
        ].includes(e.code)
      ) {
        handleUserActivity();
      }
    };

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        isInteractingRef.current = true;
        setIsHolding(true);
        pauseLoop();
        if (idleTimerRef.current) {
          clearTimeout(idleTimerRef.current);
          idleTimerRef.current = null;
        }
      }
    };

    const onFocusOut = () => {
      handleUserActivity();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        pauseLoop();
      } else {
        handleUserActivity();
      }
    };

    // Attach listeners
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleUserActivity, pauseLoop]);

  // Toggle button action
  const handleToggle = () => {
    if (isManuallyPaused) {
      // Resume
      isManuallyPausedRef.current = false;
      setIsManuallyPaused(false);
      isInteractingRef.current = false;
      setIsHolding(false);
      startLoop();
    } else {
      // Pause manually
      isManuallyPausedRef.current = true;
      setIsManuallyPaused(true);
      setIsHolding(false);
      pauseLoop();
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    }
  };

  // Only render floating control after the gate has begun opening
  if (!gateOpened) return null;

  return (
    <div className="fixed bottom-5 right-4 z-40 select-none animate-in fade-in duration-500">
      <button
        id="auto-scroll-toggle-btn"
        type="button"
        onClick={handleToggle}
        aria-label={
          isManuallyPaused
            ? 'Bật tự động cuộn thiệp'
            : 'Tạm dừng tự động cuộn thiệp'
        }
        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFAF4]/90 hover:bg-[#FFFAF4] text-[#AC4558] border border-[#AC4558]/35 shadow-[0_4px_16px_rgba(172,69,88,0.2)] backdrop-blur-md active:scale-95 transition-all text-[12px] font-semibold cursor-pointer"
      >
        {isManuallyPaused ? (
          <>
            <Play size={13} className="fill-[#AC4558]" />
            <span>Tự cuộn: Tắt</span>
          </>
        ) : isHolding ? (
          <>
            <Pause size={13} className="fill-[#AC4558]" />
            <span className="text-[#8F3047]">Đang giữ</span>
          </>
        ) : isAutoScrolling ? (
          <>
            <Pause size={13} className="fill-[#AC4558] opacity-80" />
            <span className="flex items-center gap-0.5">
              <span>Đang cuộn</span>
              <ChevronsDown size={14} className="animate-bounce" />
            </span>
          </>
        ) : (
          <>
            <Play size={13} className="fill-[#AC4558]" />
            <span>Tự cuộn</span>
          </>
        )}
      </button>
    </div>
  );
}

