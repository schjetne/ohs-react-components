import { expect } from "vitest";
import * as jestDomMatchers from "@testing-library/jest-dom/matchers";

const matchersObj = (jestDomMatchers as any)?.default ?? jestDomMatchers;
if (matchersObj && typeof matchersObj === "object") {
  expect.extend(matchersObj as any);
}
