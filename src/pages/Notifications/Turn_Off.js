import React,{useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';
import Top_Header from "../../components/components/Common_Components/Top_Header";

import CTA from "../../components/components/Common_Components/CTA";
import Footer from "../../components/Footer";



const Turn_Off = () => {
  const navigate = useNavigate()
  const {setToken} = useContext(MyContext)
  const fixedColor = '#125B57';

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
    <div className=" w-[100%] box-border">
      <Top_Header title="Notification" />
      <section className=" w-full mt-[134px] box-border px-10 flex justify-center">
        <CTA btn_name="Turn off Notification"/>
      </section>
      
      <section className="mt-10">
    <Footer color={fixedColor} /> 
    </section>
    </div>
  );
};

export default Turn_Off;
