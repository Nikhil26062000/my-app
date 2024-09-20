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
import { api_url } from "../../constants";
import { unverified_post } from "../../services/ApiServices";

const Post_Page_Admin = () => {
  const fixedColor = "#125B57";
  const navigate = useNavigate();
  const { setToken } = useContext(MyContext);
  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(false);
  const [btn_clicked,set_btn_clicked] = useState(true);

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
    const fetch_unverified_post = async () => {
      setLoading(true); // Set loading to true before fetching
      const res = await unverified_post();
      console.log(res);
      setPostData(res);
      setLoading(false); // Set loading to false after fetching
    };
    fetch_unverified_post();
  }, [btn_clicked]);

  return (
    <div className="w-full box-border">
      <Top_Header title="Admin Page" />
     
      <section className="w-full box-border py-2 px-5">
        {loading && (
          <div className="flex flex-col gap-5">
            <PostPage />
            
          </div>
        )}
        {postData &&
          postData.map((ele) => (
            <div key={ele.pid}>
              <PostLists_Admin
                ele={ele}
                isImage={ele.type == "img"}
                isAudio={ele.type == "aud"}
                isVideo={ele.type == "vid"}
                url_link={ele.url_link}
                name={ele.username ? ele.username : "Dummy User"}
                occupation="environmental science tracher"
                place="Mumbai "
                day="Yesterday"
                msg={ele.description}
                number_of_responses="3 Responses"
                set_btn_clicked={set_btn_clicked}
                btn_clicked={btn_clicked}
           
              />
            </div>
          ))}
      </section>

      <section className="mt-16">
        <Footer color={fixedColor} />
      </section>
    </div>
  );
};

export default Post_Page_Admin;
