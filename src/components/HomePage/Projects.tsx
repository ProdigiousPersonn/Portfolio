import React, { CSSProperties, Component } from "react";
import ProjectCard from "../ProjectCard.tsx";

const wrapperStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100vw",
  padding: "2%",
  boxSizing: "border-box",
  overflowY: "auto",
};

const container: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "2rem",
  background: "var(--bgColor)",
  width: "98vw",
  maxWidth: "1400px",
  padding: "2%",
  boxSizing: "border-box",
};

const projectData = [
  {
    title: "Portfolio",
    description: "Modern responsive portfolio website showcasing projects and writeups with interactive elements and smooth animations.",
    videoSrc: "",
    createdDate: 2025,
    status: "Head Developer",
    languages: [
      { text: "React", imagePath: "/images/icons/react.svg" },
      { text: "TypeScript", imagePath: "/images/icons/typescri pt.svg" },
      { text: "HTML", imagePath: "/images/icons/html.svg" },
      { text: "CSS", imagePath: "/images/icons/css.svg" }
    ],
  },
  {
    title: "ChromaClash",
    description: "A competitive 1v1 fighting game with dynamic gameplay mechanics and low-latency multiplayer support through rollback networking.",
    videoSrc: "/videos/ChromaClash.mp4",
    createdDate: 2024,
    status: "Head Developer",
    languages: [
      { text: "Roblox", imagePath: "/images/icons/robloxStudio.svg" },
      { text: "Lua", imagePath: "/images/icons/lua.svg" },
      { text: "React-Lua", imagePath: "/images/icons/react.svg" },
    ],
  },
  {
    title: "PWNAGE",
    description: "A fast-paced first person shooter with extreme movement capabilities and an arsenal of unique weapons.",
    videoSrc: "/videos/Pwnage.mp4",
    createdDate: 2023,
    status: "Head Developer",
    languages: [
      { text: "Roblox", imagePath: "/images/icons/robloxStudio.svg" },
      { text: "Lua", imagePath: "/images/icons/lua.svg" }
    ],
  },
];

class Projects extends Component {
  render() {
    return (
      <div style={wrapperStyle}>
        <div style={container}>
          {projectData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              videoSrc={project.videoSrc}
              createdDate={project.createdDate}
              status={project.status}
              languages={project.languages}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Projects;