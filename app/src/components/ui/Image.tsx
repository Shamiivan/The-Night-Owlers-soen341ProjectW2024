import React from "react";

interface ImageComponentProps {
  src: string;
  width?: number;
  height?: number;
}

const Image: React.FC<ImageComponentProps> = (
  { src, width, height },
) => {
  // Explicitly typing the style object
  const style: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "100%",
    width: width ? `${width}px` : "auto",
    height: height ? `${height}px` : "auto",
    objectFit: "cover",
  };

  return (
    <div
      style={{
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
        overflow: "hidden",
      }}
    >
      <img src={src} alt="" style={style} />
    </div>
  );
};

export default Image;
