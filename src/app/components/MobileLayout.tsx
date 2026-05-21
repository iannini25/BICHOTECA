import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import { cloneElement, useEffect, useState } from "react";
import { useOutlet } from "react-router";

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function StatusBar() {
  const time = useClock();
  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-7 pt-2 pb-1 text-[13px] font-bold text-[#5D4037] pointer-events-none select-none">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden>
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden>
          <path d="M7.5 0C4.6 0 2 1.1 0 2.9l1.4 1.4C3 2.9 5.1 2 7.5 2s4.5.9 6.1 2.3L15 2.9C13 1.1 10.4 0 7.5 0Zm0 4C5.6 4 3.9 4.7 2.5 5.9l1.5 1.5c1-.8 2.2-1.4 3.5-1.4s2.5.6 3.5 1.4l1.5-1.5C11.1 4.7 9.4 4 7.5 4Zm0 4c-1 0-1.9.3-2.7.9l2.7 2.7 2.7-2.7C9.4 8.3 8.5 8 7.5 8Z" />
        </svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" />
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="currentColor" />
          <rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export function MobileLayout() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center font-fredoka overflow-hidden p-4 sm:p-8">
      {/* Decorative floating shapes behind the phone */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#4CAF50]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#FFD54F]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#FF8A65]/20 rounded-full blur-3xl" />
      </div>

      {/* Phone chassis (outer bezel) */}
      <div className="relative z-10 mx-auto">
        <div
          className="
            relative bg-neutral-900
            rounded-[52px]
            p-[14px]
            shadow-[0_25px_60px_-10px_rgba(0,0,0,0.7),0_0_0_2px_rgba(255,255,255,0.05)_inset]
            ring-1 ring-white/10
          "
        >
          {/* Side buttons */}
          <div className="absolute left-[-3px] top-24 w-[3px] h-10 bg-neutral-800 rounded-l-md" />
          <div className="absolute left-[-3px] top-40 w-[3px] h-16 bg-neutral-800 rounded-l-md" />
          <div className="absolute left-[-3px] top-60 w-[3px] h-16 bg-neutral-800 rounded-l-md" />
          <div className="absolute right-[-3px] top-32 w-[3px] h-24 bg-neutral-800 rounded-r-md" />

          {/* Screen */}
          <div
            className="
              relative bg-[#FFF8E7]
              w-[375px] h-[760px] max-h-[calc(100dvh-80px)]
              rounded-[40px]
              overflow-hidden
              flex flex-col
            "
          >
            {/* Dynamic island / notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 shadow-inner" />

            <StatusBar />

            {/* App content (starts below status bar) */}
            <div className="flex-1 flex flex-col pt-7 overflow-hidden relative">
              <AnimatePresence mode="wait" initial={false}>
                {element && cloneElement(element, { key: location.pathname })}
              </AnimatePresence>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-[5px] bg-black/70 rounded-full z-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
