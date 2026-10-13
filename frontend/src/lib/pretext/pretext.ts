import {
  prepare,
  prepareWithSegments,
  layout,
  layoutWithLines,
  measureLineStats,
  measureNaturalWidth,
  clearCache as pretextClearCache,
  setLocale as pretextSetLocale,
  type PreparedText,
  type PreparedTextWithSegments,
  type PrepareOptions,
  type LayoutResult,
  type LayoutLine,
  type LayoutLinesResult,
  type LineStats,
} from "@chenglou/pretext";

// In-memory cache for prepared text handles to avoid redundant segmentations and glyph measurements
const preparedCache = new Map<string, PreparedTextWithSegments>();
const preparedBasicCache = new Map<string, PreparedText>();

/**
 * Builds a cache key for text + font + options
 */
function getCacheKey(text: string, font: string, options?: PrepareOptions): string {
  if (!options) return `${font}:::${text}`;
  return `${font}:::${options.whiteSpace || "normal"}:::${options.wordBreak || "normal"}:::${options.letterSpacing || 0}:::${text}`;
}

/**
 * Get or create a PreparedTextWithSegments handle (includes segment data for line extraction).
 * Prepared once via canvas text measurement, then reused for pure-math layouts.
 */
export function getPreparedTextWithSegments(
  text: string,
  font: string,
  options?: PrepareOptions,
): PreparedTextWithSegments {
  const key = getCacheKey(text, font, options);
  let prepared = preparedCache.get(key);
  if (!prepared) {
    prepared = prepareWithSegments(text, font, options);
    preparedCache.set(key, prepared);
  }
  return prepared;
}

/**
 * Get or create a basic PreparedText handle (lightweight, for height/lineCount calculation only).
 */
export function getPreparedText(
  text: string,
  font: string,
  options?: PrepareOptions,
): PreparedText {
  const key = getCacheKey(text, font, options);
  let prepared = preparedBasicCache.get(key);
  if (!prepared) {
    prepared = prepare(text, font, options);
    preparedBasicCache.set(key, prepared);
  }
  return prepared;
}

/**
 * Measure text height and line count without touching the DOM or causing forced reflow.
 * Uses Pretext's pure arithmetic layout engine.
 *
 * @param text The text to measure
 * @param font Valid CSS font string (e.g. '500 16px Inter, sans-serif')
 * @param maxWidth Container width constraint in pixels
 * @param lineHeight Line height in pixels (e.g. 24 for 1.5 * 16px)
 * @param options Prepare options (whiteSpace, wordBreak, letterSpacing)
 * @returns { height: number, lineCount: number }
 */
export function measureTextHeight(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number,
  options?: PrepareOptions,
): LayoutResult {
  if (!text || maxWidth <= 0) {
    return { lineCount: 0, height: 0 };
  }
  const prepared = getPreparedText(text, font, options);
  return layout(prepared, maxWidth, lineHeight);
}

/**
 * Measure text and break into lines without touching the DOM or causing forced reflow.
 * Replaces expensive DOM-based split-text / layout measurement loops.
 *
 * @param text The text to measure
 * @param font Valid CSS font string (e.g. '500 16px Inter, sans-serif')
 * @param maxWidth Container width constraint in pixels
 * @param lineHeight Line height in pixels
 * @param options Prepare options
 * @returns { height, lineCount, lines: LayoutLine[] }
 */
export function measureTextWithLines(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number,
  options?: PrepareOptions,
): LayoutLinesResult {
  if (!text || maxWidth <= 0) {
    return { lineCount: 0, height: 0, lines: [] };
  }
  const prepared = getPreparedTextWithSegments(text, font, options);
  return layoutWithLines(prepared, maxWidth, lineHeight);
}

/**
 * Compute line strings for text at a given width constraint without DOM measurement.
 */
export function splitTextLines(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number,
  options?: PrepareOptions,
): string[] {
  const result = measureTextWithLines(text, font, maxWidth, lineHeight, options);
  return result.lines.map((l) => l.text);
}

/**
 * Measure the single-line natural width of text (no wrapping).
 */
export function measureNaturalTextWidth(
  text: string,
  font: string,
  options?: PrepareOptions,
): number {
  if (!text) return 0;
  const prepared = getPreparedTextWithSegments(text, font, options);
  return measureNaturalWidth(prepared);
}

/**
 * Measure line count and maximum line width for a wrapped block.
 */
export function measureTextLineStats(
  text: string,
  font: string,
  maxWidth: number,
  options?: PrepareOptions,
): LineStats {
  if (!text || maxWidth <= 0) {
    return { lineCount: 0, maxLineWidth: 0 };
  }
  const prepared = getPreparedTextWithSegments(text, font, options);
  return measureLineStats(prepared, maxWidth);
}

/**
 * Clear both Pretext internal cache and the local prepared handle caches.
 */
export function clearAllPretextCaches(): void {
  preparedCache.clear();
  preparedBasicCache.clear();
  pretextClearCache();
}

/**
 * Configure locale for Unicode segmentation.
 */
export function setPretextLocale(locale?: string): void {
  pretextSetLocale(locale);
}

export const pretext = {
  measureTextHeight,
  measureTextWithLines,
  splitTextLines,
  measureNaturalTextWidth,
  measureTextLineStats,
  getPreparedText,
  getPreparedTextWithSegments,
  clearAllPretextCaches,
  setPretextLocale,
};

export default pretext;

export {
  type PreparedText,
  type PreparedTextWithSegments,
  type PrepareOptions,
  type LayoutResult,
  type LayoutLine,
  type LayoutLinesResult,
  type LineStats,
};
