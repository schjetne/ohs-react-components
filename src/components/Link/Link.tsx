import React, { forwardRef } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";

type LinkBase = {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
};

type LinkAsChild = LinkBase & { asChild: true };
type LinkDefault = LinkBase & {
  asChild?: false;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type LinkProps = LinkAsChild | LinkDefault;

/**
 * Link
 *
 * @description A styled anchor component. Mirrors Button's `asChild` behavior and
 * applies the design system button classes (`ohs-btn`) while still keeping `ohs-link`.
 * Use like a normal `<a>` or set `asChild` to wrap another element.
 *
 * @example
 * <Link href="/about">About</Link>
 * <Link asChild>
 *   <a href="#">Wrapped</a>
 * </Link>
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className = "", asChild = false, ...rest }, ref) => {
    const classes = `ohs-btn ohs-link ${className}`.trim();

    const Component: any = asChild ? Slot : "a";

    const componentProps: Record<string, any> = {
      className: classes,
      ref,
    };

    return (
      <Component
        {...componentProps}
        {...(asChild ? {} : rest)}
        {...(asChild ? (rest as any) : {})}
      >
        <Slottable>{children}</Slottable>
      </Component>
    );
  }
);

export { Link };

/* istanbul ignore next */
(Link as any).displayName = "Link";
