import { useEffect, useMemo, useRef, useState } from "react";
import {
  measureTextHeight,
  measureTextWithLines,
  measureNaturalTextWidth,
  type LayoutLine,
  type PrepareOptions,
} from "../lib/pretext/pretext";

export interface UseTextMeasurementOptions {
  text: string;
  font: string; // e.g. "500 16px Inter, sans-serif"
  maxWidth?: number;
  lineHeight: number; // e.g. 24
  includeLines?: boolean;
  options?: PrepareOptions;
}

export interface TextMeasurementResult {
  height: number;
  lineCount: number;
  naturalWidth: number;
  lines: LayoutLine[];
  lineStrings: string[];
}

/**
 * High-performance hook for measuring multiline text dimensions without forced reflow.
 * Bypasses the DOM completely by running measurements using Pretext's arithmetic engine.
 */
export function useTextMeasurement({
  text,
  font,
  maxWidth,
  lineHeight,
  includeLines = false,
  options,
}: UseTextMeasurementOptions): TextMeasurementResult {
  return useMemo(() => {
    if (!text || maxWidth === undefined || maxWidth <= 0) {
      const natural = text ? measureNaturalTextWidth(text, font, options) : 0;
      return {
        height: 0,
        lineCount: 0,
        naturalWidth: natural,
        lines: [],
        lineStrings: [],
      };
    }

    const naturalWidth = measureNaturalTextWidth(text, font, options);

    if (includeLines) {
      const result = measureTextWithLines(text, font, maxWidth, lineHeight, options);
      return {
        height: result.height,
        lineCount: result.lineCount,
        naturalWidth,
        lines: result.lines,
        lineStrings: result.lines.map((l) => l.text),
      };
    }

    const result = measureTextHeight(text, font, maxWidth, lineHeight, options);
    return {
      height: result.height,
      lineCount: result.lineCount,
      naturalWidth,
      lines: [],
      lineStrings: [],
    };
  }, [text, font, maxWidth, lineHeight, includeLines, options]);
}

/**
 * Hook for measuring text within a dynamic container using ResizeObserver + Pretext.
 * Uses ResizeObserver (which triggers in the layout lifecycle without forced synchronous reflow)
 * instead of query properties like offsetHeight or getBoundingClientRect.
 */
export function useContainerTextMeasurement<T extends HTMLElement = HTMLDivElement>({
  text,
  font,
  lineHeight,
  includeLines = false,
  options,
}: Omit<UseTextMeasurementOptions, "maxWidth">) {
  const containerRef = useRef<T | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Read contentBoxSize or contentRect from observer callback (non-blocking, no reflow)
        const width = entry.contentRect.width;
        if (width > 0) {
          setContainerWidth((prev) => (Math.abs(prev - width) > 1 ? width : prev));
        }
      }
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const measurement = useTextMeasurement({
    text,
    font,
    maxWidth: containerWidth,
    lineHeight,
    includeLines,
    options,
  });

  return {
    containerRef,
    containerWidth,
    ...measurement,
  };
}

// Export convenient aliases
export const usePretext = useTextMeasurement;
export const useContainerPretext = useContainerTextMeasurement;
