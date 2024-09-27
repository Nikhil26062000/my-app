import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

import ShimmerMap from "../../components/Shimmer/ShimmerMap";
import { useNavigate } from "react-router-dom";
import { fetch_like_data, post_like } from "../../services/ApiServices";

const PostLists = ({
  commentsCount,
  ele,
  isImage,
  name,
  occupation,
  place,
  day,
  msg,
  number_of_responses,
  url_link,
  isAudio,
  isVideo,
  likeCount
}) => {
  const [isload, setIsLoad] = useState(false);
  const navigate = useNavigate();
  const [totalLike,setTotalLike] = useState();
  const [numberOfComments,setNumberOfComments] = useState();
  // console.log("Like:",likeCount);
  // console.log("PostID:",ele.pid);

  const handleImageLoad = () => {
    setIsLoad(true);
  };

  const handleComment = (id,ele) => {
    navigate(`/posts/${id}`);
    localStorage.setItem("attch_id",ele.attachment_id)
    localStorage.setItem("post_id",ele.pid)
  };

  const handleLike = async (ele) => {
    console.log("post id", ele.pid);
    const res = await post_like(ele);
    console.log(res.total_like[0]['totallike']);
    setTotalLike(res.total_like[0]['totallike'])
    
  };

  const fetchLikeData = async (ele) => {
    // console.log(ele);
    const res = await fetch_like_data(ele);
    console.log(res);
  };

  useEffect(() => {
    const filterLike = () => {
    let count =  likeCount.filter((e)=>e.post_id==ele.pid)
    // if(count[0] == 'undefined'){
    //   count[0] = "0 likes"
    // }
    console.log();
    
    setTotalLike(count.length > 0 && count[0]['total_like'])
    }
    filterLike()

    // console.log(ele);
  }, []);



  useEffect(()=>{
    const commentsFilter = () =>{
       const temp =  commentsCount?.filter((c)=>c.post_id==ele.pid)
      //  console.log(temp[0]['total_comments']);
       setNumberOfComments(temp.length > 0 && temp[0]['total_comments'] )
    }

    commentsFilter();
  },[])
  return (
    <section className="w-full py-2 main_div my-4">
      <section className="  py-4 box-border pt-[12px] pr-[21px] pb-[0px] pl-[21px]">
        <div className="w-full  flex justify-start gap-[26px]">
          <Avatar
            src="/broken-image.jpg"
            className="!w-[59.9px] !h-[59.9px] !bg-[#125B57] text-white"
          />
          <div className="w-full flex flex-col gap-1 ">
            <p className="text-[12px] text-[#125B57] pt-2 font-inter font-[700] leading-[14.52px]">
              {name}
            </p>
            <p className="font-inter font-[400] text-[10px] leading-[12.1px] text-[#125B57] ">
              {ele.insert_ds}
            </p>

            <div className="flex justify-start items-center text-[8px] text-[#125B57]">
              <p className="font-inter font-[400] text-[8px] leading-[9.68px] pr-5">
                {place}
              </p>
              <div className="w-[4px] h-[4px] bg-[#BFBFBF] rounded-full"></div>
              <p className=" font-inter font-[400] text-[8px] leading-[9.68px] pl-2">
                {day}
              </p>
            </div>
          </div>
        </div>

        {isImage && (
          <section className="py-5">
            {/* {!isload && <ShimmerMap height={305} width="100" />} */}

            <img
              src={url_link}
              className="rounded-[10px] w-full h-[300px] object-cover"
              onLoad={handleImageLoad}
            />
          </section>
        )}

        {isAudio && (
          <section className="py-5">
            <audio src={url_link} controls className="w-full mt-4" />
          </section>
        )}

        {isVideo && (
          <video
            src={url_link}
            controls
            className="rounded-lg my-2"
            style={{ width: "100%", height: "305px", objectFit: "cover" }}
          />
        )}

        <section className="flex flex-col gap-3 py-3 cursor-pointer">
          <p className="font-inter font-[600] text-[14px]  leading-[9.68px]">
            {msg} 
          </p>
          <div className="flex justify-between py-2">
            <p
              className="font-inter font-[400] text-[12px] leading-[9.68px]"
              onClick={() => fetchLikeData(ele)}
            >
              {totalLike ? totalLike : 0} Likes
            </p>

            <p
              className="font-inter font-[400] text-[12px] leading-[9.68px]"
              onClick={() => handleComment(ele.pid,ele)}
            >
              {numberOfComments ? numberOfComments : 0} comments
            </p>
          </div>
        </section>
      </section>

      <section className="w-full py-1  text-[8px] cursor-pointer flex items-center justify-center">
        <div className="w-[33%] flex justify-center items-center gap-2" onClick={() => handleLike(ele)}>
          <ThumbUpIcon
            className="text-[15px] text-[#125B57]"
            
          />
          <p className="font-inter font-[400] text-[8px] leading-[9.86px] ">
            Like
          </p>
        </div>

        <div className="w-[33%] flex justify-center items-center gap-2 "   onClick={() => handleComment(ele.pid,ele)}>
          <CommentIcon
            className="text-[15px] text-[#125B57]"
          
          />
          <p className="font-inter font-[400] text-[8px] leading-[9.86px]">
            Comment
          </p>
        </div>

        <div className="w-[33%] flex justify-center items-center gap-2" onClick={()=>alert("This feature is yet to come")}>
          <ShareIcon className="text-[15px] text-[#125B57]" />
          <p className="font-inter font-[400] text-[8px] leading-[9.86px]">
            Share
          </p>
        </div>
      </section>
    </section>
  );
};

export default PostLists;
