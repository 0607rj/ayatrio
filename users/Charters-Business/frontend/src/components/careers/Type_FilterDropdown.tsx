"use client";

import { useState, useRef, useEffect } from "react";

interface MultiSelectDropdownProps {
    label: string;
    icon: React.ReactNode;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}

export default function MultiSelectDropdown({
    label,
    icon,
    options,
    selected,
    onChange,
}: MultiSelectDropdownProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [draft, setDraft] = useState<string[]>(selected); // ← local draft
    const ref = useRef<HTMLDivElement>(null);

    // Sync draft when dropdown opens
    useEffect(() => {
        if (open) setDraft(selected);
    }, [open]);

    // Close on outside click — commit draft on outside click too
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch("");
                setDraft(selected); // reset draft if closed without confirming
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [selected]);

    const filtered = options.filter((o) =>
        o.toLowerCase().includes(search.toLowerCase())
    );

    // Toggle only updates local draft — no parent call yet
    const toggle = (option: string) => {
        setDraft((prev) =>
            prev.includes(option)
                ? prev.filter((s) => s !== option)
                : [...prev, option]
        );
    };

    const reset = () => {
        setDraft([]);
        setSearch("");
    };

    // Only call onChange when user clicks "Show results"
    const confirm = () => {
        onChange(draft);
        setOpen(false);
        setSearch("");
    };

    // Clear pill (bypass draft, directly clear parent)
    const clearAll = () => {
        setDraft([]);
        onChange([]);
    };

    const displayLabel =
        selected.length === 0
            ? label
            : selected.length === 1
                ? selected[0]
                : `${selected[0]} +${selected.length - 1}`;

    return (
        <div ref={ref} className="relative">
            {/* Trigger pill */}
            <button
                onClick={() => setOpen((o) => !o)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs border rounded-sm bg-gray-50 transition-colors focus:outline-none
          ${selected.length > 0
                        ? "border-[#B30437] text-[#B30437] bg-red-50"
                        : "border-gray-200 text-gray-600"
                    }`}
            >
                <span className="flex-shrink-0 w-3.5 h-3.5">{icon}</span>
                <span className="max-w-[110px] truncate">{displayLabel}</span>
                {selected.length > 0 && (
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            clearAll();
                        }}
                        className="ml-0.5 flex-shrink-0 text-[#B30437] hover:text-red-800 cursor-pointer leading-none"
                    >
                        ✕
                    </span>
                )}
                <svg
                    className={`w-3 h-3 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown panel */}
            {open && (
                <div className="absolute right-0 top-full mt-1 z-50 w-64 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {/* Search */}
                    <div className="p-2 border-b border-gray-100">
                        <input
                            type="text"
                            placeholder={`Add a ${label.toLowerCase()}`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#B30437]"
                        />
                    </div>

                    {/* Options list */}
                    <ul className="max-h-56 overflow-y-auto">
                        {filtered.length === 0 ? (
                            <li className="px-4 py-3 text-sm text-gray-400">No results</li>
                        ) : (
                            filtered.map((option) => {
                                const checked = draft.includes(option); // ← use draft not selected
                                return (
                                    <li key={option}>
                                        <label className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => toggle(option)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-4 h-4 flex-shrink-0 border-2 rounded-sm flex items-center justify-center transition-colors ${checked
                                                        ? "bg-[#B30437] border-[#B30437]"
                                                        : "border-gray-300"
                                                    }`}
                                            >
                                                {checked && (
                                                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-700">{option}</span>
                                        </label>
                                    </li>
                                );
                            })
                        )}
                    </ul>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-gray-50">
                        <button
                            onClick={reset}
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={confirm} // ← only fires onChange here
                            className="text-sm font-semibold text-white px-4 py-1.5 rounded-md transition-colors"
                            style={{ backgroundColor: "#B30437" }}
                        >
                            Show results
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}