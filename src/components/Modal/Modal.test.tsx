import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders title and children when open", async () => {
    render(
      <Modal open title="Test title">
        <div>Body content</div>
      </Modal>
    );

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("calls onOpenChange when closed via Close button", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal
        open
        onOpenChange={onOpenChange}
        title="Close test"
        showCloseIcon={true}
      >
        <div>Body</div>
      </Modal>
    );

    const close = screen.getByText("×");
    await user.click(close);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onOpenChange when clicking on overlay/backdrop", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { container } = render(
      <Modal open onOpenChange={onOpenChange} title="Backdrop test">
        <div>Body</div>
      </Modal>
    );

    const overlay = document.body.querySelector(
      ".ohs-modal-overlay"
    ) as HTMLElement;
    expect(overlay).not.toBeNull();
    await user.click(overlay);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("exposes description via aria-describedby and renders the description visibly", async () => {
    render(
      <Modal
        open
        id="test-modal"
        title="Desc test"
        description={<span>Visible desc</span>}
      >
        <div>Body</div>
      </Modal>
    );

    const content = document.body.querySelector(
      ".ohs-modal-content"
    ) as HTMLElement;
    expect(content).not.toBeNull();
    const describedBy = content.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const describedEl = document.getElementById(describedBy as string);
    expect(describedEl).not.toBeNull();
    expect(describedEl).toHaveTextContent("Visible desc");
  });
});
