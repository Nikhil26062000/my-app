import React,{useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';
import Top_Header from "../../components/components/Common_Components/Top_Header";
import Navbar from "./Navbar";
import UserList from "./UserList";
import Footer from "../../components/Footer";

const CitizenScientistKit = () => {
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
    <div className="w-[100%]">
      <Top_Header title="Citizen scientist kit" />
      <section className="w-full  box-border px-5 h-[326px] flex flex-col gap-[31px] mt-[14px] ">
        <section className="w-full  flex justify-center">
          <Navbar isForum={false}/>
        </section>
        <section className="w-full h-[269.7px] flex flex-col gap-[18px] ">
          <UserList name="Admin 1" message="hello" />
          <UserList name="Rajesh Shetty" message="Mandala garden is the best for this season."/>
          <UserList name="Admin 2" message="Let us know if you have any more queries?"/>
         
        </section>
      </section>

      <section className="mt-10">
    <Footer color={fixedColor} /> 
    </section>
    </div>
  );
};

export default CitizenScientistKit;
