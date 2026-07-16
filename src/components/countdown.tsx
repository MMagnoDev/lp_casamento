"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const targetDate = new Date("2026-10-16T20:30:00").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div className="flex gap-4 justify-center items-center py-6 text-primary font-light text-xs tracking-widest">
        Carregando...
      </div>
    );
  }

  const items = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <div className="flex w-full justify-between md:justify-around items-center py-4 sm:py-8 px-1 sm:px-2 md:px-8">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-border/60 flex items-center justify-center bg-[#FAF6F3]/50 shadow-[inset_0_1px_2px_rgba(60,45,36,0.02)] transition-all duration-500 hover:border-primary/50 hover:bg-[#FAF6F3]">
              <span className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-primary tracking-normal">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-espresso/70 mt-2 sm:mt-3 font-sans font-medium">
              {item.label}
            </span>
          </motion.div>
          
          {index < items.length - 1 && (
            <span className="font-serif text-xs sm:text-lg text-border/60 ml-1 sm:ml-2 md:ml-4 self-center -mt-5 sm:-mt-6">
              /
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
