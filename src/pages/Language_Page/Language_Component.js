import React from "react";

const Language_Component = ({language}) => {
  return (
    <div className="w-full h-[47px] pt-4 gap-6 border-b custom-border">
        <p className="font-inter font-[400] text-[12px] leading-[14.52px] text-white px-4">{language}</p>
    </div>
  );
};

export default Language_Component;
