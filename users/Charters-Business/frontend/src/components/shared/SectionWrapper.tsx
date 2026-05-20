import { ReactNode } from "react";

type HideCorner = "tl" | "tr" | "bl" | "br";
type CornerVariant = "icon" | "line";

interface CornerConfig {
    variant?: CornerVariant;
    hidden?: boolean;
}

interface SectionWrapperProps {
    children: ReactNode;
    borderBottom?: boolean;
    fullWidthBg?: boolean;
    className?: string;
    hideCorners?: HideCorner[] | "all";
    cornerVariant?: CornerVariant;
    corners?: Partial<Record<HideCorner, CornerConfig>>;
}

//angle icon
const LINE_SIZE = 45;

const LINE_POSITIONS: Record<HideCorner, React.CSSProperties> = {
    tl: { top: -23, left: -23 },
    tr: { top: -23, right: -23 },
    bl: { bottom: -23, left: -23 },
    br: { bottom: -23, right: -23 },
};

// Rotation per corner 
const LINE_ROTATIONS: Record<HideCorner, number> = {
    tl: 0,    
    tr: 90,  
    bl: 270, 
    br: 180,  
};

//Icon corner 
const ICON_SIZE = 45;

const ICON_POSITIONS: Record<HideCorner, React.CSSProperties> = {
    tl: { top: -23, left: -23 },
    tr: { top: -23, right: -23 },
    bl: { bottom: -23, left: -23 },
    br: { bottom: -23, right: -23 },
};


export default function SectionWrapper({
    children,
    borderBottom = true,
    fullWidthBg = false,
    className = "",
    hideCorners,
    cornerVariant = "line",
    corners = {},
}: SectionWrapperProps) {
    const ALL: HideCorner[] = ["tl", "tr", "bl", "br"];

    const globallyHidden: HideCorner[] =
        hideCorners === "all" ? ALL : hideCorners ?? [];

    const resolved = ALL.map((key) => {
        const perCorner = corners[key] ?? {};
        const hidden = perCorner.hidden ?? globallyHidden.includes(key);
        const variant = perCorner.variant ?? cornerVariant;
        return { key, hidden, variant };
    });

    const iconCorners = resolved.filter((c) => !c.hidden && c.variant === "icon");
    const lineCorners = resolved.filter((c) => !c.hidden && c.variant === "line");

    return (
        <div
            className={`relative ${borderBottom ? "border-b border-gray-200" : ""} ${className}`}
        >
            {/* Line corners */}
            {lineCorners.map(({ key }) => (
                <img
                    key={key}
                    src="/joint-angle-icon.svg"
                    alt=""
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        width: LINE_SIZE,
                        height: LINE_SIZE,
                        zIndex: 10,
                        pointerEvents: "none",
                        transform: `rotate(${LINE_ROTATIONS[key]}deg)`,
                        ...LINE_POSITIONS[key],
                    }}
                />
            ))}

            {/* joint icon */}
            {iconCorners.map(({ key }) => (
                <img
                    key={key}
                    src="/joint-icon.svg"
                    alt=""
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        width: ICON_SIZE,
                        height: ICON_SIZE,
                        zIndex: 10,
                        pointerEvents: "none",
                        ...ICON_POSITIONS[key],
                    }}
                />
            ))}

            {fullWidthBg ? <div className="full-bleed">{children}</div> : children}
        </div>
    );
}