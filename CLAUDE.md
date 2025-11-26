# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start Vite dev server (default port 5173)
npm run build        # Type check with tsc and build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on all files
```

## Architecture Overview

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6 with React plugin
- **Styling**: TailwindCSS 4 + custom CSS
- **Animations**: Framer Motion for page transitions and element animations
- **3D Graphics**: Three.js via @react-three/fiber and @react-three/drei
- **Routing**: React Router DOM 7
- **Markdown**: react-markdown with rehype-raw for blog content

### Project Structure

**Path Aliases** (configured in both vite.config.ts and tsconfig.json):
- `@/` → `src/`
- `@components/` → `src/components/`
- `@styles/` → `src/styles/`
- `@hooks/` → `src/hooks/`
- `@data/` → `src/data/`

**Component Organization**:
- Mix of class components (older code: BlogDisplay, Home) and functional components (newer code: ProjectCard, Title)
- HomePage components (Title, About, Projects) are in `src/components/HomePage/`
- Corresponding styles mirror component structure in `src/styles/Components/`

**Routing Structure** (App.tsx):
- `/` and `/home` → Home page (Title + About + Projects sections)
- `/about` → Standalone About page
- `/projects` → ProjectsPage (full projects listing)
- `/blog` → BlogList (all blog posts)
- `/blog/:postId` → BlogDisplay (individual blog post from markdown)
- `/resume` → Resume page

### Data Management

**Static JSON Data** in `src/data/`:
- `projects.json`: Project metadata including title, description, video sources (CDN + local), languages, tags, dates
- `blogs.json`: Blog metadata with Name, PathName (for routing), Description, and Tags
- `popularTags.json`: Tag categories for filtering

**Video Handling**:
- Projects support dual video sources: `videoCDN` for production, `videoSrc` for local dev
- Logic: In production (non-localhost), prefer CDN; in dev, prefer local files
- Videos use lazy loading via IntersectionObserver pattern (see ProjectCard.tsx)
- Shared observer instance across all cards for performance

**Blog Content**:
- Markdown files stored in `public/blogs/` (e.g., `rollback_netcode.md`)
- BlogDisplay fetches markdown via `/blogs/${fileName}.md` at runtime
- Rendered with react-markdown and rehype-raw for HTML support

### Performance Patterns

**Video Optimization** (ProjectCard.tsx):
- Single shared IntersectionObserver for all video elements
- Lazy loading: src attribute set only when entering viewport
- Auto play/pause based on visibility with 0.3 threshold and 50px rootMargin
- Preload set to "metadata" only

**Component Memoization**:
- ProjectCard uses React.memo to prevent unnecessary re-renders
- useMemo for computed values like finalVideoSrc

### Custom Hooks
- `UseIsVisible.tsx` (in src/hooks/): Custom visibility detection hook using IntersectionObserver

### Styling Conventions
- CSS files organized to mirror component structure
- Mix of traditional CSS and Tailwind utilities
- Custom animations and transitions for visual effects
- Bevel containers for 3D-styled UI elements (`.bevelContainer`)

### Key UI Patterns

**Title Component**:
- Heavy use of framer-motion for staggered animations
- SVG-based logo and corner borders
- Animated scroll indicator

**Section Dividers**:
- Divider component with customizable text and animation duration
- SectionLines for decorative line separators

**Custom Cursor**:
- Global Cursor component rendered at app level
- Uses @cursorify/react library

### Important Notes
- Public assets (videos, images, fonts, models) in `/public` directory
- Videos ignored in git (`.gitignore` excludes `./public/videos` and `.mp4` files)
- Project uses both CDN hosting (assets.aidentran.dev) and local fallbacks for media
