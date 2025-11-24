import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import ProjectCard from "@components/ProjectCard.tsx";
import "@styles/Pages/ProjectsPage.css";
import { motion, useInView } from "framer-motion";
import projectData from "@data/projects.json";
import popularTags from "@data/popularTags.json";

const PROJECTS_PER_PAGE = 8;

const ProjectsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const techDropdownRef = useRef<HTMLDivElement>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout>();
  const [numColumns, setNumColumns] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [techSearchQuery, setTechSearchQuery] = useState("");

  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projectData.forEach(project => {
      project.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Extract all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const technologies = new Set<string>();
    projectData.forEach(project => {
      project.languages?.forEach(lang => technologies.add(lang.text));
    });
    return Array.from(technologies).sort();
  }, []);

  // Filter tags based on search in dropdown
  const filteredTagsForDropdown = useMemo(() => {
    if (!tagSearchQuery) return allTags;
    return allTags.filter(tag =>
      tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
    );
  }, [allTags, tagSearchQuery]);

  // Filter technologies based on search in dropdown
  const filteredTechnologiesForDropdown = useMemo(() => {
    if (!techSearchQuery) return allTechnologies;
    return allTechnologies.filter(tech =>
      tech.toLowerCase().includes(techSearchQuery.toLowerCase())
    );
  }, [allTechnologies, techSearchQuery]);

  // Debounce search input for better performance
  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchQuery]);

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

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (techDropdownRef.current && !techDropdownRef.current.contains(event.target as Node)) {
        setIsTechDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isTechDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isTechDropdownOpen]);

  // Keyboard support for dropdown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isDropdownOpen) setIsDropdownOpen(false);
        if (isTechDropdownOpen) setIsTechDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDropdownOpen, isTechDropdownOpen]);

  // Filter projects based on search, tags, and technologies (AND logic)
  const filteredProjects = useMemo(() => {
    return projectData.filter((project) => {
      // Search filter with debounced query
      const matchesSearch =
        debouncedSearchQuery === "" ||
        project.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        project.projectType?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

      // Tag filter - AND logic: project must have ALL selected tags
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags?.includes(tag));

      // Technology filter - AND logic: project must have ALL selected technologies
      const projectTechs = project.languages?.map(lang => lang.text) || [];
      const matchesTechnologies =
        selectedTechnologies.length === 0 ||
        selectedTechnologies.every((tech) => projectTechs.includes(tech));

      return matchesSearch && matchesTags && matchesTechnologies;
    });
  }, [debouncedSearchQuery, selectedTags, selectedTechnologies]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  // Organize into columns
  const columns = useMemo(() => {
    const newColumns: typeof projectData[] = Array.from(
      { length: numColumns },
      () => []
    );

    paginatedProjects.forEach((project, index) => {
      newColumns[index % numColumns].push(project);
    });

    return newColumns;
  }, [paginatedProjects, numColumns]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedTags, selectedTechnologies]);

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

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const toggleTechnology = useCallback((tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <div className="projectsPageWrapper" ref={containerRef}>
      <header className="projectsPageHeader">
        <h1 className="projectsPageTitle">Projects</h1>

        {/* Filter Section Container */}
        <div className="filterSection">
          {/* Enhanced Search Bar */}
          <div className="searchBarContainer">
            <div className="searchBarWrapper bevelContainer">
              <svg className="searchIcon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="searchBar"
              />
              {searchQuery && (
                <button className="clearButton" onClick={clearSearch}>
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Tag Dropdown */}
          <div className="tagDropdownContainer" ref={dropdownRef}>
            <button
              className="tagDropdownButton bevelContainer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <svg className="tagIcon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15.5 8.5l-7-7H3a1.5 1.5 0 0 0-1.5 1.5v5.5l7 7a1.5 1.5 0 0 0 2.12 0l4.88-4.88a1.5 1.5 0 0 0 0-2.12zM5.5 6.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>
                {selectedTags.length > 0
                  ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`
                  : 'Select Tags'}
              </span>
              <svg className={`dropdownArrow ${isDropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="tagDropdownContent bevelContainer">
                {/* Search Tags Input */}
                <div className="tagSearchWrapper">
                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={tagSearchQuery}
                    onChange={(e) => setTagSearchQuery(e.target.value)}
                    className="tagSearchInput"
                  />
                </div>

                <div className="tagDropdownScroll">
                  {/* Popular Tags Section */}
                  {!tagSearchQuery && (
                    <>
                      <div className="tagSectionLabel">POPULAR</div>
                      <div className="tagList">
                        {popularTags.map((tag) => (
                          <label key={tag} className="tagCheckboxLabel">
                            <input
                              type="checkbox"
                              checked={selectedTags.includes(tag)}
                              onChange={() => toggleTag(tag)}
                              className="tagCheckbox"
                            />
                            <span className="tagCheckboxText">{tag}</span>
                          </label>
                        ))}
                      </div>
                      <div className="tagDivider"></div>
                    </>
                  )}

                  {/* All Tags Section */}
                  <div className="tagSectionLabel">
                    ALL TAGS ({filteredTagsForDropdown.length})
                  </div>
                  <div className="tagList">
                    {filteredTagsForDropdown.map((tag) => (
                      <label key={tag} className="tagCheckboxLabel">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="tagCheckbox"
                        />
                        <span className="tagCheckboxText">{tag}</span>
                      </label>
                    ))}
                  </div>

                  {filteredTagsForDropdown.length === 0 && (
                    <div className="noTagsFound">No tags found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Technology Dropdown */}
          <div className="tagDropdownContainer" ref={techDropdownRef}>
            <button
              className="tagDropdownButton bevelContainer"
              onClick={() => setIsTechDropdownOpen(!isTechDropdownOpen)}
            >
              <svg className="tagIcon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 3h14M2 9h14M2 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>
                {selectedTechnologies.length > 0
                  ? `${selectedTechnologies.length} tech${selectedTechnologies.length > 1 ? 's' : ''} selected`
                  : 'Select Technologies'}
              </span>
              <svg className={`dropdownArrow ${isTechDropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown Content */}
            {isTechDropdownOpen && (
              <div className="tagDropdownContent bevelContainer">
                {/* Search Technologies Input */}
                <div className="tagSearchWrapper">
                  <input
                    type="text"
                    placeholder="Search technologies..."
                    value={techSearchQuery}
                    onChange={(e) => setTechSearchQuery(e.target.value)}
                    className="tagSearchInput"
                  />
                </div>

                <div className="tagDropdownScroll">
                  {/* All Technologies Section */}
                  <div className="tagSectionLabel">
                    ALL TECHNOLOGIES ({filteredTechnologiesForDropdown.length})
                  </div>
                  <div className="tagList">
                    {filteredTechnologiesForDropdown.map((tech) => (
                      <label key={tech} className="tagCheckboxLabel">
                        <input
                          type="checkbox"
                          checked={selectedTechnologies.includes(tech)}
                          onChange={() => toggleTechnology(tech)}
                          className="tagCheckbox"
                        />
                        <span className="tagCheckboxText">{tech}</span>
                      </label>
                    ))}
                  </div>

                  {filteredTechnologiesForDropdown.length === 0 && (
                    <div className="noTagsFound">No technologies found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Tags Display as Chips */}
        {selectedTags.length > 0 && (
          <div className="selectedTagsChips">
            {selectedTags.map((tag) => (
              <span key={tag} className="tagChip">
                {tag}
                <button
                  className="tagChipRemove"
                  onClick={() => toggleTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Selected Technologies Display as Chips */}
        {selectedTechnologies.length > 0 && (
          <div className="selectedTagsChips">
            {selectedTechnologies.map((tech) => (
              <span key={tech} className="tagChip">
                {tech}
                <button
                  className="tagChipRemove"
                  onClick={() => toggleTechnology(tech)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <>
          <motion.div
            className="projectsContainer"
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="paginationContainer">
              <button
                className="paginationButton bevelContainer"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="paginationInfo">
                Page {currentPage} of {totalPages}
              </div>
              <button
                className="paginationButton bevelContainer"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="noResults">
          <h2>No projects found</h2>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
