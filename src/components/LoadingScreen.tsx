import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const Loader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleLoading = () => {
      setTimeout(() => {
        gsap.to(".loader", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => setIsVisible(false),
        });
      }, 1000);
    };

    if (document.readyState === "complete") {
      handleLoading();
    } else {
      window.addEventListener("load", handleLoading);
    }

    return () => {
      window.removeEventListener("load", handleLoading);
    };
  }, []);

  if (!isVisible) {
    document.body.style.background = "";
    document.body.style.overflow = "auto";
    return null;
  }

  return (
    <div className="loader" style={loaderStyle}>
      <div style={spinnerStyle}></div>
      <h2 style={{ color: "white", marginTop: "1rem" }}>Initializing...</h2>
    </div>
  );
};

const loaderStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "#000000ff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999999999999,
  opacity: 1,
};

const spinnerStyle: React.CSSProperties = {
  width: "60px",
  height: "60px",
  border: "6px solid #444",
  borderTop: "6px solid #ff0000ff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const style = document.createElement("style");
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

export default Loader;
