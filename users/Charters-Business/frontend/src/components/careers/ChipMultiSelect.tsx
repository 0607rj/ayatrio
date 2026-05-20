// InlineCategoryChips.tsx
"use client";

interface InlineCategoryChipsProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}

export default function ChipMultiSelect({
    options,
    selected,
    onChange,
}: InlineCategoryChipsProps) {
    const toggle = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter((s) => s !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => {
                const isSelected = selected.includes(option);
                return (
                    <button
                        key={option}
                        onClick={() => toggle(option)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-sm text-xs font-medium border transition-all duration-150 focus:outline-none
              ${isSelected
                                ? "bg-[#B30437] border-[#B30437] text-white"
                                : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 hover:border-gray-300"
                            }`}
                    >
                        {option}
                        {isSelected && (
                            <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                );
            })}
        </div>
    );
}