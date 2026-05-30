import type * as React from "react";

interface NextImageProps {
  src: string | { src: string };
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}

export default function NextImage({ src, alt, width, height, className, style }: NextImageProps) {
  const resolvedSrc = typeof src === "string" ? src : src.src;
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={width as number}
      height={height as number}
      className={className}
      style={style}
    />
  );
}
