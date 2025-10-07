import "../styles/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <nav className="footer-nav">
                    <a href="/">Home →</a>
                    <a href="/projects">Projects →</a>
                    <a href="/blog">Writeups →</a>
                </nav>

                <div className="footer-right">
                    <h1></h1>
                    <div className="newsletter">
                        <h1>Contact Me!</h1>
                    </div>

                    <div className="contact-info">
                        <a href="mailto:aiden@aidentran.dev">
                            aiden@aidentran.dev
                        </a>
                        {/* <p>+phone num</p> */}
                    </div>

                    <div className="socials">
                        <a href="#">Github</a>
                        <a href="#">YouTube</a>
                        <a href="#">LinkedIn</a>
                        <a href="#">X</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>2025 Aiden Tran.</p>
            </div>

            {/* Background watermark */}
            <h1 className="footer-bg">AT</h1>
        </footer>
    );
}
