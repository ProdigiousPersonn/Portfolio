import React from "react";
// import { NavbarButton } from "./NavbarElements";
import { Link } from "react-router-dom"
import '../styles/Navbar.css'
const Navbar = () => {
    return (
        <>
            <ul className="Navbar">
                <Link className="NavbarButton Logo" to={"/home"}>P</Link>
                <Link to={"/projects"} className="NavbarButton Links">Projects</Link>
                <Link to={"/blog"} className="NavbarButton Links">Blog</Link>
                {/* <NavbarButton name={"About"}/>
                <NavbarButton name={"Projects"}/>
                <NavbarButton name={"Blog"}/> */}
            </ul>
        </>
    );
};

export default Navbar;