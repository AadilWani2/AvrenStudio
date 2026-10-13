import { type ReactNode, useMemo } from "react";
import { useContainerTextMeasurement } from "../../hooks/useTextMeasurement";

interface PretextSplitTextProps {
  children: string;
  font?: string; // CSS font string e.g. "500 24px Inter"
  lineHeight?: number; // Line height in px
  className?: string;
  lineClassName?: string;
  maskClassName?: string;
  renderLine?: (lineText: string, index: number) => ReactNode;
  fallbackTag?: "div" | "h1" | "h2" | "h3" | "p";
}

/**
 * SplitText component powered by Pretext.
 * Breaks multiline text into lines for staggered reveal animations
 * WITHOUT querying DOM layout properties (zero forced reflow / zero layout thrashing).
 */
export function PretextSplitText({
  children,
  font = '500 16px Inter, sans-serif',
  lineHeight = 24,
  className = "",
  lineClassName = "",
  maskClassName = "overflow-hidden",
  renderLine,
  fallbackTag = "div",
}: PretextSplitTextProps) {
  const { containerRef, lineStrings, containerWidth } = useContainerTextMeasurement({
    text: children,
    font,
    lineHeight,
    includeLines: true,
  });

  // Pre-split fallback before container width is resolved or if single line
  const linesToRender = useMemo(() => {
    if (lineStrings.length > 0) return lineStrings;
    // Initial render before ResizeObserver fires
    return [children];
  }, [lineStrings, children]);

  const Tag = fallbackTag;

  return (
    <Tag ref={containerRef} className={`relative ${className}`}>
      {linesToRender.map((lineText, index) => (
        <span key={`${index}-${lineText}`} className={`block ${maskClassName}`}>
          {renderLine ? (
            renderLine(lineText, index)
          ) : (
            <span className={`block transform-gpu ${lineClassName}`}>
              {lineText}
            </span>
          )}
        </span>
      ))}
      {/* Invisible anchor to preserve natural flow while width is measuring */}
      {containerWidth === 0 && (
        <span aria-hidden="true" className="invisible absolute inset-0 pointer-events-none select-none">
          {children}
        </span>
      )}
    </Tag>
  );
}

export default PretextSplitText;
