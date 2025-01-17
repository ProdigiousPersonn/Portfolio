import React from "react";
import { NavbarButton } from "./NavbarElements";
import '../styles/Navbar.css'
const Navbar = () => {
    return (
        <>
            <ul className="Navbar">
                <h1>P</h1>
                <NavbarButton name={"Home"}/>
                <NavbarButton name={"About"}/>
                <NavbarButton name={"Projects"}/>
            </ul>
        </>
    );
};

export default Navbar;