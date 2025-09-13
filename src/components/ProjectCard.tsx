import React, { CSSProperties } from "react";
import CaptionIcon from "./CaptionIcon.tsx";

interface ProjectCardProps {
  title: string;
  videoSrc?: string;
  videoCDN?: string;
  status: string;
  createdDate: number;
  description: string;
  languages: { text: string; imagePath?: string }[];
}

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "1rem",
  width: "100%",
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
  color: "#fff",
  background: "rgba(0,0,0,0.5)",
  borderRadius: "0.75rem",
};

const videoWrapper: CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "16/9",
  overflow: "hidden",
  borderRadius: "0.5rem",
  zIndex: 1,
};

const videoStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "0.5rem",
  display: "block",
};

const titleStyle: CSSProperties = {
  fontSize: "1.4rem",
  margin: 0,
  fontWeight: 700,
  zIndex: 2,
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const dateStyle: CSSProperties = {
  fontSize: "0.9rem",
  fontWeight: 400,
  color: "#aaa",
};

const statusStyle: CSSProperties = {
  fontSize: "0.85rem",
  margin: "0 0 0.25rem 0",
  fontWeight: 500,
  color: "#ddd",
  zIndex: 2,
  position: "relative",
};

const sectionTitle: CSSProperties = {
  fontSize: "1rem",
  margin: "0.25rem 0 0.5rem 0",
  fontWeight: 600,
  zIndex: 2,
  position: "relative",
};

const descriptionStyle: CSSProperties = {
  fontSize: "0.9rem",
  margin: "0.25rem 0 0.75rem 0",
  lineHeight: "1.4",
  zIndex: 2,
  position: "relative",
  opacity: 0.9,
};

const listStyle: CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
  margin: 0,
  padding: 0,
  zIndex: 2,
  position: "relative",
};

const placeholderStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(40, 40, 40, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  color: "#ccc",
  zIndex: 1,
  position: "relative",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  videoSrc,
  videoCDN,
  languages,
  status,
  createdDate,
  description,
}) => {
  const isProduction = window.location.hostname !== "localhost";
  const finalVideoSrc = isProduction
    ? videoCDN || videoSrc || ""
    : videoSrc || videoCDN || "";
  return (
    <div style={cardStyle} className="bevelContainer">
      {finalVideoSrc ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <video
            src={finalVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            style={{
              ...videoStyle,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(40px) brightness(0.5)",
              transform: "scale(1.2)",
            }}
          />
        </div>
      ) : (
        <div style={placeholderStyle}>No Video Available</div>
      )}
      <div style={videoWrapper}>
        {finalVideoSrc && (
          <video
            src={finalVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            style={videoStyle}
          />
        )}
      </div>
      <h1 style={titleStyle}>
        {title} <span style={dateStyle}>({createdDate})</span>
      </h1>
      <h2 style={statusStyle}>{status}</h2>
      <div className="sectionDivider" />
      <p style={descriptionStyle}>{description}</p>
      <div className="sectionDivider" />
      <h2 style={sectionTitle}>Languages/Frameworks</h2>
      <ul style={listStyle}>
        {languages.map((lang, index) => (
          <CaptionIcon
            key={index}
            text={lang.text}
            imagePath={lang.imagePath ?? ""}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;
