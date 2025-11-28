import { useState, useEffect, useMemo, useRef } from "react";
import '@styles/BlogList.css';
import { BlogItem } from "@components/BlogItem.tsx"

interface Item {
    Name: string;
    Path: string;
    PathName: string;
    Description: string;
    Tags: string[];
}

const BLOGS_PER_PAGE = 10;

function BlogList() {
    const [data, setData] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [tagSearchQuery, setTagSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/blogs.json")
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        data.forEach(blog => {
            blog.Tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [data]);

    const filteredTagsForDropdown = useMemo(() => {
        if (!tagSearchQuery) return allTags;
        return allTags.filter(tag =>
            tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
        );
    }, [allTags, tagSearchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isDropdownOpen) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isDropdownOpen]);

    const filteredBlogs = useMemo(() => {
        return data.filter((blog) => {
            const matchesSearch =
                searchQuery === "" ||
                blog.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.Description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((tag) => blog.Tags?.includes(tag));

            return matchesSearch && matchesTags;
        });
    }, [data, searchQuery, selectedTags]);

    const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
    const paginatedBlogs = useMemo(() => {
        const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
        const endIndex = startIndex + BLOGS_PER_PAGE;
        return filteredBlogs.slice(startIndex, endIndex);
    }, [filteredBlogs, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedTags]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="blogListWrapper">
            <header className="blogListHeader">
                <h1 className="blogListTitle">Writeups</h1>

                <div className="filterSection">
                    <div className="searchBarContainer">
                        <div className="searchBarWrapper bevelContainer">
                            <svg className="searchIcon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input
                                type="text"
                                placeholder="Search writeups..."
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

                        {isDropdownOpen && (
                            <div className="tagDropdownContent bevelContainer">
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
                </div>

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
            </header>

            {filteredBlogs.length > 0 ? (
                <>
                    <ul className="blogList">
                        {paginatedBlogs.map((item: Item, _index: number) => (
                            <BlogItem
                                key={_index}
                                index={_index}
                                pathName={item.PathName}
                                name={item.Name}
                                description={item.Description}
                                tags={item.Tags}
                            />
                        ))}
                    </ul>

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
                    <h2>No writeups found</h2>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
}

export default BlogList;
