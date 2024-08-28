import React from "react";
import '../styles/LoadingAnimation.css'

const LoadingAnimation = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "white",
        zIndex: 333,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="preloader-2">
        <span className="line line-1"></span>
        <span className="line line-2"></span>
        <span className="line line-3"></span>
        <span className="line line-4"></span>
        <span className="line line-5"></span>
        <span className="line line-6"></span>
        <span className="line line-7"></span>
        <span className="line line-8"></span>
        <span className="line line-9"></span>
        <div style={{ fontWeight: 600 }}>Please wait</div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
