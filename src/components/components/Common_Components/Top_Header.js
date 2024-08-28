// import React from "react";
// import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom'; 

// const Top_Header = ({ title }) => {
//   const navigate = useNavigate(); 

//   const handleCloseClick = () => {
//     navigate(-1); 
//   };

//   return (
//     <div
//       className="w-[full] h-[106px] bg-[#125B57] flex justify-center items-center relative top-0"
//       style={{
//         borderTopLeftRadius: '0px',
//         borderTopRightRadius: '0px',
//         borderBottomLeftRadius: '36px',
//         borderBottomRightRadius: '36px',
//         boxShadow: '0px 4px 4px 0px #00000040'
//       }}
//     >
//       <div className="absolute left-[18.95px] ">
//         <CloseIcon
//           className="text-[#FFFFFF] cursor-pointer"
//           onClick={handleCloseClick} 
//         />
//       </div>
//       <div className="">
//         <p className="font-inter font-[500] text-[16px] leading-[19.36px] text-[#FFFFFF]">{title}</p>
//       </div>
//     </div>
//   );
// };

// export default Top_Header;


import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'; 

const Top_Header = ({ title }) => {
  const navigate = useNavigate(); 

  const handleCloseClick = () => {
    navigate(-1); 
  };

  return (
    <div
      className="w-full h-[106px] bg-[#125B57] flex justify-center items-center relative sticky top-0 z-10"
      style={{
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomLeftRadius: '36px',
        borderBottomRightRadius: '36px',
        boxShadow: '0px 4px 4px 0px #00000040'
      }}
    >
      <div className="absolute left-[18.95px]">
        <CloseIcon
          className="text-[#FFFFFF] cursor-pointer"
          onClick={handleCloseClick} 
        />
      </div>
      <div>
        <p className="font-inter font-[500] text-[16px] leading-[19.36px] text-[#FFFFFF]">{title}</p>
      </div>
    </div>
  );
};

export default Top_Header;
