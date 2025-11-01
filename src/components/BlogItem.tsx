import React from "react";
import { Link } from "react-router-dom";
import '@styles/BlogItem.css'

interface BlogItemButtonProps {
    index: number;
    name: string;
    pathName: string;
    description: string;
    tags: string[];
}

const BlogItem: React.FC<BlogItemButtonProps> = ({ pathName, name, description, tags }) => {
    return (
        <Link to={`/blog/${pathName}`}>
            <div className="bevelContainer blogItem">
                <h1>
                    {name}
                </h1>
                <ul className="tagContainer">
                    {tags.map((item: string,) => (
                        <li className="tagContent">{item}</li>
                    ))}
                </ul>
                <p>
                    {description}
                </p>
            </div>
        </Link>
    );
};

export { BlogItem };
