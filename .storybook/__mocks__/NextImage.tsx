import type * as React from "react";

interface NextImageProps {
  alt: string;
  className?: string;
  fill?: boolean;
  height?: number | string;
  loading?: "lazy" | "eager";
  onError?: React.ReactEventHandler<HTMLImageElement>;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  src: string | { src: string };
  style?: React.CSSProperties;
  unoptimized?: boolean;
  width?: number | string;
}

export default function NextImage({ src, alt, width, height, className, style }: NextImageProps) {
  const resolvedSrc = typeof src === "string" ? src : src.src;
  return (
    // oxlint-disable-next-line next/no-img-element -- intentional: this mock replaces next/image for Storybook
    <img
      alt={alt}
      className={className}
      height={height as number}
      src={resolvedSrc}
      style={style}
      width={width as number}
    />
  );
}
