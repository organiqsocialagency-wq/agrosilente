"use client";

// React Bits — David Haz. See THIRD_PARTY_NOTICES.md for source and license.
import { useReducedMotion } from "framer-motion";
import React, {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";

export interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || shouldReduceMotion) return;

    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const resetPosition = () => {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current || !pointerQuery.matches) return;

      const { left, top, width, height } =
        magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("blur", resetPosition);
    pointerQuery.addEventListener("change", resetPosition);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", resetPosition);
      pointerQuery.removeEventListener("change", resetPosition);
    };
  }, [padding, disabled, magnetStrength, shouldReduceMotion]);

  const isMotionDisabled = disabled || shouldReduceMotion;
  const transitionStyle = isMotionDisabled
    ? "none"
    : isActive
      ? activeTransition
      : inactiveTransition;

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: isMotionDisabled
            ? "none"
            : `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitionStyle,
          willChange: isMotionDisabled ? "auto" : "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
