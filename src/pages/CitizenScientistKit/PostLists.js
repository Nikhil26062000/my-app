import { Avatar } from "@mui/material";
import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

import ShimmerMap from "../../components/Shimmer/ShimmerMap";
import { useNavigate } from "react-router-dom";


const PostLists = ({ele,isImage,name,occupation,place,day,msg,number_of_responses,url_link}) => {
 

  const [isload,setIsLoad] = useState(false)
  const navigate = useNavigate()
  console.log(ele.pid);

  const handleImageLoad = () =>{
    setIsLoad(true)
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
              <p className="font-inter font-[400] text-[8px] leading-[9.68px] pr-5">{place}</p>
              <div className="w-[4px] h-[4px] bg-[#BFBFBF] rounded-full"></div>
              <p className=" font-inter font-[400] text-[8px] leading-[9.68px] pl-2">{day}</p>
            </div>
          </div>
        </div>
        

       {
        isImage && <section className="py-5">
         { !isload &&  <ShimmerMap height={305} width="100" />}

         
          <img
            src={url_link}
            className="rounded-[10px] w-full h-[300px] object-cover"
            onLoad={handleImageLoad}
          /> 
          
         
        </section>
       }

        <section className="flex flex-col gap-3 py-3">
          <p className="font-inter font-[400] text-[8px] leading-[9.68px]">{msg}</p>
          <p className="font-inter font-[400] text-[8px] leading-[9.68px]" >{number_of_responses}</p>
        </section>
      </section>

      <section className="w-full py-1 border-2 text-[8px] border-[#125B57] cursor-pointer text-[#125B57] border-t-0 border-b-2 border-l-2 border-r-2  flex items-center justify-center">
        <div className="w-[33%] flex justify-center items-center gap-2 border-2 border-[#125B57] border-t-0 border-b-0 border-l-0 border-r-2">
          <ThumbUpIcon className="text-[15px] text-[#125B57]" />
          <p className="font-inter font-[400] text-[8px] leading-[9.86px] ">Like</p>
        </div>

        <div className="w-[33%] flex justify-center items-center gap-2 border-2 border-[#125B57] border-t-0 border-b-0 border-l-0 border-r-2">
          <CommentIcon className="text-[15px] text-[#125B57]" onClick={()=>navigate(`/posts/${ele.pid}/comments`)}/>
          <p className="font-inter font-[400] text-[8px] leading-[9.86px]">Comment</p>
        </div>

        <div className="w-[33%] flex justify-center items-center gap-2">
          <ShareIcon className="text-[15px] text-[#125B57]"/>
          <p className="font-inter font-[400] text-[8px] leading-[9.86px]" >Share</p>
        </div>
      </section>


     

    </section>
  );
};

export default PostLists;
















