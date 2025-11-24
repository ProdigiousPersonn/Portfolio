import React, { useEffect, useRef, useMemo, memo } from "react";
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

// Shared IntersectionObserver instance for all video elements
let videoObserver: IntersectionObserver | null = null;

const getVideoObserver = () => {
  if (!videoObserver) {
    videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (!video.src && video.dataset.videoSrc) {
              video.src = video.dataset.videoSrc;
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '50px' // Start loading slightly before entering viewport
      }
    );
  }
  return videoObserver;
};

const ProjectCard: React.FC<ProjectCardProps> = memo(({
  title,
  videoSrc,
  videoCDN,
  languages,
  status,
  createdDate,
  description,
}) => {
  const finalVideoSrc = useMemo(() => {
    const isProduction = window.location.hostname !== "localhost";
    return isProduction
      ? videoCDN || videoSrc || ""
      : videoSrc || videoCDN || "";
  }, [videoSrc, videoCDN]);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !finalVideoSrc) return;

    video.dataset.videoSrc = finalVideoSrc;
    const observer = getVideoObserver();
    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, [finalVideoSrc]);

  return (
    <div className="projectCard bevelContainer">
      {finalVideoSrc ? (
        <div className="projectCardVideoWrapper">
          <VideoComponent
            ref={videoRef}
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
        {languages.map((lang) => (
          <CaptionIcon
            key={lang.text}
            text={lang.text}
            imagePath={lang.imagePath ?? ""}
            layout="row"
          />
        ))}
      </ul>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
