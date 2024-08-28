import React,{useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';
import Top_Header from "../../components/components/Common_Components/Top_Header";
import Language_Component from "./Language_Component";
import Footer from "../../components/Footer";

const Language = () => {
  const fixedColor = '#125B57';
  const navigate = useNavigate()
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
    <div className=" w-[100%] box-border">
      <Top_Header title="Language" />
      <section className="box-border w-full px-5">
        <section className="w-full h-[94px] mt-[134px] rounded-[10px] bg-[#125B57]">
          <Language_Component language="English" />
          <Language_Component language="Marathi" />
        </section>
      </section>

      <section className="mt-10">
    <Footer color={fixedColor} /> 
    </section>
    </div>
  );
};

export default Language;
