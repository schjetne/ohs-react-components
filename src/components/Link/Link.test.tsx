import React from "react";
import { render, screen } from "@testing-library/react";
import { Link } from "./Link";
import { Heading } from "../Heading/Heading";

describe("Link", () => {
  it("renders children", () => {
    render(<Link href="#">Go</Link>);
    expect(screen.getByRole("link")).toHaveTextContent("Go");
  });

  it("merges props when used asChild and wraps an anchor", () => {
    const { container } = render(
      (
        <Link asChild>
          <a href="#">Wrapped</a>
        </Link>
      ) as any
    );
    const a = container.querySelector("a");
    expect(a).not.toBeNull();
    expect(a).toHaveTextContent("Wrapped");
    expect(a).toHaveClass("ohs-link");
    expect(a).toHaveClass("ohs-btn");
  });

  it("merges props when used asChild and wraps project Heading component", () => {
    const { container } = render(
      (
        <Link asChild>
          <a href="#">
            <Heading title="Wrapped heading" />
          </a>
        </Link>
      ) as any
    );
    const a = container.querySelector("a");
    expect(a).not.toBeNull();
    expect(a).toHaveTextContent("Wrapped heading");
    expect(a).toHaveClass("ohs-btn");
  });
});
