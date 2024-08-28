import React from "react";

const CTA = ({ btn_name, clrChange }) => {
  return (
    <button
      className={`font-inter w-[100%] h-[56px] ${
        clrChange ? 'bg-[#F4910F]' : 'bg-[#125B57]'
      } text-white font-[700] text-[16px] leading-[19.36px] text-center rounded-[40px]`}
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {btn_name}
    </button>
  );
};

export default CTA;
