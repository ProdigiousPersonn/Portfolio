import { useRef, useState, useEffect, useMemo } from "react";
import ProjectCard from "../ProjectCard.tsx";
import "../../styles/Components/HomePage/Projects.css";
import { motion, useInView } from "framer-motion";

const projectData = [
  {
    title: "ChromaClash",
    description:
      "A competitive 1v1 fighting game with dynamic gameplay mechanics and low-latency multiplayer support through rollback networking.",
    videoSrc: "/videos/ChromaClash.mp4",
    videoCDN: "https://assets.aidentran.dev/ChromaClash.mp4",
    createdDate: 2024,
    status: "Main Developer",
    teamSize: 2,
    projectType: "Game Development",
    tags: ["Realtime Networking", "Object Oriented Programming", "Determinism"],
    languages: [
      { text: "Roblox", imagePath: "/images/icons/robloxStudio.svg" },
      { text: "Rojo", imagePath: "/images/icons/rojo.png" },
      { text: "Lua", imagePath: "/images/icons/lua.svg" },
      { text: "React-Lua", imagePath: "/images/icons/react.svg" },
    ],
  },
  {
    title: "Forums",
    description:
      "A full-stack forum website built from scratch where users can create topics, post threads, and engage in discussions with a clean, responsive UI.",
    videoSrc: "",
    videoCDN: "",
    createdDate: 2025,
    status: "Developer",
    teamSize: 2,
    projectType: "Web Development",
    tags: ["Networking", "Functional Programming"],
    languages: [
      { text: "React", imagePath: "/images/icons/react.svg" },
      { text: "TypeScript", imagePath: "/images/icons/typescript.svg" },
      { text: "HTML", imagePath: "/images/icons/html.svg" },
      { text: "TailwindCSS", imagePath: "/images/icons/tailwindcss.svg" },
      { text: "PostgresSQL", imagePath: "/images/icons/postgresql.svg" },
    ],
  },
  {
    title: "PWNAGE",
    description:
      "A fast-paced first person shooter with extreme movement capabilities and an arsenal of unique weapons.",
    videoSrc: "/videos/Pwnage.mp4",
    videoCDN: "https://assets.aidentran.dev/Pwnage.mp4",
    createdDate: 2023,
    status: "Main Developer",
    teamSize: 1,
    projectType: "Game Development",
    tags: ["Realtime Networking", "Object Oriented Programming"],
    languages: [
      { text: "Roblox", imagePath: "/images/icons/robloxStudio.svg" },
      { text: "Lua", imagePath: "/images/icons/lua.svg" },
    ],
  },
  {
    title: "Portfolio",
    description:
      "Modern responsive portfolio website showcasing projects and writeups with interactive elements and smooth animations.",
    videoSrc: "",
    videoCDN: "",
    createdDate: 2025,
    status: "Main Developer",
    teamSize: 1,
    projectType: "Web Development",
    tags: ["Functional Programming"],
    languages: [
      { text: "React", imagePath: "/images/icons/react.svg" },
      { text: "ThreeJS", imagePath: "/images/icons/threejs.svg" },
      { text: "TypeScript", imagePath: "/images/icons/typescript.svg" },
      { text: "HTML", imagePath: "/images/icons/html.svg" },
      { text: "CSS", imagePath: "/images/icons/css.svg" },
    ],
  },
];

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setNumColumns(1);
      } else {
        setNumColumns(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = useMemo(() => {
    const newColumns: typeof projectData[] = Array.from(
      { length: numColumns },
      () => []
    );

    projectData.forEach((project, index) => {
      newColumns[index % numColumns].push(project);
    });

    return newColumns;
  }, [numColumns]);


  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.175, 0.885, 0.32, 1.275],
      },
    },
  };

  return (
    <div className="projectsWrapper" ref={containerRef}>
      <motion.div className="projectsContainer" variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        {columns.map((columnProjects, colIndex) => (
          <div className="project-column" key={colIndex}>
            {columnProjects.map((project, projIndex) => (
              <motion.div key={projIndex} variants={item}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  videoSrc={project.videoSrc}
                  videoCDN={project.videoCDN}
                  createdDate={project.createdDate}
                  status={project.status}
                  languages={project.languages}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
