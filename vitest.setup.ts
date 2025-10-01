import { expect } from "vitest";
import * as jestDomMatchers from "@testing-library/jest-dom/matchers";

const matchersObj = (jestDomMatchers as any)?.default ?? jestDomMatchers;
if (matchersObj && typeof matchersObj === "object") {
  expect.extend(matchersObj as any);
}

// Suppress Radix Dialog mount-order warning emitted during tests. The
// warning is a dev-time diagnostic about internal registration order and can
// appear in JSDOM/test environments due to effect timing. We filter the exact
// message so other warnings still surface.
const RADIX_DIALOG_WARNING =
  "Missing `Description` or `aria-describedby={undefined}` for {DialogContent}";

const _warn = console.warn;
console.warn = (...args: any[]) => {
  try {
    const first = String(args[0] ?? "");
    if (first.includes(RADIX_DIALOG_WARNING)) return;
  } catch (e) {
    // ignore parsing errors and fall through to original warn
  }
  return _warn.apply(console, args as any);
};

const _error = console.error;
console.error = (...args: any[]) => {
  try {
    const first = String(args[0] ?? "");
    if (first.includes(RADIX_DIALOG_WARNING)) return;
  } catch (e) {
    // ignore parsing errors and fall through to original error
  }
  return _error.apply(console, args as any);
};
