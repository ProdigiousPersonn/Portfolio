import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "@components/ProjectCard.tsx";
import "@styles/Components/HomePage/Projects.css";
import { motion, useInView } from "framer-motion";
import projectData from "@data/projects.json"

const TOP_PROJECTS_COUNT = 4;

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

  const topProjects = useMemo(() => {
    return projectData.slice(0, TOP_PROJECTS_COUNT);
  }, []);

  const columns = useMemo(() => {
    const newColumns: typeof projectData[] = Array.from(
      { length: numColumns },
      () => []
    );

    topProjects.forEach((project, index) => {
      newColumns[index % numColumns].push(project);
    });

    return newColumns;
  }, [topProjects, numColumns]);


  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const container = useMemo(() => ({
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.12,
      },
    },
  }), []);

  const item = useMemo(() => ({
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
  }), []);

  return (
    <div className="projectsWrapper" ref={containerRef}>
      <motion.div className="projectsContainer" variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        {columns.map((columnProjects, colIndex) => (
          <div className="project-column" key={colIndex}>
            {columnProjects.map((project) => (
              <motion.div key={project.title} variants={item}>
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

      <div className="seeMoreContainer">
        <Link to="/projects" className="seeMoreButton bevelContainer">
          See All Projects
        </Link>
      </div>
    </div>
  );
};

export default Projects;
