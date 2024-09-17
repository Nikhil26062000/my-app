import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/accountProvider";
import Top_Header from "../../components/components/Common_Components/Top_Header";

import AddIcon from "@mui/icons-material/Add";
import Footer from "../../components/Footer";
import ShimmerMap from "../../components/Shimmer/ShimmerMap";
import PostPage from "../../components/Shimmer/PostPage";
import PostLists_Admin from "./PostLists_Admin";
import Navbar from "../CitizenScientistKit/Navbar";

const Post_Page_Admin = () => {
  const fixedColor = "#125B57";
  const navigate = useNavigate();
  const { setToken } = useContext(MyContext);
  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setToken(null);
        navigate("/");
      }
    };

    // Run on initial load
    checkToken();

    // Run when localStorage changes
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [navigate, setToken]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          "https://farmersforforests.org/admin/acc/appdata/usersignaturelist"
        );
  
        // Check if the response status is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Check if the response content type is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          console.log(response);
          const data = await response.json();
          console.log(data);
          setPostData(data);
          setLoading(true);
        } else {
          const text = await response.text();
          console.error('Unexpected content type:', contentType);
          console.error('Response body:', text);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchPost();
  }, []);
  
  return (
    <div className="w-full box-border">
      <Top_Header title="Admin Page" />
      <section className="w-full mt-[14px] flex justify-center">
        <Navbar isForum={true} />
      </section>

      

      <section className="w-full  box-border py-2 px-5">
        {!loading && (
          <>
            <div className="flex flex-col gap-5">
              <PostPage />
              <PostPage />
              <PostPage />
              <PostPage />
              <PostPage />
              <PostPage />
            </div>
          </>
        )}
        {postData &&
          postData.map((ele, index) => {
            return (
              <div key={ele.pid}>
                <PostLists_Admin
                  isImage={true}
                  url_link={ele.url_link}
                  name={ele.username ? ele.username : "Dummy User"}
                  occupation="environmental science tracher"
                  place="Mumbai "
                  day="Yesterday"
                  msg={ele.description }
                  number_of_responses="3 Responses"
                />
              </div>
            );
          })}

        
      </section>

      <section className="mt-16">
        <Footer color={fixedColor} />
      </section>
    </div>
  );
};

export default Post_Page_Admin;
