import React from "react";
import Avatar from "@mui/material/Avatar";

const UserList = ({ name, message }) => {
  return (
    <>
      <div className="w-full h-[59.9px] flex mt-2 gap-[13px]">
        <div className="w-full  flex justify-start gap-[26px]">
          <Avatar
            src="/broken-image.jpg"
            className="!w-[59.9px] !h-[59.9px] !bg-[#125B57] text-white"
          />
          <div className="w-full flex flex-col gap-[12px] ">
            <p className="text-[12px] text-[#125B57] pt-2 font-inter font-[700] leading-[14.52px]">
              {name}
            </p>
            <p className="font-[400] text-[10px] leading-[12.1px] text-[#125B57] ">
              {message}
            </p>
          </div>
        </div>

        <div className=" flex justify-between items-center ">
          <p className="text-[5px] font-inter font-[400] leading-[6.05px] text-black">2.03pm</p>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <div className="w-[80%] border-[.5px] border-[#125B57] opacity-55"></div>
      </div>
    </>
  );
};

export default UserList;
