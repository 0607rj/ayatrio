"use client";

import { useEffect, useRef } from "react";

interface HighlightTextProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
    activeColor?: string;
    bgColor?: string;
    threshold?: number;
}

export default function HighlightText({
    children,
    className = "",
    color = "black",
    activeColor = "#0d2b1f",
    bgColor = "#A9FF9B",
    threshold = 0.6,
}: HighlightTextProps) {
    const wrapRef = useRef<HTMLSpanElement>(null);
    const bgRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const dotTLRef = useRef<HTMLSpanElement>(null);
    const dotBRRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (bgRef.current) {
                        bgRef.current.style.transform = "scaleX(1)";
                    }

                    setTimeout(() => {
                        if (textRef.current) {
                            textRef.current.style.color = activeColor;
                        }
                    }, 450);

                    setTimeout(() => {
                        if (dotTLRef.current) dotTLRef.current.style.opacity = "1";
                        if (dotBRRef.current) dotBRRef.current.style.opacity = "1";
                    }, 750);
                } else {
                    if (bgRef.current) {
                        bgRef.current.style.transform = "scaleX(0)";
                    }
                    if (textRef.current) {
                        textRef.current.style.color = color;
                    }
                    if (dotTLRef.current) dotTLRef.current.style.opacity = "0";
                    if (dotBRRef.current) dotBRRef.current.style.opacity = "0";
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [color, activeColor, threshold]);

    const dotStyle: React.CSSProperties = {
        position: "absolute",
        width: 11,
        height: 11,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        background: bgColor,
        opacity: 0,
        transition: "opacity 0.2s ease",
        zIndex: 2,
    };

    return (
        <span
            ref={wrapRef}
            className={className}
            style={{
                position: "relative",
                display: "inline-block",
                padding: "2px 7px",
                zIndex: 0,
            }}
        >
            {/* top-left dot */}
            <span ref={dotTLRef} style={{ ...dotStyle, borderBottomRightRadius: 0, top: -11, left: -11 }} />

            {/* background */}
            <span
                ref={bgRef}
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    background: bgColor,
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    transition: "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)",
                    zIndex: -1,
                }}
            />

            {/* text */}
            <span
                ref={textRef}
                style={{
                    position: "relative",
                    zIndex: 1,
                    color: color,
                    transition: "color 0.15s ease",
                }}
            >
                {children}
            </span>

            {/* bottom-right dot */}
            <span ref={dotBRRef} style={{ ...dotStyle, borderTopLeftRadius: 0, bottom: -11, right: -11 }} />
        </span>
    );
}