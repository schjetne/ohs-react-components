import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { Icon } from "../Icon/Icon";
import { Link } from "../Link/Link";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("renders a passed child (asChild) and merges props", () => {
    const { container } = render(
      (
        <Button asChild>
          <a href="#">Link</a>
        </Button>
      ) as any
    );
    const anchor = container.querySelector("a");
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveTextContent("Link");
    // The button class should be merged onto the anchor
    expect(anchor).toHaveClass("ohs-btn");
  });

  it("renders an icon when `icon` prop is provided", () => {
    render((<Button icon={"warning" as any}>With icon</Button>) as any);
    // Icon renders an svg inside the button
    const svg = document.querySelector("button svg");
    expect(svg).not.toBeNull();
  });

  it("renders asChild with project Link component and merges props", () => {
    const { container } = render(
      (
        <Button asChild>
          <Link href="#">Project Link</Link>
        </Button>
      ) as any
    );

    const anchor = container.querySelector("a");
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveTextContent("Project Link");
    // The button class should be merged onto the project Link
    expect(anchor).toHaveClass("ohs-btn");
    // And it should still contain the Link's class
    expect(anchor).toHaveClass("ohs-link");
  });
});
