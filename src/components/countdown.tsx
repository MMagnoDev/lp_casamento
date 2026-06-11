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
  const targetDate = new Date("2027-02-14T17:00:00").getTime();

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
      const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
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
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border border-border flex items-center justify-center bg-transparent">
              <span className="font-serif text-sm sm:text-lg md:text-xl font-light text-primary">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent mt-2 sm:mt-3 font-sans font-medium">
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
