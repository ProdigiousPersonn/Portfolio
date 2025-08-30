import React, { Component, CSSProperties } from 'react';
import { 
    FaUser, FaEnvelope, FaLaptopCode, FaGithub, FaLinkedin, 
    FaPython, FaJava, FaCuttlefish, FaReact, FaNodeJs, FaCode
} from 'react-icons/fa';
import { SiLua, SiRobloxstudio } from "react-icons/si";

const wrapperStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100vw",
    padding: "clamp(1rem, 2vw, 2rem)",
    boxSizing: "border-box",
};

const containerStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    maxWidth: "1400px",
    gap: "clamp(1rem, 2.5vw, 2.5rem)",
    padding: "0",
    boxSizing: "border-box",
    flexDirection: "row",
};

const columnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: "clamp(1rem, 2vw, 1.5rem)",
    minWidth: 0,
};

const boxBaseStyle: CSSProperties = {
    padding: "clamp(1rem, 2.5vw, 1.5rem)",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, var(--bgColor-light), var(--bgColor-muted))",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "default",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    wordWrap: "break-word",
    minHeight: "fit-content",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const hoverEffectStyle: CSSProperties = {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
};

const iconStyle: CSSProperties = {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    marginBottom: "clamp(0.5rem, 1vw, 0.8rem)",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
};

const headingStyle: CSSProperties = {
    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
    margin: "0 0 clamp(0.5rem, 1.5vw, 1rem) 0",
    fontWeight: "600",
    letterSpacing: "-0.5px",
};

const subheadingStyle: CSSProperties = {
    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
    margin: "clamp(0.5rem, 1.5vw, 1rem) 0 clamp(0.5rem, 1vw, 0.8rem) 0",
    fontWeight: "500",
    opacity: "0.9",
};

const aboutTextStyle: CSSProperties = {
    lineHeight: "1.6",
    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
    opacity: "0.9",
    maxWidth: "100%",
    textAlign: "center",
};

const gridListStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "clamp(0.5rem, 1vw, 0.8rem)",
    width: "100%",
    marginBottom: "clamp(0.3rem, 0.8vw, 0.5rem)",
};

const gridItemStyle: CSSProperties = {
    background: "rgba(0,0,0,0.15)",
    padding: "clamp(0.5rem, 1.2vw, 0.8rem) clamp(0.5rem, 1.5vw, 1rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
    borderRadius: "clamp(4px, 1vw, 8px)",
    transition: "all 0.3s ease",
    fontWeight: "500",
    border: "1px solid rgba(255,255,255,0.05)",
    minHeight: "clamp(40px, 6vw, 50px)",
};

const tableGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "clamp(0.5rem, 1.5vw, 1rem)",
    width: "100%",
    textAlign: "left",
};

const tableItemStyle: CSSProperties = {
    background: "rgba(0,0,0,0.15)",
    padding: "clamp(0.8rem, 2vw, 1rem)",
    fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
    borderRadius: "clamp(4px, 1vw, 8px)",
    border: "1px solid rgba(255,255,255,0.05)",
    lineHeight: "1.5",
};

const contactTableGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "clamp(0.4rem, 1vw, 0.8rem)",
    width: "100%",
    textAlign: "left",
};

const contactTableItemStyle: CSSProperties = {
    background: "rgba(0,0,0,0.15)",
    padding: "clamp(0.6rem, 1.5vw, 0.8rem) clamp(0.8rem, 2vw, 1rem)",
    fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
    borderRadius: "clamp(4px, 1vw, 8px)",
    border: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    wordBreak: "break-all",
    minHeight: "clamp(40px, 5vw, 45px)",
};

const contactTextStyle: CSSProperties = {
    overflow: "hidden",
    textOverflow: "ellipsis",
};

const experienceHeaderStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "0.5rem",
    flexWrap: "wrap",
    gap: "0.5rem",
};

const experienceTitleStyle: CSSProperties = {
    fontSize: "clamp(1rem, 2.2vw, 1.1rem)",
    fontWeight: "bold",
};

const experienceDateStyle: CSSProperties = {
    fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
    opacity: "0.7",
    fontWeight: "500",
};

const experienceCompanyStyle: CSSProperties = {
    fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
    opacity: "0.8",
    marginBottom: "0.5rem",
};

const experienceDescriptionStyle: CSSProperties = {
    fontSize: "clamp(0.8rem, 1.6vw, 0.9rem)",
    opacity: "0.75",
    lineHeight: "1.4",
};

const contactIconStyle: CSSProperties = {
    fontSize: "1rem",
};

const mobileContainerStyle: CSSProperties = {
    ...containerStyle,
    flexDirection: "column",
    gap: "1rem",
};

const mobileGridListStyle: CSSProperties = {
    ...gridListStyle,
    gridTemplateColumns: "1fr",
};

const mobileWrapperStyle: CSSProperties = {
    ...wrapperStyle,
    padding: "1rem",
};

class About extends Component<unknown> {
    private isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;
    private isSmallMobile = () => typeof window !== 'undefined' && window.innerWidth <= 480;

    renderBox(content: JSX.Element, flexGrow: number = 1) {
        const boxStyle: CSSProperties = {
            ...boxBaseStyle,
            flexGrow,
        };

        return (
            <div
                style={boxStyle}
                className={"bevelContainer"}
                onMouseEnter={e => {
                    Object.assign(e.currentTarget.style, hoverEffectStyle);
                    const gridItems = e.currentTarget.querySelectorAll('[data-grid-item]') as NodeListOf<HTMLElement>;
                    gridItems.forEach(item => {
                        item.style.background = "rgba(0,0,0,0.25)";
                        item.style.transform = "translateY(-2px)";
                    });
                }}
                onMouseLeave={e => {
                    Object.assign(e.currentTarget.style, {
                        ...boxStyle,
                        flexGrow,
                    });
                    const gridItems = e.currentTarget.querySelectorAll('[data-grid-item]') as NodeListOf<HTMLElement>;
                    gridItems.forEach(item => {
                        item.style.background = "rgba(0,0,0,0.15)";
                        item.style.transform = "none";
                    });
                }}
            >
                {content}
            </div>
        );
    }

    render() {
        const isMobile = this.isMobile();
        const isSmallMobile = this.isSmallMobile();

        const currentWrapperStyle = isSmallMobile ? mobileWrapperStyle : wrapperStyle;
        const currentContainerStyle = isMobile ? mobileContainerStyle : containerStyle;
        const currentGridListStyle = isMobile ? mobileGridListStyle : gridListStyle;

        return (
            <div style={currentWrapperStyle}>
                <div style={currentContainerStyle}>
                    <div style={columnStyle}>
                        {this.renderBox(
                            <>
                                <FaUser style={iconStyle} />
                                <h1 style={headingStyle}>About</h1>
                                <div className={"sectionDivider"}></div>
                                <p style={aboutTextStyle}>
                                    An 18 year old programmer with 5+ years of experience using 
                                    C++, C#, Python, Lua, and Java. Loves building websites and games.
                                </p>
                            </>,
                            1.6,
                        )}

                        {this.renderBox(
                            <>
                                <FaEnvelope style={iconStyle} />
                                <h1 style={headingStyle}>Contact</h1>
                                <div className={"sectionDivider"}></div>
                                <div style={contactTableGridStyle}>
                                    <div style={contactTableItemStyle} data-grid-item>
                                        <FaEnvelope style={contactIconStyle} /> 
                                        <span style={contactTextStyle}>aidentran900@gmail.com</span>
                                    </div>
                                    <div style={contactTableItemStyle} data-grid-item>
                                        <FaGithub style={contactIconStyle} /> 
                                        <span style={contactTextStyle}>github.com/ProdigiousPersonn</span>
                                    </div>
                                    <div style={contactTableItemStyle} data-grid-item>
                                        <FaLinkedin style={contactIconStyle} /> 
                                        <span style={contactTextStyle}>linkedin.com/in/aiden-tran-3a9709306/</span>
                                    </div>
                                </div>
                            </>,
                            1,
                        )}
                    </div>

                    <div style={columnStyle}>
                        {this.renderBox(
                            <>
                                <FaLaptopCode style={iconStyle} />
                                <h1 style={headingStyle}>Skills</h1>
                                <div className={"sectionDivider"}></div>

                                <h2 style={subheadingStyle}>Languages</h2>
                                <div style={currentGridListStyle}>
                                    <div style={gridItemStyle} data-grid-item><SiLua/> Lua</div>
                                    <div style={gridItemStyle} data-grid-item><FaCode /> C#</div>
                                    <div style={gridItemStyle} data-grid-item><FaPython /> Python</div>
                                    <div style={gridItemStyle} data-grid-item><FaJava /> Java</div>
                                    <div style={gridItemStyle} data-grid-item><FaCuttlefish /> C++</div>
                                </div>
                                <div className={"sectionDivider"}></div>

                                <h2 style={subheadingStyle}>Frameworks</h2>
                                <div style={currentGridListStyle}>
                                    <div style={gridItemStyle} data-grid-item><FaReact /> React</div>
                                    <div style={gridItemStyle} data-grid-item><FaNodeJs /> Node.js</div>
                                    <div style={gridItemStyle} data-grid-item><FaLaptopCode /> Unity</div>
                                    <div style={gridItemStyle} data-grid-item><SiRobloxstudio /> Roblox</div>
                                </div>
                            </>,
                            1.4,
                        )}

                        {this.renderBox(
                            <>
                                <h1 style={headingStyle}>Experience</h1>
                                <div className={"sectionDivider"}></div>
                                <div style={tableGridStyle}>
                                    <div style={tableItemStyle} data-grid-item>
                                        <div style={experienceHeaderStyle}>
                                            <div style={experienceTitleStyle}>Computer Science Student</div>
                                            <div className={"sectionDivider"}></div>
                                            <span style={experienceDateStyle}>2025 - 2029</span>
                                        </div>
                                        <div style={experienceCompanyStyle}>University of California, Berkeley</div>
                                        <div style={experienceDescriptionStyle}>
                                            Pursuing Bachelor's degree in Computer Science with focus on software engineering and machine learning
                                        </div>
                                    </div>
                                    <div style={tableItemStyle} data-grid-item>
                                        <div style={experienceHeaderStyle}>
                                            <div style={experienceTitleStyle}>Software Development Intern</div>
                                            <div className={"sectionDivider"}></div>
                                            <span style={experienceDateStyle}>Summer 2024</span>
                                        </div>
                                        <div style={experienceCompanyStyle}>Key on Harmony</div>
                                        <div style={experienceDescriptionStyle}>
                                            Developed an application using React and the Electron framework to manage business financial data.
                                        </div>
                                    </div>
                                </div>
                            </>,
                            1.1,
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default About;