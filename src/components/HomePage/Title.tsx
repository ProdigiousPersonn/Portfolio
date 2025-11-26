import { motion } from 'framer-motion';
import '../../styles/Components/HomePage/TitleNew.css';

function Title() {
    return (
        <div className="titleContainer">
            {/* Background with corner borders */}
            <div className="titleBackground">
                {/* Left corner border */}
                <motion.div
                    className="cornerBorderLeft"
                    initial={{ opacity: 0, left: "2%" }}
                    animate={{ opacity: 1, left: "4.72%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src="/images/title/corner-left.svg" alt="" />
                </motion.div>

                {/* Right corner border */}
                <motion.div
                    className="cornerBorderRight"
                    initial={{ opacity: 0, right: "2%" }}
                    animate={{ opacity: 1, right: "4.56%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src="/images/title/corner-right.svg" alt="" />
                </motion.div>
            </div>


            {/* Background text */}
            <motion.h1
                className="bgLogo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0 }}
            >
                Aiden Tran
            </motion.h1>

            {/* Main content */}
            <div className="titleContent">
                {/* Background outline logos */}
                <motion.div
                    className="logoOutlineTop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <img src="/images/title/logo-outline.svg" alt="" />
                </motion.div>

                <motion.div
                    className="logoOutlineBottom"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <img src="/images/title/logo-outline.svg" alt="" />
                </motion.div>

                {/* Main logo */}
                <motion.div
                    className="logoMain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <img src="/images/title/logo-main.svg" alt="Aiden Tran" />
                </motion.div>

                {/* Name text */}
                <motion.p
                    className="titleName"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    AIDEN TRAN
                </motion.p>

                {/* Subtitle */}
                <motion.p
                    className="titleSubtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    Developing efficient and interactive software systems
                </motion.p>
            </div>

            {/* Scroll indicator */}
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
