"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type NavItem = { id: string; label: string; withIcon?: boolean };

export const CAREERS_NAV_ITEMS: NavItem[] = [
  { id: "statistics", label: "Statistics", withIcon: true },
  { id: "stories", label: "Stories" },
  { id: "transitions", label: "Transitions" },
  { id: "advisory", label: "Career Advisory Team" },
  { id: "guidance", label: "Guidance" },
];

type Props = {
  offsetTop?: number; 
};


export default function Subnav({ offsetTop = 0 }: Props) {
  const [active, setActive] = useState<string>(CAREERS_NAV_ITEMS[0]?.id ?? "");

  const targets = useMemo(
    () =>
      CAREERS_NAV_ITEMS.map((i) => ({
        id: i.id,
        el: typeof document !== "undefined" ? document.getElementById(i.id) : null,
      })),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      {

        threshold: [0.4],
        rootMargin: "-10% 0px -50% 0px",
      }
    );

    targets.forEach((t) => t.el && obs.observe(t.el));
    return () => obs.disconnect();
  }, [targets]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const y = window.scrollY + rect.top - offsetTop;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  };

  return (
    <section
      aria-label="Careers sub-navigation"
      className="sticky top-[var(--navbar-height,86px)] z-10 flex flex-col justify-center items-center w-full border-b border-gray-200 bg-white"
      style={{ top: 'var(--navbar-height,86px)' }}
    >
      <nav aria-label="Section navigation" className="md:w-[90%] max-w-[85rem] border-x border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto py-1 sm:py-2 scrollbar-hide">
            {CAREERS_NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <Link
                    href={`#${item.id}`}
                    onClick={handleClick(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "group inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-1 pb-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                      isActive
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-900",
                    ].join(" ")}
                  >
                    {item.withIcon ? (
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4 text-gray-700"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M3 15h3V5H3v10zm5 0h3V9H8v6zm5 0h3V3h-3v12z"
                        />
                      </svg>
                    ) : null}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </section>
  );
}
