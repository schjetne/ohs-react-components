import React from "react";
import { solidIconData, normalIconData, IconName } from "./iconData";

export interface IconProps {
  name: IconName;
  variant?: IconVariant;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

type IconVariant = "solid" | "normal";

/**
 * Icon
 *
 * @description Inline SVG icon component powered by generated path data. Use the `name` prop to select an icon from the library and `variant` to choose between `solid` and `normal` sets.
 *
 * @example
 * <Icon name="warning" color="#e74c3c" />
 * <Icon name="versus" variant="normal" />
 */
const Icon: React.FC<IconProps> = ({
  name,
  variant = "solid",
  className = "",
  color = "currentColor",
  style = {},
}) => {
  // Get the appropriate icon data based on variant
  const iconDataSource = variant === "normal" ? normalIconData : solidIconData;
  const pathData = iconDataSource[name];

  if (!pathData) {
    console.warn(`Icon "${name}" not found in ${variant} variant`);
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      role="presentation"
      className={`ohs-icon ${className}`}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        ...style,
      }}
    >
      <path
        d={pathData}
        fill={color}
        transform="scale(1,-1) translate(0,-850)"
      />
    </svg>
  );
};

export { Icon };
