import React from 'react';
import CTA from '../../components/components/Common_Components/CTA';
import Toggle_login_signup from '../../components/components/Common_Components/Toggle_login_signup';
import { useNavigate } from 'react-router-dom';
import InstallPWAComponent from '../../components/InstallPWAComponent ';

const Landing = () => {
    const navigate = useNavigate()
  return (
    <div className="w-full h-screen flex flex-col justify-between  ">
    <InstallPWAComponent/> 
      {/* 1st section */}
      <section className="w-full px-[20px] flex gap-[4%] items-start h-[200px] pt-[100px]">
        {/* 2 images */}
        <div className="w-[48%] h-full box-border object-cover ">
          <img
            src={`${process.env.PUBLIC_URL}/image 81.png`}
            className="w-full h-[40px] object-fit"
          />
        </div>
        <div className="w-[48%] h-full box-border object-cover  ">
          <img
            src={`${process.env.PUBLIC_URL}/acc.png`}
            className="w-full h-[40px] object-fit"
          />
        </div>
      </section>

      {/* 2nd section title */}
      <section className="w-full px-[20px] flex flex-col justify-center items-center h-[200px]">
        <p className="text-center text-[40px] leading-[60.64px] font-[700] text-[#125B57]">Biodiversity</p>
        <p className="text-center text-[40px] leading-[60.64px] font-[700] text-[#125B57]">Hub</p>
      </section>

      {/* 3rd section Footer */}
      <section className="relative w-full h-[300px] flex flex-col justify-end">
  {/* Background image */}
  <img
    src={`${process.env.PUBLIC_URL}/landingFoot.png`}
    alt="footerImage"
    className="absolute inset-0 w-full h-full object-fit"
  />
  
  {/* Footer content */}
  <div className="absolute bottom-0 left-0 w-full px-[20px] pb-[20px] flex flex-col gap-[50px] text-white">
    <div onClick={() => navigate("/login")}>
      <CTA btn_name="Log in" clrChange={true}/>
    </div>
    
    <Toggle_login_signup
      notify="Don’t have an account ?"
      redirect_To="Sign up"
      redirect_path="/signup"
    />
  </div>
</section>

    </div>
  );
};

export default Landing;
