'use client';
import Image from 'next/image';
import React from 'react';

const defaultLogos = [
  'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=140&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=140&q=80',
  'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=140&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=140&q=80',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=140&q=80',
];

export function TinyLogos({ logos = defaultLogos, speed = 10 }: { logos?: string[]; speed?: number }) {
  const items = [...logos, ...logos]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100">
      <div
        className="flex gap-6 py-3 animate-[marquee_linear_infinite]"
        style={
          {
            ['--marquee-duration' as any]: `${speed}s`,
          } as React.CSSProperties
        }
      >
        {items.map((src, i) => (
          <div key={i} className="shrink-0 w-20 h-10 relative opacity-80 hover:opacity-100 transition">
            <Image src={src} alt="logo" fill sizes="80px" className="object-cover rounded-md" />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-\[marquee_linear_infinite\] {
          animation: marquee var(--marquee-duration, 18s) linear infinite;
        }
        .animate-\[marquee_linear_infinite\]:hover,
        .animate-\[marquee_linear_infinite\]:focus {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
