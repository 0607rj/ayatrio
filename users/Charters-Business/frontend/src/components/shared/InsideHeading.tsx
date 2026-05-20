import React from "react";

interface Props {
  title: string;
  description?: string;
  badgeText?: string | null;
}

export default function InsideHeading({
  title,
  description,
  badgeText = null,
}: Props) {
  return (
    <div className="mb-1 flex-shrink-0">
      <div className="flex items-start justify-between">
        <h3 className="text-xl sm:text-xl font-bold text-black mb-1">
          {title}
        </h3>
        {badgeText ? (
          <span className="text-[10px] font-semibold bg-blue-700 text-white px-2 py-0.5 rounded-full">
            {badgeText}
          </span>
        ) : null}
      </div>

      {description ? (
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
