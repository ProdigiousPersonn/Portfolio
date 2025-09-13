import React from "react";
import "../styles/Components/SectionLines.css";

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
  const isMobile = window.innerWidth <= 600;
  const LinePair = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gap,
        alignItems: "center",
      }}
    >
      <div
        className="sectionLine"
        style={{
          width: lineWidth,
          height: isMobile ? "1px" : lineHeight,
          backgroundColor: isMobile ? "rgba(0,0,0,1)" : lineColor,
          opacity: 0.6,
        }}
      />
      <div
        className="sectionLine"
        style={{
          width: lineWidth,
          height: isMobile ? "1px" : lineHeight,
          backgroundColor: isMobile ? "rgba(0,0,0,1)" : lineColor,
          opacity: 0.6,
        }}
      />
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
