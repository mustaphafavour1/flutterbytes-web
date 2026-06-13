"use client";
import { useEffect, useState } from "react";

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET = new Date("2026-10-30T09:00:00+01:00").getTime();

function calc(): TimeLeft {
  const diff = Math.max(0, TARGET - Date.now());
  const totalDays = Math.floor(diff / 86400000);
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  return {
    months,
    days,
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

function Unit({ value, label, numClass }: { value: number; label: string; numClass: string }) {
  return (
    <div className="flex flex-col items-center px-2 text-center">
      <span className={`font-gigasans font-thin text-fbc-sky tabular-nums leading-none ${numClass}`}>
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-fbc-muted/60 text-[9px] uppercase tracking-wider mt-1">{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex items-end divide-x divide-white/[0.08]"
      aria-label="Countdown to FlutterBytes 2026"
    >
      <Unit value={time.months}  label="months" numClass="text-5xl" />
      <Unit value={time.days}    label="days"   numClass="text-4xl" />
      <Unit value={time.hours}   label="hrs"    numClass="text-3xl" />
      <Unit value={time.minutes} label="min"    numClass="text-2xl" />
      <Unit value={time.seconds} label="sec"    numClass="text-xl"  />
    </div>
  );
}
