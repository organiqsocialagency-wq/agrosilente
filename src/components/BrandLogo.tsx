import { useId, type CSSProperties } from "react";

// Vector reconstruction of the three trulli and olive branch in the supplied brand moodboard.
const roofs = [
  { id: "left", cx: 88, top: 77, bottom: 173, half: 65, shift: 0 },
  { id: "right", cx: 244, top: 62, bottom: 166, half: 62, shift: 0.16 },
  { id: "center", cx: 174, top: 36, bottom: 171, half: 82, shift: 0.08 },
];

function delay(seconds: number): CSSProperties {
  return { "--draw-delay": `${seconds}s` } as CSSProperties;
}

export function BrandMark({
  animated = false,
  className = "",
}: {
  animated?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 360 230"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`brand-mark ${animated ? "brand-mark-building" : ""} ${className}`}
    >
      <defs>
        {roofs.map((roof) => (
          <clipPath key={roof.id} id={`${id}-${roof.id}`}>
            <path
              d={`M${roof.cx - roof.half} ${roof.bottom} Q${roof.cx - 14} ${roof.top + 36} ${roof.cx} ${roof.top} Q${roof.cx + 14} ${roof.top + 36} ${roof.cx + roof.half} ${roof.bottom}Z`}
            />
          </clipPath>
        ))}
      </defs>
      <g className="logo-walls">
        <path
          className="logo-draw"
          style={delay(0)}
          pathLength="1"
          d="M31 203V174M31 203h111m79 0h62v-36M142 205v-33l20-23h25l19 23v33"
        />
        <path
          className="logo-draw"
          style={delay(0.1)}
          pathLength="1"
          d="M155 205v-43h38v43m-38 0h38M67 186v-9h10v9H67"
        />
      </g>
      {roofs.map((roof) => {
        const outline = `M${roof.cx - roof.half} ${roof.bottom} Q${roof.cx - 14} ${roof.top + 36} ${roof.cx} ${roof.top} Q${roof.cx + 14} ${roof.top + 36} ${roof.cx + roof.half} ${roof.bottom}`;
        const rows = Math.floor((roof.bottom - roof.top - 16) / 6);
        return (
          <g key={roof.id}>
            <path
              d={`${outline}Z`}
              fill="var(--logo-paper, #f1eee7)"
              stroke="none"
            />
            <g clipPath={`url(#${id}-${roof.id})`} strokeWidth="0.75">
              {Array.from({ length: rows }, (_, row) => {
                const y = roof.bottom - 4 - row * 6;
                const joints = Array.from({ length: 12 }, (_, j) => {
                  const x = roof.cx - roof.half + j * 15 + (row % 2) * 7;
                  return `M${x} ${y}v-4`;
                }).join(" ");
                return (
                  <path
                    key={row}
                    className="logo-draw logo-stones"
                    pathLength="1"
                    style={delay(0.4 + roof.shift + row * 0.055)}
                    d={`M${roof.cx - roof.half - 2} ${y}Q${roof.cx} ${y - 3} ${roof.cx + roof.half + 2} ${y} ${joints}`}
                  />
                );
              })}
            </g>
            <path
              className="logo-draw"
              pathLength="1"
              style={delay(0.22 + roof.shift)}
              d={outline}
            />
            <path
              className="logo-draw"
              pathLength="1"
              style={delay(1.2 + roof.shift)}
              d={`M${roof.cx - 7} ${roof.top + 15}Q${roof.cx} ${roof.top + 10} ${roof.cx + 7} ${roof.top + 15}M${roof.cx} ${roof.top}v-7m-4 0h8`}
            />
            <circle
              className="logo-draw"
              pathLength="1"
              style={delay(1.3 + roof.shift)}
              cx={roof.cx}
              cy={roof.top - 12}
              r="3.6"
            />
          </g>
        );
      })}
      <path
        d="M139 207v-34l24-25h23l22 25v34"
        fill="var(--logo-paper, #f1eee7)"
        stroke="none"
      />
      <path
        className="logo-draw"
        pathLength="1"
        style={delay(0.12)}
        d="M144 206v-34l20-21h20l19 21v34M155 205v-42h37v42m-37 0h37"
      />
      <g className="logo-olive" strokeWidth="1">
        <path
          className="logo-draw"
          pathLength="1"
          style={delay(1.35)}
          d="M305 213Q301 181 311 145Q316 125 313 104M305 196l-19-22m20 12 20-20m-18 5-18-24m20 12 19-23m-17 9-14-20"
        />
        {[
          "M313 125Q305 112 313 101Q318 112 313 125Z",
          "M311 143Q305 126 298 123Q295 135 311 143Z",
          "M315 138Q321 122 331 120Q330 133 315 138Z",
          "M310 160Q297 153 289 141Q301 141 310 160Z",
          "M312 158Q321 142 336 141Q331 154 312 158Z",
          "M307 180Q294 174 283 159Q298 160 307 180Z",
          "M307 181Q321 161 334 163Q330 177 307 181Z",
          "M305 199Q287 187 281 176Q295 177 305 199Z",
          "M306 199Q318 183 331 183Q324 196 306 199Z",
        ].map((d, i) => (
          <path
            key={d}
            className="logo-leaf"
            style={delay(1.45 + i * 0.045)}
            d={d}
            fill="currentColor"
            fillOpacity="0.12"
          />
        ))}
      </g>
    </svg>
  );
}

export function BrandLogo({
  animated = false,
  className = "",
}: {
  animated?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`brand-logo ${animated ? "brand-logo-building" : ""} ${className}`}
      aria-label="Agrosilente, dimore in Puglia"
    >
      <BrandMark animated={animated} />
      <span className="brand-word" aria-hidden="true">
        {"AGROSILENTE".split("").map((letter, index) => (
          <span key={index} style={delay(1.55 + index * 0.045)}>
            {letter}
          </span>
        ))}
      </span>
      <span className="brand-descriptor" aria-hidden="true">
        DIMORE IN PUGLIA
      </span>
    </span>
  );
}
