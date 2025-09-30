import React from "react";
import { render } from "@testing-library/react";
import { Icon } from "./Icon";
import { vi, describe, it, expect } from "vitest";

describe("OhsIcon", () => {
  it("renders svg and path for a known icon", () => {
    const { container } = render(<Icon name={"warning" as any} />);
    const svg = container.querySelector("svg");
    const path = container.querySelector("path");
    expect(svg).not.toBeNull();
    expect(path).not.toBeNull();
    expect(path?.getAttribute("d")).toBeTruthy();
    expect(path?.getAttribute("fill")).toBe("currentColor");
  });

  it("honors color props", () => {
    const { container } = render(<Icon name={"warning" as any} color="#f00" />);
    const svg = container.querySelector("svg") as SVGElement;
    const path = container.querySelector("path") as SVGElement;
    expect(path.getAttribute("fill")).toBe("#f00");
  });

  it("returns null and warns when icon name is missing", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(<Icon name={"__missing__" as any} />);
    expect(container.innerHTML).toBe("");
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
