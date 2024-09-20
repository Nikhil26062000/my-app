import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/accountProvider";
import Top_Header from "../../components/components/Common_Components/Top_Header";
import Navbar from "./Navbar";
import PostLists from "./PostLists";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../../components/Footer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import PostPage from "../../components/Shimmer/PostPage";
import { api_url } from "../../constants";

const Posts = () => {
  const fixedColor = "#125B57";
  const navigate = useNavigate();
  const { setToken } = useContext(MyContext);
  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [postLike, setPostLike] = useState();
  const [commentsCount, setCommentsCount] = useState();
  // const [userRole,setUserRole] = useState()
  const [roleBase, setRoleBase] = useState();

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
        let uid = localStorage.getItem("userid");

        // Create the request body
        const requestBody = JSON.stringify({
          userid: uid,
        });

        const response = await fetch(
          `${api_url}/admin/acc/appdata/usersignaturelist`,
          {
            method: "POST", // Use POST method
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
            },
            body: requestBody, // Send the user ID in the request body
          }
        );

        // Check if the response status is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if the response content type is JSON
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          // console.log(response);
          const data = await response.json();
          console.log(data);

          setPostData(data.user_signature);
          setPostLike(data.post_like);
          setCommentsCount(data.comments);
          setLoading(true);
        } else {
          const text = await response.text();
          console.error("Unexpected content type:", contentType);
          console.error("Response body:", text);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPost();
  }, []);

  useEffect(() => {
    let role_id = localStorage.getItem("role");
    console.log("My role id is : ", role_id);
    const fetchRoleBase = async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/Rolebase.json`);
      const data = await res.json();
      console.log(data.rolebase);
      setRoleBase(data.rolebase);
      let temp = data?.rolebase?.filter((f) => f.role_id == role_id);
      if (temp.length == 0) {
        setIsAdmin(false);
      } else {
        console.log(temp);
        if (temp[0]["role_name"] == "f4f" || temp[0]["role_name"] == "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    fetchRoleBase();
  }, []);

  return (
    <div className="w-full box-border">
      <Top_Header title="Citizen scientist kit" />

      {isAdmin && (
        <div className="w-full px-[20px] pt-4 flex justify-end ">
          <button
            className="py-2  rounded-md bg-gray-100 px-2"
            onClick={() => navigate("/posts/admin/edit")}
          >
            <ManageAccountsIcon className="pr-1" />
            Manage Post
          </button>
        </div>
      )}

      <section className="w-full  box-border py-2 px-5">
        {!loading && (
          <>
            <div className="flex flex-col gap-5">
              <PostPage />
            </div>
          </>
        )}
        {postData &&
          postData.map((ele, index) => {
            return (
              <div key={ele.pid}>
                <PostLists
                  ele={ele}
                  isImage={ele.type == "img"}
                  isAudio={ele.type == "aud"}
                  isVideo={ele.type == "vid"}
                  url_link={ele.url_link}
                  name={ele.username ? ele.username : "Dummy User"}
                  occupation="environmental science tracher"
                  place="Mumbai "
                  day="Yesterday"
                  msg={ele.description && ele.description}
                  number_of_responses="3 Responses"
                  likeCount={postLike}
                  commentsCount={commentsCount}
                />
              </div>
            );
          })}

        {/* <section className="w-full flex justify-end py-5">
          <button className="ml-auto px-[15px] py-[13px] flex justify-center items-center bg-[#125B57] gap-[8px] text-white rounded-[9px]">
            <AddIcon />
            <p className="font-inter font-[600] text-[12px] leading-[14.52px] text-[#FFFFFF]">
              Upload
            </p>
          </button>
        </section> */}
      </section>

      <section className="mt-16">
        <Footer color={fixedColor} />
      </section>
    </div>
  );
};

export default Posts;
