import { createElement } from "react";
import { Icon } from "../Icon/Icon";
import { IconName } from "../Icon/iconData";

export interface HeadingProps {
  prefix?: string;
  title: string | React.ReactNode;
  icon?: IconName;
  iconStyle?: "solid" | "normal";
  useBackground?: boolean;
  usePadding?: boolean;
  useUppercase?: boolean;
  centered?: boolean;
  headingLevel?: `h1` | `h2` | `h3` | `h4` | `h5` | `h6`;
  size?: "small" | "medium" | "large";
  className?: string;
}

/**
 * Heading
 *
 * @description Styled heading component with optional icon and prefix support. Use `headingLevel` to set the HTML tag (defaults to `h4`).
 *
 * @example
 * <Heading title="Section title" />
 * <Heading title="Map" prefix="01" icon="warning" headingLevel="h3" />
 * <Heading title="Centered" size="small" centered />
 */

const Heading: React.FC<HeadingProps> = ({
  prefix,
  title,
  icon = "info",
  iconStyle = "solid",
  useBackground = true,
  usePadding = true,
  useUppercase = true,
  centered = false,
  headingLevel = `h4`,
  size = "medium",
  className = "",
}) => {
  const HeadingTag = headingLevel || "h4";
  const classes = [
    "ohs-heading",
    useBackground ? "ohs-heading--withBackground" : "",
    usePadding ? "ohs-heading--withPadding" : "",
    useUppercase ? "ohs-heading--uppercase" : "",
    centered ? "ohs-heading--centered" : "",
    `ohs-heading--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="icon">
        <Icon name={icon} variant={iconStyle} />
      </div>
      <div className="content">
        {prefix && <span className="prefix">{prefix}</span>}
        {createElement(HeadingTag, { className: "title" }, title)}
      </div>
    </div>
  );
};

export { Heading };
