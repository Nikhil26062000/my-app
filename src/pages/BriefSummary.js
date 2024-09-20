import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MyContext } from "../context/accountProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingAnimation from "../components/LoadingAnimation";
import "../styles/BriefSummary.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { api_url } from "../constants";

import ShimmerMap from "../components/Shimmer/ShimmerMap";

const CloseButton = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleClose}
      style={{
        position: "fixed",
        top: "40px",
        left: "30px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "25px",
        color: "#FFFFFF",
      }}
    >
      X
    </button>
  );
};

const BriefSummary = () => {
  const { token, setToken } = useContext(MyContext);
  const { regionId } = useParams();
  const [regionData, setRegionData] = useState(null);
  const [error, setError] = useState(null);
  const [truncatedDescription, setTruncatedDescription] = useState("");
  const [showLoading, setShowLoading] = useState(true); // New state for loading
  const [headerFooterColor, setHeaderFooterColor] = useState("#125B57");
  const [isImage1Loaded, setIsImage1Loaded] = useState(false); // State to manage image load
  const [isImage2Loaded, setIsImage2Loaded] = useState(false); // State to manage image load

  const fixedColor = "#125B57";
  useEffect(() => {
    const storedColor =
      sessionStorage.getItem("headerFooterColor") || fixedColor;
    sessionStorage.setItem("headerFooterColor", storedColor);
    setHeaderFooterColor(storedColor);
  }, []);

  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(`${api_url}/admin/acc/appdata/homepage`);
    fetch(`${api_url}/admin/acc/appdata/homepage`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const region = data.find((item) => item.region_id === regionId);
        if (region) {
          setRegionData(region);
          const fullDescription = region.discription;
          const words = fullDescription.split(" ");
          const truncated =
            words.slice(0, 25).join(" ") + (words.length > 25 ? "..." : "");
          setTruncatedDescription(truncated);
        } else {
          setError("Region not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching region data:", error);
        // setError("Error fetching region data");
      })
      .finally(() => {
        setTimeout(() => setShowLoading(false), 1000); // Hide loading after 2 seconds
      });
  }, [regionId]);

  if (showLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleImage1Load = () => {
    setIsImage1Loaded(true); // Set image loaded state to true when image is fully loaded
  };

  const handleImage2Load = () => {
    setIsImage2Loaded(true); // Set image loaded state to true when image is fully loaded
  };

  if (!regionData) {
    return null; // If no data and not loading, show nothing or a message
  }

  const handleImageError = (event) => {
    event.target.src = `${process.env.PUBLIC_URL}/homepagemap.png`;
  };

  const imageUrl1 = `${process.env.PUBLIC_URL}/assests/${regionId}_1.png`;
  const imageUrl2 = `${process.env.PUBLIC_URL}/assests/${regionId}_2.jpg`;

  return (
    <div className="region-info">
    <Header title={regionData.region_name} color={headerFooterColor} />
    <CloseButton />
    <div className="BSbody">
      <h2 className="RegionOverview">{regionData.title}</h2>
      <div className="relative">
        {/* Image with shimmer effect */}
        {!isImage1Loaded && (
          <ShimmerMap height={198} width="100" />
        )}
  
        {/* Always render the image, and manage visibility with classes */}
        <img
          src={imageUrl1}
          alt={`${regionData.region_name} asset1`}
          className={`w-full ${isImage1Loaded ? "block" : "hidden"}`} // Show or hide image
          onError={handleImageError}
          onLoad={handleImage1Load}
        />
  
        <Link to={`/region/${regionId}/detailed`}>
        {isImage1Loaded &&   <div className="absolute  right-5 bottom-6 flex gap-2">
            <p className=" font-bold text-white">Summary</p>
            <ArrowForwardIcon className="text-white" />
          </div>}
        </Link>
      </div>
      <p className="shortdescription !text-justify">
        {truncatedDescription}
        <Link
          to={`/region/${regionId}/detailed`}
          className="summary-link font-bold underline text-blue-400 italic"
        >
          Summary
        </Link>
      </p>
  
      <h4 className="text-left pb-5  pt-2 font-bold text-[#125B57]">Map</h4>
  
      {/* Image with shimmer effect */}
      {!isImage2Loaded && (
        <ShimmerMap height={348} width="100" />
      )}
  
      {/* Always render the image, and manage visibility with classes */}
      <img
        src={imageUrl2}
        alt={`${regionData.region_name} asset2`}
        className={`w-full rounded-lg ${isImage2Loaded ? "block" : "hidden"}`}
        onError={handleImageError}
        onLoad={handleImage2Load}
      />
  
      <section className="mt-10">
        <Footer color={headerFooterColor} />
      </section>
    </div>
  </div>
  
  );
};

export default BriefSummary;
