import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSession } from "../components/SessionContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/ItemDetail.css";
import { MyContext } from "../context/accountProvider";
import LoadingAnimation from "../components/LoadingAnimation"; // Import the loading animation component

import ItemDeatilShimmer from "../components/Shimmer/ItemDeatilShimmer";
import axiosInstance from "../utils/axiosInstance";

const ItemDetail = () => {
  const { region_id, species_id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const { setToken } = useContext(MyContext);
  const [headerFooterColor, setHeaderFooterColor] = useState("#125B57"); // State for header/footer color
  const [isImageLoaded, setIsImageLoaded] = useState(false); // State to manage image load

  const fixedColor = "#125B57";
  useEffect(() => {
    const storedColor =
      sessionStorage.getItem("headerFooterColor") || fixedColor;
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

  // useEffect(() => {
  //   console.log("region_id:", region_id, "species_id:", species_id);

  //   const fetchItemDetails = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://farmersforforests.org/admin/acc/appdata/speciesdetailsinfo",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             region_id: region_id,
  //             species_id: species_id,
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       const details = data.details_list_name[0];
  //       setItem(details);

  //       // Delay setting loading to false by 1 second
  //       setTimeout(() => setLoading(false), 1000);
  //     } catch (error) {
  //       console.error("Error fetching item details:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchItemDetails();
  // }, [region_id, species_id]);






  useEffect(() => {
    console.log("region_id:", region_id, "species_id:", species_id);

    const fetchItemDetails = async () => {
      try {
        const response = await axiosInstance.post(
          "/admin/acc/appdata/speciesdetailsinfo",
          {
            region_id: region_id,
            species_id: species_id,
          }
        );
          console.log("Axios",response);
        const details = response.data.details_list_name[0];
        setItem(details);

        // Delay setting loading to false by 1 second
        setTimeout(() => setLoading(false), 1000);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [region_id, species_id]);





  if (loading) {
    return <LoadingAnimation />; // Show the loading animation
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true); // Set image loaded state to true when image is fully loaded
  };

  if (!item) {
    return <div>No item found</div>;
  }

  return (
    <div className="page-container mt-[120px] px-[20px]">
      <Header title={item.species_common_name} color={headerFooterColor} />

      <div className="content">
        {item.species_image_name && (
          <div className="w-full h-[300px]">
          {!isImageLoaded && <ItemDeatilShimmer  height={300} width="100"  />}
            <img
              src={`${process.env.PUBLIC_URL}/assests/${item.species_image_name}`}
              alt={item.species_common_name}
              className={`w-full h-[300px] rounded-[20px] py-2 ${isImageLoaded ? "block" : "hidden"}`} // Conditionally show or hide image
              onLoad={handleImageLoad}
            />
          </div>
        )}
        {/* item.species_photo_url */}

        {/* <h2>{item.species_common_name}</h2> */}
        <p className="">
          <strong>Scientific Name:</strong> {item.species_botanical_name}
        </p>
        <p className="text-justify text-[14px] tracking-wide py-2">
          {item.species_description}
        </p>
        {item.species_audio_url && (
          <audio controls>
            <source src={item.species_audio_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>

      <div className="mt-16">
        <Footer color={headerFooterColor} />
      </div>
    </div>
  );
};

export default ItemDetail;
