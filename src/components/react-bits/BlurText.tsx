"use client";

// React Bits — David Haz. See THIRD_PARTY_NOTICES.md for source and license.
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Transition,
  type Easing,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type HTMLAttributes,
} from "react";

export type BlurTextProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  children?: ReactNode;
  repeat?: boolean;
  scrollLinked?: boolean;
  animationEnabled?: boolean;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>,
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  animationEnabled = true,
  as: Component = "p",
  text = "",
  children,
  repeat = true,
  scrollLinked = true,
  delay = 20,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0,
  rootMargin = "24px 0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.18,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const exitOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.94, 1],
    [0, 1, 1, 0],
  );
  const exitBlur = useTransform(
    scrollYProgress,
    [0, 0.05, 0.94, 1],
    ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !animationEnabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) observer.unobserve(element);
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, animationEnabled, repeat]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(8px)", opacity: 0, y: -16 }
        : { filter: "blur(8px)", opacity: 0, y: 16 },
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(0px)",
        opacity: 1,
        y: direction === "top" ? 2 : -2,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  );

  const countWords = (nodes: ReactNode): number =>
    Children.toArray(nodes).reduce<number>((total, node) => {
      if (typeof node === "string" || typeof node === "number") {
        return (
          total +
          (animateBy === "letters"
            ? String(node).split("")
            : String(node).split(/\s+/)
          ).filter((segment) => segment.trim()).length
        );
      }
      return (
        total +
        (isValidElement<{ children?: ReactNode }>(node)
          ? countWords(node.props.children)
          : 0)
      );
    }, 0);
  const lastWordIndex = countWords(children ?? text) - 1;
  const Copy = Component === "div" ? motion.div : motion.span;
  let wordIndex = 0;
  const renderCopy = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (node) => {
      if (typeof node === "string" || typeof node === "number") {
        const segments =
          animateBy === "letters"
            ? String(node).split("")
            : String(node).split(/(\s+)/);
        return segments.map((segment, i) => {
          if (/^\s+$/.test(segment)) return " ";
          if (!segment) return null;
          const index = wordIndex++;
          const transition: Transition = {
            duration: shouldReduceMotion ? 0 : inView ? totalDuration : 0.15,
            times: inView ? times : undefined,
            delay:
              shouldReduceMotion || !inView
                ? 0
                : Math.min((index * delay) / 1000, 0.09),
            ease: easing,
          };
          return (
            <motion.span
              key={i}
              initial={shouldReduceMotion ? false : fromSnapshot}
              animate={
                shouldReduceMotion
                  ? toSnapshots.at(-1)
                  : inView
                    ? buildKeyframes(fromSnapshot, toSnapshots)
                    : fromSnapshot
              }
              transition={transition}
              onAnimationComplete={
                index === lastWordIndex ? onAnimationComplete : undefined
              }
              style={{ display: "inline-block" }}
            >
              {segment}
            </motion.span>
          );
        });
      }
      if (
        isValidElement<{ children?: ReactNode }>(node) &&
        node.props.children
      ) {
        return cloneElement(node, {}, renderCopy(node.props.children));
      }
      return node;
    });

  return (
    <Component ref={ref} className={`blur-text ${className}`} {...rest}>
      <Copy
        style={{
          opacity: shouldReduceMotion || !scrollLinked ? 1 : exitOpacity,
          filter: shouldReduceMotion || !scrollLinked ? "none" : exitBlur,
        }}
      >
        {renderCopy(children ?? text)}
      </Copy>
    </Component>
  );
};

export default BlurText;
