import React, { useEffect, useState } from "react";
import Top_Header from "./components/Common_Components/Top_Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";
import { useNavigate } from "react-router-dom";

import ShimmerMap from "./Shimmer/ShimmerMap";
import axiosInstance from "../utils/axiosInstance";

const ScannedQrDetailPage = () => {
  const fixedColor = "#125B57";
  const { id } = useParams(); // Extract the `id` from URL parameters
  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate()
  const [isImageLoaded, setIsImageLoaded] = useState(false); // State to manage image load


  // useEffect(() => {
  //   const fetchQrData = async () => {
  //     try {
  //       // Make POST request with axios
  //       const response = await axios.post(
  //         "https://farmersforforests.org/admin/acc/appdata/qrinfo",
  //         {
  //           qrscan_id: id,
  //         }
  //       );

  //       // Set the fetched data to state
  //       setData(response.data);
  //       console.log(response.data); // Log the data for debugging

  //       // Simulate a delay before setting loading to false
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000); // Adjust delay as needed (1000ms = 1 second)

  //     } catch (error) {
  //       console.error("Error fetching qrdata data:", error);
  //       setError("Error fetching qrdata data"); // Set error message to state
  //       setLoading(false); // Ensure loading is stopped on error
  //     }
  //   };

  //   fetchQrData();
  // }, [id]); // Add `id` as a dependency to re-fetch data if `id` changes


  //! api call using axios instance
  useEffect(() => {
    const fetchQrData = async () => {
      try {
        console.log("axiossssssssssssssssss");
        const response = await axiosInstance.post(
          "/admin/acc/appdata/qrinfo",
          {
            qrscan_id: id,
          }
        );

        setData(response.data);
        console.log(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching qrdata data:", error);
        setError("Error fetching qrdata data");
        setLoading(false);
      }
    };

    fetchQrData();
  }, [id]);












  if (loading) {
    return <LoadingAnimation />; // Render loader while data is loading
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true); // Set image loaded state to true when image is fully loaded
  };

  return (
    <div className="min-h-screen">
      <Top_Header title={data?.qrscan_name} />
      <div className="w-full box-border mt-[16px] px-5  overflow-hidden">
        {/* Image Section */}
        <div className=" rounded-2xl w-full py-2">
        {!isImageLoaded && <ShimmerMap height={256} width="100%"/>}
          <img
            src={
              data?.image
                ? `${process.env.PUBLIC_URL}/assests/${data.image}`
                : "https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }
            alt="Profile"
            className={`w-full h-64 object-cover rounded-lg ${isImageLoaded ? "block" : "hidden"}`}
            onLoad={handleImageLoad}

          />
        </div>

        {/* Details Section */}
        <div className="">
          <h2 className="text-[16px] font-semibold pt-2 text-gray-800">
            {data?.qrscan_title}
          </h2>
          <p className="mt-4 text-[14px] text-justify text-gray-600">{data?.discription}</p>
        </div>
      </div>

      <section className="mt-20">
        <Footer color={fixedColor} />
      </section>
    </div>
  );
};

export default ScannedQrDetailPage;
