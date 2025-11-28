import { motion, useScroll, useTransform } from 'framer-motion';
import '../../styles/Components/HomePage/TitleNew.css';

function Title() {
    // Get scroll progress
    const { scrollY } = useScroll();

    // Parallax transforms with different speeds
    // Brackets move slowest (0.1x speed)
    const bracketsY = useTransform(scrollY, [0, 1000], [0, -100]);

    // Title name moves second slowest (0.3x speed)
    const titleY = useTransform(scrollY, [0, 1000], [0, -270]);

    // Subtitle moves at same speed as title (0.3x speed)
    const subtitleY = useTransform(scrollY, [0, 1000], [0, -100]);

    // Outline top moves slightly faster and upward (0.4x speed, opposite direction)
    const outlineTopY = useTransform(scrollY, [0, 1000], [0, -400]);

    // Outline bottom moves slightly faster and downward (0.5x speed)
    const outlineBottomY = useTransform(scrollY, [0, 1000], [0, 100]);

    // Main logo (center) moves at medium speed (0.35x)
    const logoMainY = useTransform(scrollY, [0, 1000], [0, -200]);

    return (
        <div className="titleContainer">
            <motion.div className="titleBackground" style={{ y: bracketsY }}>
                <motion.div
                    className="cornerBorderLeft"
                    initial={{ opacity: 0, left: "2%" }}
                    animate={{ opacity: 1, left: "4.72%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src="/images/title/corner-left.svg" alt="" />
                </motion.div>

                <motion.div
                    className="cornerBorderRight"
                    initial={{ opacity: 0, right: "2%" }}
                    animate={{ opacity: 1, right: "4.56%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src="/images/title/corner-right.svg" alt="" />
                </motion.div>
            </motion.div>

            <motion.h1
                className="bgLogo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0 }}
            >
                Aiden Tran
            </motion.h1>

            <div className="titleContent">
                <motion.div style={{ y: outlineTopY, width: '100%', height: '44.72%', position: 'absolute', top: 0, left: 0 }}>
                    <motion.div
                        className="logoOutlineTop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <img src="/images/title/logo-outline.svg" alt="" />
                    </motion.div>
                </motion.div>

                <motion.div style={{ y: outlineBottomY, width: '100%', height: '44.72%', position: 'absolute', bottom: 0, left: 0 }}>
                    <motion.div
                        className="logoOutlineBottom"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <img src="/images/title/logo-outline.svg" alt="" />
                    </motion.div>
                </motion.div>

                <motion.div style={{ y: logoMainY, position: 'absolute', top: '29.04%', left: 0, width: '100%', height: '44.72%', zIndex: 6 }}>
                    <motion.div
                        className="logoMain"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <img src="/images/title/logo-main.svg" alt="Aiden Tran" />
                    </motion.div>
                </motion.div>

                <motion.div style={{ y: titleY, position: 'absolute', top: '24.06%', left: '26.82%', zIndex: 7 }}>
                    <motion.p
                        className="titleName"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        AIDEN TRAN
                    </motion.p>
                </motion.div>

                <motion.div style={{ y: subtitleY, position: 'absolute', bottom: '22.84%', left: '1.94%', zIndex: 7 }}>
                    <motion.p
                        className="titleSubtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                    >
                        Developing efficient and interactive software systems
                    </motion.p>
                </motion.div>
            </div>

            <motion.div
                className="scrollDownContainer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.2 }}
            >
                <div className="arrow"></div>
                <div className="arrow"></div>
            </motion.div>
        </div>
    );
}

export default Title;
