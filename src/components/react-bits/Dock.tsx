"use client";

// Adapted from the React Bits Dock source supplied by the user. See THIRD_PARTY_NOTICES.md.
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";
import { useRef, useSyncExternalStore } from "react";
import "./Dock.css";

export interface DockItemData {
  label: string;
  mobileLabel?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}
const query = "(hover: hover) and (pointer: fine) and (min-width: 768px)";
const subscribe = (callback: () => void) => {
  const media = matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const snapshot = () => matchMedia(query).matches;
const serverSnapshot = () => false;
const defaultSpring = { mass: 0.2, stiffness: 170, damping: 20 };

function DockItem({
  item,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  enabled,
}: {
  item: DockItemData;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
  enabled: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    return val - (rect ? rect.x + rect.width / 2 : 0);
  });
  const target = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
  );
  const size = useSpring(target, spring);
  const width = useTransform(size, [baseItemSize, magnification], [94, 110]);
  const contents = (
    <motion.span className="dock-text">
      <span className={item.mobileLabel ? "dock-label-desktop" : undefined}>
        {item.label}
      </span>
      {item.mobileLabel && (
        <span className="dock-label-mobile">{item.mobileLabel}</span>
      )}
    </motion.span>
  );
  return (
    <motion.div
      ref={ref}
      className={`dock-item ${item.className ?? ""}`}
      style={{
        paddingInline: 0,
        width: enabled ? width : 94,
        height: enabled ? size : baseItemSize,
      }}
    >
      {item.href ? (
        <a href={item.href} className="dock-control">
          {contents}
        </a>
      ) : (
        <button
          type="button"
          onClick={item.onClick}
          className="dock-control"
          aria-haspopup="dialog"
        >
          {contents}
        </button>
      )}
    </motion.div>
  );
}

export default function Dock({
  items,
  className = "",
  spring = defaultSpring,
  magnification = 66,
  distance = 130,
  panelHeight = 72,
  baseItemSize = 46,
}: {
  items: DockItemData[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
}) {
  const mouseX = useMotionValue(Infinity);
  const finePointer = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;
  return (
    <nav
      className={`dock-panel ${className}`}
      aria-label="Navigazione principale"
      style={{ minHeight: panelHeight }}
      onPointerMove={(event) => {
        if (enabled && event.pointerType === "mouse") mouseX.set(event.clientX);
      }}
      onPointerLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item) => (
        <DockItem
          key={item.label}
          item={item}
          mouseX={mouseX}
          spring={spring}
          distance={distance}
          magnification={magnification}
          baseItemSize={baseItemSize}
          enabled={enabled}
        />
      ))}
    </nav>
  );
}
