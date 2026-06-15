"use client"

import { useState, useEffect } from 'react';

export function MatchCountdown({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(date) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  if (!timeLeft) return <span className="text-destructive font-bold">LIVE NOW</span>;

  return (
    <div className="flex gap-2 font-code">
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-primary">{timeLeft.d}d</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-primary">{timeLeft.h}h</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-primary">{timeLeft.m}m</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-primary">{timeLeft.s}s</span>
      </div>
    </div>
  );
}