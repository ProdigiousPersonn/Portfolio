import { Link } from "react-router-dom";
import '@styles/Navbar.css';

interface NavButtonProps {
    to: string;
    children: React.ReactNode;
    isLogo?: boolean;
}

const NavButton = ({ to, children, isLogo = false }: NavButtonProps) => {
    return (
        <Link to={to} className={`navButton ${isLogo ? 'navButtonLogo' : ''}`}>
            {!isLogo && (
                <div className="navButtonBack">
                    <svg className="triangleBorder" viewBox="0 0 20 45" preserveAspectRatio="none">
                        <polyline
                            points="20,0 0,45 20,45"
                            fill="none"
                            stroke="rgba(80, 80, 80, 0.5)"
                            strokeWidth=""
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>
            )}
            <div className="navButtonContent">
                <span className="navButtonText">{children}</span>
            </div>
            <div className="navButtonFront">
                <svg className="triangleBorder" viewBox="0 0 20 45" preserveAspectRatio="none">
                    <polyline
                        points="0,0 20,0 0,45"
                        fill="none"
                        stroke="rgba(80, 80, 80, 0.5)"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </div>
        </Link>
    );
};

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavButton to="/home" isLogo>
                <img src="/images/title/home-icon.svg" alt="Home" className="navLogoIcon" />
            </NavButton>
            <NavButton to="/projects">PROJECTS</NavButton>
            <NavButton to="/blog">WRITEUPS</NavButton>
            <NavButton to="/resume">RESUME</NavButton>
            <NavButton to="/art">ART</NavButton>
        </nav>
    );
};

export default Navbar;
