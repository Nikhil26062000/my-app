import React from "react";
import "../../styles/PostPage.css";
import { Avatar } from "@mui/material";

const PostPage = () => {
  
    return (
        <section className="w-full py-2 animate-pulse">
          <section className="border-2 border-[#125B57] py-4 box-border pt-[12px] pr-[21px] pb-[0px] pl-[21px]">
            {/* Avatar and titles shimmer */}
            <div className="w-full flex justify-start gap-[26px]">
              {/* Avatar shimmer */}
              <Avatar className="!w-[59.9px] !h-[59.9px] !bg-gray-300" />
              
              <div className="w-full flex flex-col gap-2">
                {/* Name shimmer */}
                <div className="w-[70%] h-[14px] bg-gray-300 rounded"></div>
                {/* Occupation shimmer */}
                <div className="w-[50%] h-[12px] bg-gray-300 rounded"></div>
    
                <div className="flex justify-start items-center text-[8px] gap-2">
                  {/* Place shimmer */}
                  <div className="w-[30%] h-[10px] bg-gray-300 rounded"></div>
                  <div className="w-[4px] h-[4px] bg-gray-300 rounded-full"></div>
                  {/* Day shimmer */}
                  <div className="w-[20%] h-[10px] bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
    
            {/* Image shimmer */}
            <section className="py-5">
              <div className="w-full h-[300px] bg-gray-300 rounded"></div>
            </section>
    
            {/* Text and response shimmer */}
            <section className="flex flex-col gap-3 py-3">
              <div className="w-full h-[12px] bg-gray-300 rounded"></div>
              <div className="w-[30%] h-[12px] bg-gray-300 rounded"></div>
            </section>
          </section>
    
          {/* Buttons shimmer */}
          <section className="w-full py-1 border-2 text-[8px] border-[#125B57] text-[#125B57] border-t-0 border-b-2 border-l-2 border-r-2 flex items-center justify-center">
            <div className="w-[33%] flex justify-center items-center gap-2 border-2 border-[#125B57] border-t-0 border-b-0 border-l-0 border-r-2">
              <div className="w-[15px] h-[15px] bg-gray-300 rounded-full"></div>
              <div className="w-[30%] h-[10px] bg-gray-300 rounded"></div>
            </div>
            <div className="w-[33%] flex justify-center items-center gap-2 border-2 border-[#125B57] border-t-0 border-b-0 border-l-0 border-r-2">
              <div className="w-[15px] h-[15px] bg-gray-300 rounded-full"></div>
              <div className="w-[30%] h-[10px] bg-gray-300 rounded"></div>
            </div>
            <div className="w-[33%] flex justify-center items-center gap-2">
              <div className="w-[15px] h-[15px] bg-gray-300 rounded-full"></div>
              <div className="w-[30%] h-[10px] bg-gray-300 rounded"></div>
            </div>
          </section>
        </section>
      );

};

export default PostPage;
