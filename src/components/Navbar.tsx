import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';
import { gsap } from "gsap";

const Navbar = () => {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bgRef.current) return;

        const handleScroll = () => {
            const triggerPoint = window.innerHeight * 0.8;
            if (window.scrollY >= triggerPoint) {
                gsap.to(bgRef.current, { x: "0%", duration: 0.3, ease: "power1.out" });
            } else {
                gsap.to(bgRef.current, { x: "-100%", duration: 0.3, ease: "power1.out" });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div ref={bgRef} className="navbarBackground"></div>
            <ul className="Navbar">
                <Link className="NavbarButton Logo" to={"/home"}>P</Link>
                <Link to={"/projects"} className="NavbarButton Links">Projects</Link>
                <Link to={"/blog"} className="NavbarButton Links">Blog</Link>
            </ul>
        </>
    );
};

export default Navbar;
