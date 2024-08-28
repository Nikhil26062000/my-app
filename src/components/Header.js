import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'; 

const Header = ({ title, color }) => {
  const navigate = useNavigate(); 

  const handleCloseClick = () => {
    navigate(-1); 
  };

  return (
    <header
      className="w-full h-[100px] flex justify-center items-center relative"
      style={{
        backgroundColor: color || '#125B57', 
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomLeftRadius: '36px',
        borderBottomRightRadius: '36px',
        boxShadow: '0px 4px 4px 0px #00000040',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Ensure the header is on top of other content
        fontSize: '20px',
        fontFamily: 'Poppins, sans-serif', 
        fontWeight: '600',
      }}
    >
      <div className="absolute left-[18.95px] top-1/2 transform -translate-y-1/2">
        <CloseIcon
          className="text-[#FFFFFF] cursor-pointer"
          onClick={handleCloseClick} 
        />
      </div>
      <div className="flex justify-center items-center">
        <p className="font-poppins font-[600] text-[16px] leading-[24px] text-[#FFFFFF]">{title}</p>
      </div>
    </header>
  );
};

export default Header;
