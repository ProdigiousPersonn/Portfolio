// Imports
import { Component } from 'react';
import "../../styles/Home.css";

// Components
import About from "./About.tsx";
import Title from "./Title.tsx";
import Projects from "./Projects.tsx";
import Divider from "../Divider.tsx";

// Main Code
class Home extends Component<unknown> {
    render() {
        return (
            <>
                <Title/>

                <Divider text = "About" duration = { 15 }/>
                <header style={{padding: "2rem"}}>
                    <h2 className="subHead">About</h2>
                </header>
                <About/>
                
                <Divider text = "Projects" duration = { 15 }/>
                <header style={{padding: "2rem"}}>
                    <h2 className="subHead">Projects</h2>
                </header>
                <Projects/>
            </>
        );
    }
}

export default Home;
