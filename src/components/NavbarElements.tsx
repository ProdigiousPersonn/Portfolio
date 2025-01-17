import React from "react";

interface NavbarButtonProps {
    name: string;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ name }) => {
    return (
        <button className="NavbarButton">{name}</button>
    );
};

export { NavbarButton };
