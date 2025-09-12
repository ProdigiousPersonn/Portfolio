import React from "react";

interface DoubleLinesProps {
  lineWidth?: string;
  lineHeight?: number;
  lineColor?: string;
  gap?: number;
  spacing?: number;
}

const DoubleLines: React.FC<DoubleLinesProps> = ({
  lineWidth = "40px",
  lineHeight = 2,
  lineColor = "var(--fgColor-muted)",
  gap = 4,
  spacing = 40,
}) => {
  const LinePair = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gap,
        alignItems: "center",
      }}
    >
      <div style={{ width: lineWidth, height: lineHeight, backgroundColor: lineColor, opacity: 0.6 }} />
      <div style={{ width: lineWidth, height: lineHeight, backgroundColor: lineColor, opacity: 0.6 }} />
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <LinePair />
      <div style={{ width: spacing }} />
      <LinePair />
    </div>
  );
};

export default DoubleLines;
