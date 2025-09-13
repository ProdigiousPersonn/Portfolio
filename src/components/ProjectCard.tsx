import React from "react";
import CaptionIcon from "./CaptionIcon.tsx";
import "../styles/Components/ProjectCard.css";

interface ProjectCardProps {
  title: string;
  videoSrc?: string;
  videoCDN?: string;
  status: string;
  createdDate: number;
  description: string;
  languages: { text: string; imagePath?: string }[];
}

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
    <div className="projectCard bevelContainer">
      {finalVideoSrc ? (
        <div className="projectCardVideoWrapper">
          <video
            src={finalVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="projectCardVideo"
          />
        </div>
      ) : (
        <div className="projectCardPlaceholder">No Video Available</div>
      )}

      <h1 className="projectCardTitle">
        {title} <span className="projectCard-date">({createdDate})</span>
      </h1>
      <h2 className="projectCardStatus">{status}</h2>
      <div className="projectCardSectionDivider" />
      <p className="projectCardDescription">{description}</p>
      <div className="projectCardSectionDivider" />
      <h2 className="projectCardSectionTitle">Languages/Frameworks</h2>
      <ul className="projectCardList">
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
