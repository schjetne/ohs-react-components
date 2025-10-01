import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

export type ModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  size?: "small" | "medium" | "large";
  showCloseIcon?: boolean;
  childBg?: boolean;
};

/**
 * Modal
 *
 * @description
 * A composable modal component built on top of Radix Dialog. It provides
 * consistent styling and a simple API for controlled usage (pass `open` and
 * `onOpenChange`) and supports three sizes via the `size` prop: `small`,
 * `medium` (default) and `large`.
 *
 * @example
 * const [open, setOpen] = React.useState(false);
 * <>
 *   <Button onClick={() => setOpen(true)}>Open modal</Button>
 *   <Modal open={open} onOpenChange={setOpen} title="Example">
 *     <div>Modal body</div>
 *   </Modal>
 * </>
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  id,
  children,
  className = "",
  overlayClassName = "",
  contentClassName = "",
  size = "medium",
  showCloseIcon = false,
  childBg = false,
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={`ohs-modal-overlay ${overlayClassName}`}
          onClick={() => {
            try {
              onOpenChange && onOpenChange(false);
            } catch (e) {
              /* ignore */
            }
          }}
        />
        <RadixDialog.Content
          className={`ohs-modal-content ${contentClassName}`}
        >
          <div
            className={`ohs-modal ${
              childBg ? "ohs-modal--child-bg" : ""
            } ohs-modal--${size} ${className}`}
          >
            {(title || showCloseIcon) && (
              <div className="ohs-modal-header">
                {title && (
                  <RadixDialog.Title className="ohs-modal-title">
                    {title}
                  </RadixDialog.Title>
                )}
                {showCloseIcon && (
                  <RadixDialog.Close className="ohs-modal-close">
                    ×
                  </RadixDialog.Close>
                )}
              </div>
            )}

            {description && (
              <RadixDialog.Description>{description}</RadixDialog.Description>
            )}
            <div className="ohs-modal-body">{children}</div>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export { RadixDialog };
