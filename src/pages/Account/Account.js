


import React, { useState ,useContext, useEffect} from 'react'
import Top_Header from '../../components/components/Common_Components/Top_Header'
import Input_Field from './Input_Field';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';

const Account = () => {
  const fixedColor = '#125B57';
  const navigate = useNavigate();
  const {setToken} = useContext(MyContext)

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setToken(null);
        navigate('/');
      }
    };

    // Run on initial load
    checkToken();

    // Run when localStorage changes
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, [navigate, setToken]);

  return (
    <>
    <div className='w-[100%] box-border min-h-screen flex flex-col justify-between'>
      <div>
        <Top_Header title='Account'/>

        <section className="w-full box-border px-5 max-h-[448px] mt-[28px] flex flex-col gap-[18px]">
          <div className=" max-h-[88px] flex flex-col gap-[18px]">
            <p className="font-[600] text-[24px] leading-[26.4px] text-[#125B57]">
              User Profile    
            </p>
            <p className="font-inter font-[500] text-[20px] leading-[30px] tracking-[-2.3%] text-[#125B57]">
              Daniel Foster
            </p>
          </div>
          {/*-------------- Input fields for updating user details ----------------- */}
          <Input_Field html_for="Name" input_type="text"/>
          <Input_Field html_for="Mobile Number" input_type="number"/>
          <Input_Field html_for="Registered Address" input_type="text"/>
          <Input_Field html_for="e-mail Address" input_type="email"/>

          {/* button section for changing the Password */}
          <section className="mt-[100px]">
            {/* <CTA btn_name="Change Password" /> */}
          </section>
        </section>
      </div>

      {/* Footer */}
     
    </div>
    <section className="mt-10">
    <Footer color={fixedColor} /> 
    </section>
    </>
  )
}

export default Account
