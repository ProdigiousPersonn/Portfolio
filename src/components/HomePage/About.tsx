import React, { useRef } from 'react';
import { 
    FaUser, FaEnvelope, FaLaptopCode, FaGithub, FaLinkedin, 
    FaPython, FaJava, FaReact, FaNodeJs, FaHtml5, FaCss3,
} from 'react-icons/fa';
import { SiLua, SiRobloxstudio, SiElectron, SiCplusplus, SiNextdotjs, SiUnity } from "react-icons/si";
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import '../../styles/Components/HomePage/About.css';

gsap.registerPlugin(ScrollTrigger);

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
    const cvButtonRef = useRef<HTMLAnchorElement>(null);

    useGSAP((context) => {
        const el = containerRef.current;
        if (!el) return;

        const q = context.selector!;

        gsap.set([cvButtonRef.current, q(".aboutBox")], { opacity: 0, y: 50 });
        gsap.set(q(".aboutIcon"), { scale: 0, rotation: -180 });
        gsap.set(q(".aboutHeading"), { opacity: 0, x: -30 });
        gsap.set(q(".sectionDivider"), { scaleX: 0 });
        gsap.set(q(".aboutText, .contactTableItem, .gridItem, .tableItem"), {
        opacity: 0,
        y: 20,
        });
        gsap.set(q(".aboutImage"), { opacity: 0, scale: 0.8 });

        const timer = setTimeout(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            // toggleActions: "play none none none",
            // markers: true,
            },
        });

        tl.to(cvButtonRef.current, { opacity: 1, y: 0, duration: 0.27, ease: "back.out(1.7)" })
            .to(q(".aboutBox"), { opacity: 1, y: 0, duration: 0.36, stagger: 0.09, ease: "power3.out" }, "-=0.135")
            .to(q(".aboutIcon"), { scale: 1, rotation: 0, duration: 0.27, stagger: 0.045, ease: "back.out(1.7)" }, "-=0.18")
            .to(q(".aboutHeading"), { opacity: 1, x: 0, duration: 0.225, stagger: 0.045, ease: "power2.out" }, "-=0.135")
            .to(q(".sectionDivider"), { scaleX: 1, duration: 0.18, stagger: 0.045, ease: "power2.inOut" }, "-=0.09")
            .to(q(".aboutText"), { opacity: 1, y: 0, duration: 0.225, ease: "power2.out" }, "-=0.09")
            .to(q(".aboutImage"), { opacity: 1, scale: 1, duration: 0.27, ease: "back.out(1.7)" }, "-=0.135")
            .to(q(".contactTableItem"), { opacity: 1, y: 0, duration: 0.18, stagger: 0.045, ease: "power2.out" }, "-=0.18")
            .to(q(".gridItem"), { opacity: 1, y: 0, duration: 0.135, stagger: 0.0225, ease: "power2.out" }, "-=0.135")
            .to(q(".tableItem"), { opacity: 1, y: 0, duration: 0.225, stagger: 0.0675, ease: "power2.out" }, "-=0.09");

        ScrollTrigger.refresh();
        }, 50);

        const observer = new ResizeObserver(() => ScrollTrigger.refresh());
        observer.observe(el);

        return () => {
        clearTimeout(timer);
        observer.disconnect();
        ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, { scope: containerRef });


    return (
        <div ref={containerRef}>
            <a 
                ref={cvButtonRef} 
                className="cvButton bevelContainer" 
                href="https://docs.google.com/document/d/15XsQiQ9Ve6SaYzA75a2NN_CBKZd0AZw5pGCpJen6u_k/export?format=pdf"
                target="_blank" 
                rel="noopener noreferrer" 
            >
                Download Resume
            </a>
            <div className="aboutWrapper">
                <div className="aboutContainer">
                    <div className="aboutColumn">
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
                    </div>

                    <div className="aboutColumn">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;