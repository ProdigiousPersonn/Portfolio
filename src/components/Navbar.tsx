import { useRef } from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';
// import { gsap } from "gsap";

const Navbar = () => {
    const bgRef = useRef<HTMLDivElement>(null);


    return (
        <>
            <div ref={bgRef} className="navbarBackground"></div>
            <ul className="Navbar">
                <Link className="NavbarButton Logo" to={"/home"}>P</Link>
                <Link to={"/projects"} className="NavbarButton Links">Projects</Link>
                <Link to={"/blog"} className="NavbarButton Links">Writeups</Link>
                {/* <Link to={"/resume"} className="NavbarButton Links">Resume</Link> */}
            </ul>
        </>
    );
};

export default Navbar;
