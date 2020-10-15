import React from "react";

export default function Arrow({ className, color }) {
  color = color || "var(--primary-color)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 45 27"
    >
      <g id="Group_1" data-name="Group 1" transform="translate(-157 -104)">
        <rect
          id="Rectangle_2"
          data-name="Rectangle 2"
          width="45"
          height="5"
          rx="2.5"
          transform="translate(157 104)"
          fill={color}
        />
        <rect
          id="Rectangle_3"
          data-name="Rectangle 3"
          width="45"
          height="5"
          rx="2.5"
          transform="translate(157 115)"
          fill={color}
        />
        <rect
          id="Rectangle_4"
          data-name="Rectangle 4"
          width="36"
          height="5"
          rx="2.5"
          transform="translate(166 126)"
          fill={color}
        />
      </g>
    </svg>
  );
}
