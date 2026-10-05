import type { SVGProps } from "react";

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      {...props}
    >
      <circle cx="32" cy="32" r="12" />
      <path d="M32 3v10m0 38v10M3 32h10m38 0h10M11.5 11.5l7 7m27 27 7 7m0-41-7 7m-27 27-7 7" />
    </svg>
  );
}

export function TrulliIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 72 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 34 22 8l18 26H4Zm29 0L48 13l15 21H33ZM10 34v11h24V34m5 0v11h18V34M18 45V34h8v11M14 20h16M11 25h22M8 30h29m5-7h12m-16 6h20M22 8V3m-2 0h4m24 10V8" />
    </svg>
  );
}
