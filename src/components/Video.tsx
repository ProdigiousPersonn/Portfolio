import { CSSProperties, forwardRef, VideoHTMLAttributes } from "react";

type VideoComponentProps = VideoHTMLAttributes<HTMLVideoElement> & {
  poster?: string;
  alt?: string;
  style?: CSSProperties;
};

export const VideoComponent = forwardRef<HTMLVideoElement, VideoComponentProps>(
  ({ poster, style, alt, ...videoProps }, ref) => {
    return (
      <video
        ref={ref}
        aria-label={alt}
        style={{
          objectFit: "contain",
          display: "block",
          width: "100%",
          height: "100%",
          ...style,
        }}
        {...videoProps}
      />
    );
  }
);

VideoComponent.displayName = "VideoComponent";
