import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import {ApproveButton,RejectButton,DeleteButton} from '../../components/ApproveButton.js'

import ShimmerMap from "../../components/Shimmer/ShimmerMap";
import { useNavigate } from "react-router-dom";
import { handle_approve_reject_post } from "../../services/ApiServices.js";
// import { fetch_like_data, post_like } from "../../services/ApiServices";

const PostLists_Admin = ({
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
  likeCount,
  btn_clicked,
  set_btn_clicked
}) => {
  const [isload, setIsLoad] = useState(false);
  const navigate = useNavigate();
  // const [totalLike,setTotalLike] = useState();
  // const [numberOfComments,setNumberOfComments] = useState();
  // console.log("Like:",likeCount);
  // console.log("PostID:",ele.pid);
  const [prev,setPrev] = useState({
    app:true,
    rej:true,
    del:true
  })

  const handleImageLoad = () => {
    setIsLoad(true);
  };

  // const handleComment = (id,ele) => {
  //   navigate(`/posts/${id}`);
  //   localStorage.setItem("attch_id",ele.attachment_id)
  //   localStorage.setItem("post_id",ele.pid)
  // };

  // const handleLike = async (ele) => {
  //   console.log("post id", ele.pid);
  //   const res = await post_like(ele);
  //   console.log(res.total_like[0]['totallike']);
  //   setTotalLike(res.total_like[0]['totallike'])
    
  // };

  // const fetchLikeData = async (ele) => {
  //   // console.log(ele);
  //   const res = await fetch_like_data(ele);
  //   console.log(res);
  // };

  // useEffect(() => {
  //   const filterLike = () => {
  //   let count =  likeCount.filter((e)=>e.post_id==ele.pid)
  //   // if(count[0] == 'undefined'){
  //   //   count[0] = "0 likes"
  //   // }
  //   console.log();
    
  //   setTotalLike(count.length > 0 && count[0]['total_like'])
  //   }
  //   filterLike()
  // }, []);



  // useEffect(()=>{
  //   const commentsFilter = () =>{
  //      const temp =  commentsCount?.filter((c)=>c.post_id==ele.pid)
  //     //  console.log(temp[0]['total_comments']);
  //      setNumberOfComments(temp.length > 0 && temp[0]['total_comments'] )
  //   }

  //   commentsFilter();
  // },[])



  const handle_approve_reject = async(ele,type) =>{
    // console.log(ele);
    const res = await handle_approve_reject_post(ele,type)
    console.log(res)
    set_btn_clicked(!btn_clicked)
  }
  return (
    <section className="w-full py-2">
      <section className="border-2 border-[#125B57] py-4 box-border pt-[12px] pr-[21px] pb-[0px] pl-[21px]">
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
              {occupation}
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
            {!isload && <ShimmerMap height={305} width="100" />}

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
         
        </section>
      </section>



      {(prev.app || prev.rej || prev.del) && (
  <section className="w-full py-1 border-2 text-[8px] border-[#125B57] text-[#125B57] border-t-0 border-b-2 border-l-2 border-r-2 flex items-center justify-center">
    <div className="w-[33%] flex justify-center items-center gap-2 border-2 border-[#125B57] border-t-0 border-b-0 border-l-0 border-r-2">
      {prev.app && <ApproveButton onClick={()=>handle_approve_reject(ele,"Y")} />}
    </div>

    <div className="w-[33%] flex justify-center items-center gap-2 border-2 border-[#125B57] border-t-0 border-b-0 border-l-0 border-r-2">
      {prev.rej && <RejectButton onClick={()=>handle_approve_reject(ele,"R")}/>}
    </div>

  
  </section>
)}

    </section>
  );
};

export default PostLists_Admin;
