'use client';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

export function TinyAvatars({
  avatars = [],
  speed = 20,
  direction = 'left',
  pauseOnHover = true,
  gap = 'gap-3',
  size = 'w-10 h-10',
  rounded = 'rounded-full',
  showBorder = true,
  className = '',
}: {
  avatars?: string[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gap?: string;
  size?: string;
  rounded?: string;
  showBorder?: boolean;
  className?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  const defaultAvatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80&crop=faces',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80&crop=faces',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80&crop=faces',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=80&h=80&q=80&crop=faces',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80&crop=faces',
  ];

  const list = avatars.length > 0 ? avatars : defaultAvatars;

  // Clone items dynamically like in the video
  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const listContent = Array.from(listElement.children);
    
    listContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('aria-hidden', 'true');
      listElement.appendChild(duplicatedItem);
    });
  }, [list]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-horizontal {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .avatar-scroll-list {
            animation: scroll-horizontal ${speed}s linear infinite;
            animation-direction: ${direction === 'right' ? 'reverse' : 'normal'};
            will-change: transform;
          }

          ${pauseOnHover ? `.avatar-scroll-container:hover .avatar-scroll-list { animation-play-state: paused; }` : ''}

          @media (prefers-reduced-motion: reduce) {
            .avatar-scroll-list {
              animation-play-state: paused !important;
            }
          }
        `
      }} />

      <div 
        className={`avatar-scroll-container relative w-full overflow-hidden rounded-xl ${showBorder ? 'border border-gray-100' : ''} ${className}`}
      >
        <div 
          ref={listRef}
          className={`flex ${gap} py-2 avatar-scroll-list whitespace-nowrap`}
        >
          {list.map((src, i) => (
            <div
              key={i}
              className={`relative shrink-0 ${size} ${rounded} ${showBorder ? 'ring-1 ring-gray-200/70' : ''}`}
              title={`Participant ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Avatar ${i + 1}`}
                fill
                sizes="80px"
                className={`object-cover ${rounded}`}
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
