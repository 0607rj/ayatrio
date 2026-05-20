"use client";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

interface SalaryGrowthChartProps {
  isHovered: boolean;
  value: number;
}

export default function SalaryGrowthChart({
  isHovered,
  value,
}: SalaryGrowthChartProps) {
  const [drawT, setDrawT] = useState(0);
  const [showMarker, setShowMarker] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [preDrawT, setPreDrawT] = useState(0);
  const [midDrawT, setMidDrawT] = useState(0);

  const pathRef = useRef<SVGPathElement | null>(null);
  const prePathRef = useRef<SVGPathElement | null>(null);
  const midPathRef = useRef<SVGPathElement | null>(null);

  const baseW = 250;
  const baseH = 200;

  const W = baseW;
  const H = baseH;
  const pad = { t: 9, r: 0, b: 30, l: 37 };

  const laneH = H - pad.t - pad.b;
  const laneW = W - pad.l - pad.r;

  const dataPoints = useMemo(
    () => [
      { stage: "start", multiplier: 1.0, x: 0.02 },
      { stage: "early", multiplier: 1.2, x: 0.12 },
      { stage: "mid1", multiplier: 1.8, x: 0.24 },
      { stage: "mid2", multiplier: 2.1, x: 0.36 },
      { stage: "plateau1", multiplier: 2.0, x: 0.44 },
      { stage: "plateau2", multiplier: 1.95, x: 0.58 },
      { stage: "plateau3", multiplier: 1.92, x: 0.66 },
      { stage: "growth1", multiplier: 2.4, x: 0.78 },
      { stage: "growth2", multiplier: 3.0, x: 0.88 },
      { stage: "final", multiplier: value, x: 0.98 },
    ],
    [value]
  );

  const yAxisScale = useMemo(() => {
    const maxValue = Math.max(...dataPoints.map((d) => d.multiplier));
    const minValue = Math.min(...dataPoints.map((d) => d.multiplier));
    const range = maxValue - minValue;
    const padding = range * 0.1;

    const scaledMax = Math.ceil((maxValue + padding) * 4) / 4;
    const scaledMin = Math.floor((minValue - padding) * 4) / 4;

    return {
      min: Math.max(0, scaledMin),
      max: scaledMax,
      range: scaledMax - Math.max(0, scaledMin),
    };
  }, [dataPoints]);

  const xFor = useCallback((t: number) => pad.l + t * laneW, [pad.l, laneW]);

  const yFor = useCallback(
    (v: number) =>
      pad.t + (1 - (v - yAxisScale.min) / yAxisScale.range) * laneH,
    [pad.t, laneH, yAxisScale]
  );

  const prePts = useMemo(
    () =>
      dataPoints.slice(0, 5).map((d) => ({
        x: xFor(d.x),
        y: yFor(d.multiplier),
        multiplier: d.multiplier,
      })),
    [dataPoints, xFor, yFor]
  );

  const midPts = useMemo(
    () =>
      dataPoints.slice(4, 7).map((d) => ({
        x: xFor(d.x),
        y: yFor(d.multiplier),
        multiplier: d.multiplier,
      })),
    [dataPoints, xFor, yFor]
  );

  const postPts = useMemo(
    () =>
      dataPoints.slice(6).map((d) => ({
        x: xFor(d.x),
        y: yFor(d.multiplier),
        multiplier: d.multiplier,
      })),
    [dataPoints, xFor, yFor]
  );

  const yAxisTicks = useMemo(() => {
    const ticks = [];
    const step = yAxisScale.range / 4;
    for (let i = 0; i <= 4; i++) {
      const tickValue = yAxisScale.min + step * i;
      ticks.push(Number(tickValue.toFixed(2)));
    }
    return ticks.reverse();
  }, [yAxisScale]);

  const keyPoints = useMemo(
    () => [
      { x: xFor(0.44), y: yFor(2.0), value: "2.0x", label: "CMP Peak" },
      { x: xFor(0.66), y: yFor(1.92), value: "1.92x", label: "Transition" },
      { x: xFor(0.88), y: yFor(3.0), value: "3.0x", label: "Growth" },
      {
        x: xFor(0.98),
        y: yFor(value),
        value: `${value.toFixed(2)}x`,
        label: "Final",
      },
    ],
    [xFor, yFor, value]
  );

  const toSmoothPath = (pts: { x: number; y: number }[]) => {
    if (!pts.length) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const mx = (a.x + b.x) / 2;
      d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    }
    return d;
  };

  const dPre = toSmoothPath(prePts);
  const dMid = toSmoothPath(midPts);
  const dPost = toSmoothPath(postPts);

  useEffect(() => {
    let raf: number | null = null;
    if (isHovered) {
      const start = performance.now();
      const totalDur = 2400;

      const step = (t: number) => {
        const elapsed = t - start;
        const progress = Math.min(elapsed / totalDur, 1);

        if (elapsed <= 800) {
          const preProgress = elapsed / 800;
          const preEase =
            preProgress < 0.5
              ? 2 * preProgress * preProgress
              : 1 - Math.pow(-2 * preProgress + 2, 2) / 2;
          setPreDrawT(preEase);
        }

        if (elapsed >= 600 && elapsed <= 1200) {
          const midProgress = (elapsed - 600) / 600;
          const midEase =
            midProgress < 0.5
              ? 2 * midProgress * midProgress
              : 1 - Math.pow(-2 * midProgress + 2, 2) / 2;
          setMidDrawT(midEase);
        }

        if (elapsed >= 1000 && elapsed <= 2000) {
          const postProgress = (elapsed - 1000) / 1000;
          const postEase =
            postProgress < 0.5
              ? 2 * postProgress * postProgress
              : 1 - Math.pow(-2 * postProgress + 2, 2) / 2;
          setDrawT(postEase);
        }

        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setShowMarker(true);
          setTimeout(() => setShowTip(true), 220);
        }
      };
      raf = requestAnimationFrame(step);
    } else {
      setDrawT(0);
      setPreDrawT(0);
      setMidDrawT(0);
      setShowMarker(false);
      setShowTip(false);
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isHovered]);

  const [totalLenPre, setTotalLenPre] = useState(1);
  const [totalLenMid, setTotalLenMid] = useState(1);
  const [totalLenPost, setTotalLenPost] = useState(1);

  useEffect(() => {
    if (prePathRef.current) {
      setTotalLenPre(prePathRef.current.getTotalLength() || 1);
    }
    if (midPathRef.current) {
      setTotalLenMid(midPathRef.current.getTotalLength() || 1);
    }
    if (pathRef.current) {
      setTotalLenPost(pathRef.current.getTotalLength() || 1);
    }
  }, [dPre, dMid, dPost]);

  const markX = postPts[postPts.length - 1].x;
  const markY = postPts[postPts.length - 1].y;

  const tooltipX = Math.min(markX, W - 60);
  const tooltipY = Math.max(markY, 40);

  return (
    <div className="flex flex-col h-full">
      {/* Heading */}
      <div className="mb-4 flex-shrink-0">
        <h4 className="flex flex-row">
          <p className="text-3xl font-bold">+{value.toFixed(2)}x</p> <span className="text-[10px] pl-[5px] pt-[15px]">| Growth 39% </span>
        </h4>
        <p className="text-sm text-gray-600">1:3 Internship Global Offer's</p>
      </div>

      {/* Chart */}
      <div className="w-full flex-1 flex items-end overflow-hidden">
        <div
          className="relative w-full overflow-hidden"
          style={{
            background: "white",
            aspectRatio: "5/3.7",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0"
            style={{ zIndex: 0 }}
            preserveAspectRatio="xMidYMid meet"
          >
            <rect
              x={pad.l}
              y={pad.t}
              width={laneW}
              height={laneH}
              fill="none"
              stroke="#0f1419"
              strokeWidth={0.3}
            />

            {yAxisTicks.slice(1, -1).map((tick) => (
              <line
                key={`grid-${tick}`}
                x1={pad.l}
                x2={W - pad.r}
                y1={yFor(tick)}
                y2={yFor(tick)}
                stroke="#374151"
                strokeWidth={0.3}
                strokeDasharray="4 6"
                opacity={0.7}
              />
            ))}

            {showMarker &&
              keyPoints.map((point) => (
                <line
                  key={`vertical-${point.label}`}
                  x1={point.x}
                  x2={point.x}
                  y1={point.y}
                  y2={H - pad.b}
                  stroke="#0f1419"
                  strokeWidth={0.3}
                  opacity={1}
                  strokeDasharray="2 2"
                />
              ))}

            {yAxisTicks.map((tick) => (
              <text
                key={`y-label-${tick}`}
                x={pad.l - 16}
                y={yFor(tick) + 4}
                className="text-[8px]"
                fill="#99a1af"
                textAnchor="end"
              >
                {tick}
              </text>
            ))}

            <text
              x={pad.l - 150}
              y={pad.t - 5}
              className="text-[8px]"
              fill="#99a1af"
              transform={`rotate(-90 ${pad.l - 24},${pad.t + 12})`}
            >
              Par Student Internship
            </text>
            <text x={pad.l} y={H - 8} className="text-[8px]" fill="#99a1af">
              3th Months
            </text>
            <text
              x={W - pad.r - 40}
              y={H - 8}
              className="text-[8px]"
              fill="#99a1af"
            >
              9th Months
            </text>
          </svg>

          <div className="w-full h-full overflow-hidden">
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0"
              style={{ zIndex: 2 }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                ref={prePathRef}
                d={dPre}
                stroke="#CC5779"
                strokeWidth={2}
                fill="none"
                opacity={0.9}
                strokeDasharray={totalLenPre}
                strokeDashoffset={totalLenPre * (1 - preDrawT)}
              />

              <path
                ref={midPathRef}
                d={dMid}
                stroke="#B30437"
                strokeWidth={2.2}
                fill="none"
                opacity={0.95}
                strokeLinecap="round"
                strokeDasharray={totalLenMid}
                strokeDashoffset={totalLenMid * (1 - midDrawT)}
              />

              <path
                ref={pathRef}
                d={dPost}
                stroke="#B30437"
                strokeWidth={2.7}
                fill="none"
                strokeDasharray={totalLenPost}
                strokeDashoffset={totalLenPost * (1 - drawT)}
              />

              <circle
                cx={markX}
                cy={markY}
                r={showMarker ? 5 : 0}
                fill="white"
                stroke="#B30437"
                strokeWidth={3}
                style={{ transition: "r 300ms ease-out" }}
              />

              <g
                style={{
                  opacity: showTip ? 1 : 0,
                  transition: "all 300ms ease-out",
                }}
              >
                <rect
                  x={tooltipX - 25}
                  y={tooltipY - 27}
                  width={50}
                  height={25}
                  rx={4}
                  fill="black"
                  opacity={0.9}
                />

                <text
                  x={tooltipX}
                  y={tooltipY - 16}
                  textAnchor="middle"
                  className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px]"
                  fill="rgb(229, 231, 235)"
                >
                  UP TO
                </text>
                <text
                  x={tooltipX}
                  y={tooltipY - 7}
                  textAnchor="middle"
                  className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-bold"
                  fill="white"
                >
                  {value.toFixed(2)}X
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
