import React from 'react';

const MenuList = ({ title, isTopBorder, Icon, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div
        className={`w-full h-[57px] border-0 border-b border-b-white p-[16px] flex justify-start items-center gap-[24px] bg-[#125B57] ${
          isTopBorder ? 'rounded-t-lg' : '' 
        }`}
      >
        <span className='text-white'>
          {Icon && <Icon className='w-[17.5px] h-[25px]' />}
        </span>
        <p className='font-inter font-[400] text-[12px] leading-[14.52px] text-white'>{title}</p>
      </div>
    </div>
  );
};

export default MenuList;
