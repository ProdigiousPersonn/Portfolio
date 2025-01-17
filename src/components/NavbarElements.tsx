import React from "react";
import { Link } from "react-router-dom";

interface NavbarButtonProps {
    name: string;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ name }) => {
    return (
        <Link to={`/${name}`} className="NavbarButton">{name}</Link>
    );
};

export { NavbarButton };
