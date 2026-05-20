'use client';

import { useRef, useEffect, useCallback } from 'react';

interface ScrollOptions {
  threshold?: number;
  delay?: number;
  rootMargin?: string;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  callbacks: {
    onEnter?: () => void;
    onExit?: () => void;
  },
  options: ScrollOptions = {}
) {
  const elementRef = useRef<T | null>(null);
  const { threshold = 0.4, delay = 200, rootMargin = '0px 0px -30% 0px' } = options;
  const isInView = useRef(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Memoize callbacks to prevent unnecessary re-renders
  const memoizedOnEnter = useCallback(() => {
    if (typeof callbacks.onEnter === 'function') {
      callbacks.onEnter();
    }
  }, [callbacks.onEnter]);

  const memoizedOnExit = useCallback(() => {
    if (typeof callbacks.onExit === 'function') {
      callbacks.onExit();
    }
  }, [callbacks.onExit]);

  useEffect(() => {
    const element = elementRef.current;
    
    // Early return if element doesn't exist
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Clear any existing debounce timer
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        
        // Debounce the callback to prevent rapid firing
        debounceTimer.current = setTimeout(() => {
          if (entry.isIntersecting && !isInView.current) {
            // Element entered viewport
            isInView.current = true;
            memoizedOnEnter();
          } else if (!entry.isIntersecting && isInView.current) {
            // Element left viewport
            isInView.current = false;
            memoizedOnExit();
          }
        }, delay);
      },
      { 
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    // Cleanup function
    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }
    };
  }, [memoizedOnEnter, memoizedOnExit, threshold, delay, rootMargin]);

  return elementRef;
}
