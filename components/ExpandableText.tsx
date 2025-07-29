"use client";
import React, { useState } from "react";

export function ExpandableText({ children }: { children: string }) {
  const charLimit = 250;
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;
  const shouldTruncate = text.length > charLimit && !isExpanded;

  const displayedText = shouldTruncate
    ? text.substring(0, charLimit) + "..."
    : text;

  return (
    <div>
      <div className="hidden lg:flex">{children}</div>
      <div className="flex flex-col lg:hidden">
        <p>{displayedText}</p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(true)}
            className="underline font-extralight"
          >
            Show More
          </button>
        )}
        {isExpanded && text.length > charLimit && (
          <button
            onClick={() => setIsExpanded(false)}
            className="underline font-extralight"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
