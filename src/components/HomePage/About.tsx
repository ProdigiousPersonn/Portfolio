import React, { useRef } from 'react';
import {
    FaUser, FaEnvelope, FaLaptopCode, FaGithub, FaLinkedin,
    FaPython, FaJava, FaReact, FaNodeJs, FaHtml5, FaCss3,
} from 'react-icons/fa';
import { SiLua, SiRobloxstudio, SiElectron, SiCplusplus, SiNextdotjs, SiUnity } from "react-icons/si";
import { motion, useInView } from 'framer-motion';
import CvButton from "@components/CvButton.tsx"
import '@styles/Components/HomePage/About.css';

interface BoxProps {
    children: React.ReactNode;
    className?: string;
    flexGrow?: number;
}

const Box: React.FC<BoxProps> = ({ children, className = '', flexGrow = 1 }) => (
    <div
        className={`aboutBox bevelContainer ${className}`}
        style={{ flexGrow }}
    >
        {children}
    </div>
);

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });


    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.06,
            },
        },
    };

    const box = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.215, 0.61, 0.355, 1] } },
    };

    // const icon = {
    //     hidden: { scale: 0, rotate: -180 },
    //     visible: { scale: 1, rotate: 0, transition: { duration: 0.18, ease: [0.175, 0.885, 0.32, 1.275] } },
    // };

    // const heading = {
    //     hidden: { opacity: 0, x: -30 },
    //     visible: { opacity: 1, x: 0, transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] } },
    // };

    // const divider = {
    //     hidden: { scaleX: 0 },
    //     visible: { scaleX: 1, transition: { duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] } },
    // };

    // const text = {
    //     hidden: { opacity: 0, y: 20 },
    //     visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] } },
    // };

    // const image = {
    //     hidden: { opacity: 0, scale: 0.8 },
    //     visible: { opacity: 1, scale: 1, transition: { duration: 0.18, ease: [0.175, 0.885, 0.32, 1.275] } },
    // };

    return (
        <div ref={containerRef}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.18, ease: [0.175, 0.885, 0.32, 1.275] }}>
                <CvButton />
            </motion.div>
            <div className="aboutWrapper">
                <motion.div className="aboutContainer" variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                    <div className="aboutColumn">
                        <motion.div variants={box}>
                            <Box flexGrow={1.6}>
                                <FaUser className="aboutIcon"/>
                                <h1 className="aboutHeading">About</h1>
                                <div className="sectionDivider"></div>
                                <p className="aboutText">
                                    An 18 year old programmer with 6+ years of experience using
                                    C++, C#, Python, Lua, and Java. Loves building websites and games.
                                </p>
                                <img src="/images/PortfolioAbout.png" className="aboutImage"></img>
                            </Box>
                        </motion.div>

                        <motion.div variants={box}>
                            <Box>
                                <FaEnvelope className="aboutIcon"/>
                                <h1 className="aboutHeading">Contact</h1>
                                <div className="sectionDivider"></div>
                            <div className="contactTableGrid">
                                    <div className="contactTableItem gridItem">
                                        <FaEnvelope className="contactIcon"/>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=aidentran900@gmail.com&tf=1"
                                            className="contactText"
                                        >
                                            Email
                                        </a>
                                    </div>
                                    <div className="contactTableItem gridItem">
                                        <FaGithub className="contactIcon"/>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://github.com/ProdigiousPersonn"
                                            className="contactText"
                                        >
                                            Github
                                        </a>
                                    </div>
                                    <div className="contactTableItem gridItem">
                                        <FaLinkedin className="contactIcon"/>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://linkedin.com/in/aiden-tran-3a9709306/"
                                            className="contactText"
                                        >
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </Box>
                        </motion.div>
                    </div>

                    <div className="aboutColumn">
                        <motion.div variants={box}>
                            <Box flexGrow={1.7}>
                                <FaLaptopCode className="aboutIcon"/>
                                <h1 className="aboutHeading">Skills</h1>
                                <div className="sectionDivider"></div>

                                <h2 className="aboutSubheading">Languages</h2>
                                <div className="gridList">
                                    <div className="gridItem"><SiLua/> Lua</div>
                                    <div className="gridItem"><SiCplusplus/> C#</div>
                                    <div className="gridItem"><SiCplusplus/> C++</div>
                                    <div className="gridItem"><FaPython/> Python</div>
                                    <div className="gridItem"><FaJava/> Java</div>
                                    <div className="gridItem"><FaHtml5 /> HTML</div>
                                    <div className="gridItem"><FaCss3 /> CSS</div>
                                </div>
                                <div className="sectionDivider"></div>

                                <h2 className="aboutSubheading">Frameworks</h2>
                                <div className="gridList">
                                    <div className="gridItem"><FaReact/> React</div>
                                    <div className="gridItem"><FaNodeJs/> Node.js</div>
                                    <div className="gridItem"><SiNextdotjs/>Next.js</div>
                                    <div className="gridItem"><SiElectron/> Electron</div>
                                    <div className="gridItem"><SiUnity/> Unity</div>
                                    <div className="gridItem"><SiRobloxstudio/> Roblox</div>
                                </div>
                            </Box>
                        </motion.div>

                        <motion.div variants={box}>
                            <Box flexGrow={0.5}>
                                <h1 className="aboutHeading">Experience</h1>
                                <div className="sectionDivider"></div>
                                <div className="tableGrid">
                                    <div className="tableItem gridItem">
                                        <div className="experienceHeader">
                                            <div className="experienceTitle">Computer Science Major</div>
                                            <span className="experienceDate">2025 - 2029</span>
                                        </div>
                                        <div className="experienceDivider"></div>
                                        <div className="experienceHeader">
                                            <div className="experienceCompany">University of California, Berkeley </div>
                                            <span className="experienceDescription">Pursuing Bachelor's degree in Computer Science with a 4.0 GPA.</span>
                                        </div>
                                    </div>
                                    <div className="tableItem gridItem">
                                        <div className="experienceHeader">
                                            <div className="experienceTitle">Intern</div>
                                            <span className="experienceDate">Summer 2024</span>
                                        </div>
                                        <div className="experienceDivider"></div>
                                        <div className="experienceHeader">
                                            <div className="experienceCompany">Key on Harmony</div>
                                            <span className="experienceDescription">Developed an application using React and the Electron framework to manage business financial data.</span>
                                        </div>
                                    </div>

                                </div>
                            </Box>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;