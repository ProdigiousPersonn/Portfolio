import { Component } from 'react';
import "@styles/Components/HomePage/Home.css";

import About from "@components/HomePage/About.tsx";
import Title from "@components/HomePage/Title.tsx";
import Projects from "@components/HomePage/Projects.tsx";
import Divider from "@components/Divider.tsx";
import SectionLines from "@components/SectionLines.tsx"

class Home extends Component<unknown> {
    render() {
        return (
            <>
                <Title/>
                <Divider text = "About" duration = { 15 }/>
                <header style={{padding: "4rem"}}>
                    <h1 className="sectionTitle">About</h1>
                    <SectionLines lineWidth="150px" lineHeight={2} gap={10} spacing={500} />
                </header>
                <header style={{paddingBottom: "4rem"}}>
                    <About/>
                </header>
                
                <Divider text = "Projects" duration = { 15 }/>
                <header style={{padding: "4rem"}}>
                    <h1 className="sectionTitle">Projects</h1>
                    <SectionLines lineWidth="150px" lineHeight={2} gap={10} spacing={650} />
                </header>
                <Projects/>
            </>
        );
    }
}

export default Home;
