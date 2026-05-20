"use client";

import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  memo,
} from "react";
import useInViewPlay from "@/components/micro/useInViewPlay";

export type TinyPoint = { x: number; y: number };

function TinyLineChart({
  ticks = [35, 40, 45, 50, 60],
  points = [
    { x: 0, y: 60 },
    { x: 20, y: 55 },
    { x: 40, y: 65 },
    { x: 60, y: 45 },
    { x: 80, y: 60 },
    { x: 100, y: 55 },
  ],
  highlightX = 60,
  duration = 900,
  className = "",
  showTicks = true,
  lineColor = "#f97316",
  backgroundColor = "#121214",
}: {
  ticks?: (string | number)[];
  points?: TinyPoint[];
  highlightX?: number;
  duration?: number;
  className?: string;
  showTicks?: boolean;
  lineColor?: string;
  backgroundColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const inView = useInViewPlay(containerRef, "200px", 0.1);

  const [dimensions, setDimensions] = useState({
    width: 320,
    height: 128,
  });

  const [tReveal, setTReveal] = useState(0);
  const [hxAnim, setHxAnim] = useState(0);

  const rafRef = useRef<number>(0);
  const startAt = useRef<number>(0);

  /* ---------- Resize Observer ---------- */

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      setDimensions({ width, height });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const { width, height } = dimensions;

  const padX = 16;
  const padY = 10;

  const minX = points[0]?.x ?? 0;
  const maxX = points[points.length - 1]?.x ?? 100;

  const clamp = (v: number, a: number, b: number) =>
    Math.max(a, Math.min(b, v));

  const targetX = clamp(highlightX, minX, maxX);

  const mapX = (x: number) =>
    padX + (x / 100) * (width - padX * 2);

  const mapY = (y: number) =>
    padY + ((100 - y) / 100) * (height - padY * 2);

  /* ---------- Path Calculations ---------- */

  const pathD = useMemo(() => {
    if (!points.length) return "";

    const p = points.map((pt) => ({
      X: mapX(pt.x),
      Y: mapY(pt.y),
    }));

    let d = `M ${p[0].X} ${p[0].Y}`;

    for (let i = 1; i < p.length; i++) {
      const a = p[i - 1];
      const b = p[i];

      const midX = (a.X + b.X) / 2;

      d += ` C ${midX} ${a.Y}, ${midX} ${b.Y}, ${b.X} ${b.Y}`;
    }

    return d;
  }, [points, width, height]);

  const areaD = useMemo(() => {
    if (!points.length) return "";

    const x0 = mapX(points[0].x);
    const xn = mapX(points[points.length - 1].x);

    return `${pathD} L ${xn} ${height - padY} L ${x0} ${
      height - padY
    } Z`;
  }, [pathD, points, width, height]);

  /* ---------- Y interpolation ---------- */

  const interpMapY = (xData: number) => {
    if (points.length < 2) return mapY(50);

    let i = 1;

    while (i < points.length && xData > points[i].x) i++;

    if (i === points.length) i = points.length - 1;

    const a = points[i - 1];
    const b = points[i];

    const t =
      (xData - a.x) / Math.max(1e-6, b.x - a.x);

    const y = a.y + t * (b.y - a.y);

    return mapY(y);
  };

  /* ---------- Animation ---------- */

  const animate = (now: number) => {
    if (!startAt.current) startAt.current = now + 60;

    const progress = Math.min(
      1,
      (now - startAt.current) / duration
    );

    if (progress >= 0) {
      setTReveal(progress);
      setHxAnim(minX + (targetX - minX) * progress);
    }

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  const startAnimation = () => {
    cancelAnimationFrame(rafRef.current);

    startAt.current = 0;

    setTReveal(0);
    setHxAnim(minX);

    rafRef.current = requestAnimationFrame(animate);
  };

  /* ---------- Start animation only when visible ---------- */

  useEffect(() => {
    if (!inView) return;

    startAnimation();

    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, duration, width, height]);

  /* ---------- Pause if tab hidden ---------- */

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") {
        startAnimation();
      }
    };

    document.addEventListener(
      "visibilitychange",
      onVis
    );

    return () =>
      document.removeEventListener(
        "visibilitychange",
        onVis
      );
  }, []);

  const hx = mapX(hxAnim);
  const hy = interpMapY(hxAnim);

  /* ---------- Render ---------- */

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
    >
      <div
        className="border border-white/10 mb-3 h-full flex flex-col"
        style={{ backgroundColor }}
      >
        <div className="relative flex-1">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="Revenue trend"
          >
            <defs>
              <linearGradient
                id={`area-${lineColor}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor={lineColor}
                  stopOpacity="0.22"
                />
                <stop
                  offset="100%"
                  stopColor={lineColor}
                  stopOpacity="0.04"
                />
              </linearGradient>

              <filter
                id="glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  stdDeviation="5"
                  result="b"
                />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <clipPath id="reveal-x">
                <rect
                  x="0"
                  y="0"
                  width={
                    16 + tReveal * (width - 16)
                  }
                  height={height}
                />
              </clipPath>
            </defs>

            {showTicks &&
              ticks.map((t, i) => {
                const x =
                  16 +
                  (i /
                    Math.max(
                      1,
                      ticks.length - 1
                    )) *
                    (width - 32);

                return (
                  <g key={i}>
                    <line
                      x1={x}
                      y1={10}
                      x2={x}
                      y2={height - 10}
                      stroke="#fff"
                      strokeWidth="1"
                      opacity="0.08"
                    />

                    <text
                      x={x}
                      y={height - 2}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#9ca3af"
                    >
                      {t}
                    </text>
                  </g>
                );
              })}

            <rect
              x={hx - 14}
              y={10}
              width={28}
              height={height - 20}
              fill={lineColor}
              opacity="0.18"
              rx="8"
            />

            <g clipPath="url(#reveal-x)">
              <path
                d={areaD}
                fill={`url(#area-${lineColor})`}
              />
            </g>

            <path
              d={pathD}
              fill="none"
              stroke={lineColor}
              strokeWidth="2.5"
              filter="url(#glow)"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - tReveal}
            />

            <circle
              cx={hx}
              cy={hy}
              r="4.5"
              fill="#111"
              stroke={lineColor}
              strokeWidth="2.5"
            />

            <circle
              cx={hx}
              cy={hy}
              r="2"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default memo(TinyLineChart);