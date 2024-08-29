// import React, { useEffect, useContext, useState } from "react";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import "../styles/HomePage.css";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import { useSession } from "../components/SessionContext";
// import { MyContext } from "../context/accountProvider";
// import HomepageHeader from "../components/HomepageHeader";
// import { Image, Shimmer } from "react-shimmer";

// // import { useNavigate } from 'react-router-dom';

// const CustomButton = styled(Button)(({ bgcolor }) => ({
//   borderRadius: "16px",
//   width: "100%",
//   height: "80px",
//   fontSize: "16px",
//   backgroundColor: bgcolor,
// }));

// const HomePage = () => {
//   const navigate = useNavigate();
//   // const { setHeaderFooterColor } = useSession();
//   const { token, setToken } = useContext(MyContext);
//   const [headerFooterColor, setHeaderFooterColor] = useState("#125B57"); // Sta

//   const fixedColor = "#125B57";
//   useEffect(() => {
//     const storedColor =
//       sessionStorage.getItem("headerFooterColor") || fixedColor;
//     sessionStorage.setItem("headerFooterColor", storedColor);
//     setHeaderFooterColor(storedColor);
//   }, []);

//   useEffect(() => {
//     const checkToken = () => {
//       const storedToken = localStorage.getItem("token");
//       if (!storedToken) {
//         setToken(null);
//         navigate("/");
//       }
//     };

//     // Run on initial load
//     checkToken();

//     // Run when localStorage changes
//     window.addEventListener("storage", checkToken);

//     return () => {
//       window.removeEventListener("storage", checkToken);
//     };
//   }, [navigate, setToken]);

//   const buttons = [
//     { label: "Western Ghats", color: "#BA744A", id: "er105" },
//     { label: "Wetland", color: "#4293B8", id: "er106" },
//     { label: "Central Forest", color: "#E05555", id: "er101" },
//     { label: "Mandala Garden", color: "#125B57", id: "er104" },
//     { label: "Dry and Arid Region", color: "#F4910F", id: "er102" },
//     { label: "Grasslands", color: "#86A34D", id: "er103" },
//   ];

//   const handleButtonClick = (btn) => {
//     if(btn.id!=="er103"){
//     sessionStorage.setItem("headerFooterColor", btn.color);
//     setHeaderFooterColor(btn.color);
//     navigate(`/region/${btn.id}`);
//     }
//   };

//   return (
//     <div className="home-page">
//       <HomepageHeader title="Home Page" color={fixedColor} />

//       <div className=" w-full !box-border  flex  flex-wrap px-[12px] mt-9">
//         {buttons.map((btn, index) => (
//           <div className="w-1/2 px-2 py-2 relative" key={index}>
//             <button
//               style={{ backgroundColor: btn.color }} // Use inline styles for dynamic colors
//               className="w-full h-24 text-[14px]  text-white rounded-[10px]"
//               onClick={() => handleButtonClick(btn)}
//               disabled={btn.id==="er103"}
//             >
//               {btn.label}
//             </button>
//             {/* <span className="absolute right-5 bottom-4  z-[100]"><ArrowForwardIcon className="!text-[18px] text-white"/></span> */}
//           </div>
//         ))}
//       </div>

    

//       <h4 className="text-left px-[20px] pt-2 font-bold text-[#125B57]">Map</h4>

    
//       <section className="px-[20px] py-4">
//         <img
//           src={`${process.env.PUBLIC_URL}/assests/Homepage.jpg`}
//           alt="homepage"
//           className="w-full rounded-lg"
//           // onError={handleImageError}
//         />
//       </section>

//       <div className="mt-16">
//         <Footer color={fixedColor} />
//       </div>
//     </div>
//   );
// };

// export default HomePage;




import React, { useEffect, useContext, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSession } from "../components/SessionContext";
import { MyContext } from "../context/accountProvider";
import HomepageHeader from "../components/HomepageHeader";

import { ShimmerDiv } from "shimmer-effects-react";

const CustomButton = styled(Button)(({ bgcolor }) => ({
  borderRadius: "16px",
  width: "100%",
  height: "80px",
  fontSize: "16px",
  backgroundColor: bgcolor,
}));

const HomePage = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(MyContext);
  const [headerFooterColor, setHeaderFooterColor] = useState("#125B57");
  const [isImageLoaded, setIsImageLoaded] = useState(false); // State to manage image load
  const fixedColor = "#125B57";

  useEffect(() => {
    const storedColor = sessionStorage.getItem("headerFooterColor") || fixedColor;
    sessionStorage.setItem("headerFooterColor", storedColor);
    setHeaderFooterColor(storedColor);
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setToken(null);
        navigate("/");
      }
    };

    checkToken();
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [navigate, setToken]);

  const buttons = [
    { label: "Western Ghats", color: "#BA744A", id: "er105" },
    { label: "Wetland", color: "#4293B8", id: "er106" },
    { label: "Central Forest", color: "#E05555", id: "er101" },
    { label: "Mandala Garden", color: "#125B57", id: "er104" },
    { label: "Dry and Arid Region", color: "#F4910F", id: "er102" },
    { label: "Grasslands", color: "#86A34D", id: "er103" },
  ];

  const handleButtonClick = (btn) => {
    if (btn.id !== "er103") {
      sessionStorage.setItem("headerFooterColor", btn.color);
      setHeaderFooterColor(btn.color);
      navigate(`/region/${btn.id}`);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true); // Set image loaded state to true when image is fully loaded
  };

  return (
    <div className="home-page">
      <HomepageHeader title="Home Page" color={fixedColor} />

      <div className="w-full !box-border flex flex-wrap px-[12px] mt-9">
        {buttons.map((btn, index) => (
          <div className="w-1/2 px-2 py-2 relative" key={index}>
            <button
              style={{ backgroundColor: btn.color }}
              className="w-full h-24 text-[14px] text-white rounded-[10px]"
              onClick={() => handleButtonClick(btn)}
              disabled={btn.id === "er103"}
            >
              {btn.label}
            </button>
          </div>
        ))}
      </div>

      <h4 className="text-left px-[20px] pt-2 font-bold text-[#125B57]">Map</h4>

      <section className="px-[20px] py-4">
        {/* Show shimmer while image is loading */}
        {!isImageLoaded && <ShimmerDiv mode="light" height={348} width="100%" className="!rounded-lg"/>}

        {/* Actual image */}
        <img
          src={`${process.env.PUBLIC_URL}/assests/Homepage.jpg`}
          alt="homepage"
          className={`w-full rounded-lg ${isImageLoaded ? "block" : "hidden"}`}
          onLoad={handleImageLoad} // Event handler to trigger when image is loaded
        />
      </section>

      <div className="mt-16">
        <Footer color={fixedColor} />
      </div>
    </div>
  );
};

export default HomePage;
