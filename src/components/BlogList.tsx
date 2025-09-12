import { useState, useEffect } from "react"; 
import '../styles/Markdown.css';
import { BlogItem } from "./BlogItem.tsx"

interface Item {
    Name: string;
    Path: string;
    PathName: string;
    Description: string;
    Tags: string[];
}

function BlogList() {
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        fetch("/blogs.json")
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return (
        <>
            <h1>Blogs</h1>
            <ul>
                {data.map((item : Item, _index : number) => (
                    <BlogItem
                        index = {_index}
                        pathName = {item.PathName}
                        name = {item.Name}
                        description = {item.Description}
                        tags={item.Tags}
                    />
                ))}
            </ul>
        </>
    );
}

export default BlogList;
