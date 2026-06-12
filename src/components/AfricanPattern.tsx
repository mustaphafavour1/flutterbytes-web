interface Props {
  color?: string;
  opacity?: number;
  className?: string;
}

export default function AfricanPattern({
  color = "#2A9DF4",
  opacity = 0.08,
  className = "",
}: Props) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="africanPattern"
          x="0"
          y="0"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          {/* Diamond */}
          <polygon
            points="24,4 44,24 24,44 4,24"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
          {/* Inner diamond */}
          <polygon
            points="24,14 34,24 24,34 14,24"
            fill={color}
            opacity="0.3"
          />
          {/* Corner dots */}
          <circle cx="24" cy="4" r="2" fill={color} />
          <circle cx="44" cy="24" r="2" fill={color} />
          <circle cx="24" cy="44" r="2" fill={color} />
          <circle cx="4" cy="24" r="2" fill={color} />
          {/* Cross lines */}
          <line
            x1="0"
            y1="0"
            x2="12"
            y2="12"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.4"
          />
          <line
            x1="48"
            y1="0"
            x2="36"
            y2="12"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.4"
          />
          <line
            x1="0"
            y1="48"
            x2="12"
            y2="36"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.4"
          />
          <line
            x1="48"
            y1="48"
            x2="36"
            y2="36"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#africanPattern)" />
    </svg>
  );
}
