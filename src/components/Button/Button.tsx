import React, { forwardRef } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { Icon } from "../Icon/Icon";
import type { IconName } from "../Icon/iconData";

type ButtonBase = {
  children: React.ReactNode;
  disabled?: boolean;
  currentChoice?: boolean;
  className?: string;
  icon?: IconName;
  iconVariant?: "solid" | "normal";
  noPadding?: boolean;
  asChild?: boolean;
  title?: string;
};

type ButtonAsChild = ButtonBase & { asChild: true };
type ButtonDefault = ButtonBase & {
  asChild?: false;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonAsChild | ButtonDefault;

/**
 * Button
 *
 * @description Button component with optional icon support. Use `asChild` to render the
 * provided child element (e.g. a Link) with the button styles/props merged in.
 *
 * @example
 * <Button>Click me</Button>
 * <Button asChild>
 *   <a href="#">Link text</a>
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled = false,
      currentChoice = false,
      className = "",
      icon,
      iconVariant = "solid",
      asChild = false,
      noPadding = false,
      title,
      ...rest
    },
    ref
  ) => {
    const buttonClasses = `ohs-btn${
      currentChoice ? " underlined" : ""
    } ${className}`.trim();

    const Component: any = asChild ? Slot : "button";

    const componentProps: Record<string, any> = {
      className: `${buttonClasses} ${disabled ? "disabled" : ""} ${
        noPadding ? "no-padding" : ""
      }`.trim(),
      title,
      style: disabled ? { pointerEvents: "none" } : undefined,
      onClick: (rest as any).onClick,
      onKeyDown: (rest as any).onKeyDown,
      "aria-expanded": (rest as any)["aria-expanded"],
      "aria-haspopup": (rest as any)["aria-haspopup"],
      "aria-controls": (rest as any)["aria-controls"],
      ref,
    };

    return (
      <Component
        {...componentProps}
        /* don't set type when using `asChild` */
        type={asChild ? undefined : (rest as any).type || "button"}
        /* allow consumers to override props */
        {...rest}
      >
        {icon && <Icon name={icon} variant={iconVariant} />}
        <Slottable>{children}</Slottable>
      </Component>
    );
  }
);

export { Button };

/* istanbul ignore next */
(Button as any).displayName = "Button";
