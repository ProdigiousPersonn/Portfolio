import React, { useEffect, useRef } from "react";
import CaptionIcon from "@components/CaptionIcon.tsx";
import "@styles/Components/ProjectCard.css";
import { VideoComponent } from "@components/Video.tsx"

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

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!video.src) video.src = video.dataset.src || "";
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="projectCard bevelContainer">
      {finalVideoSrc ? (
        <div className="projectCardVideoWrapper">
          <VideoComponent
            ref={videoRef}
            data-src={finalVideoSrc}
            preload="metadata"
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
            layout="row"
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;
