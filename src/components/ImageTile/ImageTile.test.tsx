import React from "react";
import { render, screen } from "@testing-library/react";
import { ImageTile } from "./ImageTile";

describe("ImageTile", () => {
  const landscape =
    "https://media.hitmaps.com/img/hitman3/unlockables/outfit_1fdc259e-b96a-47f2-bbd8-e86e78d6df70_0.jpg";
  const portrait =
    "https://media.hitmaps.com/img/hitman3/contracts/novikov_and_magolis/tile.jpg";

  it("renders with a background image and aspect class", () => {
    const { container } = render(
      <ImageTile imageUrl={landscape} aspect="landscape">
        Testing
      </ImageTile>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).not.toBeNull();
    expect(el).toHaveClass("ohs-image-tile");
    expect(el).toHaveClass("ohs-image-tile--landscape");
    expect(el.style.backgroundImage).toContain(
      "outfit_1fdc259e-b96a-47f2-bbd8-e86e78d6df70_0.jpg"
    );
  });

  it("renders children as overlay content", () => {
    render(
      <ImageTile imageUrl={portrait} aspect="portrait">
        <div>Overlay text</div>
      </ImageTile>
    );
    expect(screen.getByText("Overlay text")).toBeInTheDocument();
  });
});
