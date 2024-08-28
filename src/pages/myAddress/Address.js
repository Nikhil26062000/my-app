import React,{useContext, useEffect} from 'react'

import Address_Container from "./Address_Container";
import Top_Header from "../../components/components/Common_Components/Top_Header";
import Footer from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';

const Address = () => {
  const fixedColor = "#125B57";
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
    <div className=" w-[100%]  box-border">
      <Top_Header title="My address" />
      <div className="box-border px-5">
        <Address_Container />
      </div>
      <section className="mt-16">
        <Footer color={fixedColor} />
      </section>
    </div>
  );
};

export default Address;
