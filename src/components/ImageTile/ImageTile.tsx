import React from "react";

export type ImageTileProps = React.HTMLAttributes<HTMLDivElement> & {
  imageUrl?: string;
  aspect?: "square" | "half" | "landscape" | "portrait" | "full-size";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * ImageTile
 *
 * @description A tile component that displays an image with an optional aspect ratio and content overlay.
 *
 * @example
 * <ImageTile imageUrl="https://example.com/image.jpg" aspect="landscape">
 *   <div>Overlay Content</div>
 * </ImageTile>
 */
export const ImageTile: React.FC<ImageTileProps> = ({
  imageUrl,
  aspect = "landscape",
  children,
  className = "",
  style,
  ...rest
}) => {
  return (
    <div
      className={`ohs-image-tile ohs-image-tile--${aspect} ${className}`.trim()}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children && <div className="tile-content">{children}</div>}
    </div>
  );
};
