import { useId, type CSSProperties } from "react";
import { brand } from "@/lib/brand";

// Single pinnacle silhouette reconstructed from direction B of the supplied moodboard.
const pinnacle = "M35 35C35 28 85 28 85 35C85 41 66 49 65 61C64 77 84 96 104 112H16C36 96 56 77 55 61C54 49 35 41 35 35Z";

function delay(seconds: number): CSSProperties {
  return { "--draw-delay": `${seconds}s` } as CSSProperties;
}

export function BrandMark({ animated = false, className = "" }: {
  animated?: boolean;
  className?: string;
}) {
  const gradient = `pinnacle-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 120 126" fill="none" aria-hidden="true"
      className={`brand-mark ${animated ? "brand-mark-building" : ""} ${className}`}>
      <defs>
        <linearGradient id={gradient} x1="30" y1="10" x2="100" y2="118" gradientUnits="userSpaceOnUse">
          <stop stopColor="#94643b" />
          <stop offset="0.52" stopColor="#704421" />
          <stop offset="1" stopColor="#512e19" />
        </linearGradient>
      </defs>
      <g className="logo-fill" fill={`url(#${gradient})`}>
        <circle cx="60" cy="18" r="10" />
        <path d={pinnacle} />
      </g>
      <g className="logo-outline" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path className="logo-draw" pathLength="1" style={delay(0.1)} d={pinnacle} />
        <circle className="logo-draw" pathLength="1" style={delay(0.8)} cx="60" cy="18" r="10" />
      </g>
    </svg>
  );
}

export function BrandLogo({ animated = false, className = "" }: {
  animated?: boolean;
  className?: string;
}) {
  return (
    <span className={`brand-logo ${animated ? "brand-logo-building" : ""} ${className}`}
      role="img" aria-label={`${brand.name}, B&B a Locorotondo`}>
      <BrandMark animated={animated} />
      <span className="brand-word" aria-hidden="true">
        {brand.name.toUpperCase().split("").map((letter, index) => (
          <span key={index} style={delay(1.45 + index * 0.035)}>{letter === " " ? "\u00a0" : letter}</span>
        ))}
      </span>
      <span className="brand-descriptor" aria-hidden="true"><i />B &amp; B<i /></span>
    </span>
  );
}
