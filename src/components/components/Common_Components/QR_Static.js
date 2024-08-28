import React from "react";


const QR_Static = () => {
  return (
    <div className="w-[100%] h-[30vh] flex justify-center mt-[50px]">
      <img
       src={`${process.env.PUBLIC_URL}/qrImage.jpeg`} //src={`${process.env.PUBLIC_URL}/qrImage.jpeg`}
        className="w-[200px] h-[200px]"
      />
    </div>
  );
};

export default QR_Static;
