"use client";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

const TARGET = new Date("2026-10-30T09:00:00+01:00").getTime();

function calc(): TimeLeft {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center px-3">
      <span className="font-space font-bold text-2xl text-fbc-sky tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-fbc-muted text-[10px] uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center divide-x divide-fbc-border" aria-label="Countdown to FlutterBytes 2026">
      <Unit value={time.days} label="days" />
      <Unit value={time.hours} label="hrs" />
      <Unit value={time.minutes} label="min" />
    </div>
  );
}
