import React,{useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';
import Top_Header from "../../components/components/Common_Components/Top_Header";
import Navbar from "./Navbar";
import PostLists from "./PostLists";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../../components/Footer";

const Posts = () => {
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
    <div className="w-full box-border">
      <Top_Header title="Citizen scientist kit" />
      <section className="w-full mt-[14px] flex justify-center">
        <Navbar isForum={true}/>
      </section>

      <section className="w-full  box-border py-2 px-5">
        <section>
          <PostLists
            isImage={true}
            name="Rajesh Shetty"
            occupation="environmental science tracher"
            place="Mumbai "
            day="Yesterday"
            msg="I found this in Mandala garden."
            number_of_responses="3 Responses"
          />
          <PostLists
            isImage={false}
            name="Richard"
            Occupation="Engineer"
            place="USA"
            day="2 days ago"
            msg="Hi all, wanted to check which is the best region to visit in June,"
            number_of_responses="6 Responses"
          />
        </section>

        <section className="w-full flex justify-end py-5">
          <button className="ml-auto px-[15px] py-[13px] flex justify-center items-center bg-[#125B57] gap-[8px] text-white rounded-[9px]">
            <AddIcon />
            <p className="font-inter font-[600] text-[12px] leading-[14.52px] text-[#FFFFFF]">
              Upload
            </p>
          </button>
        </section>
      </section>

      <section className="mt-16">
    <Footer color={fixedColor} /> 
    </section>
    </div>
  );
};

export default Posts;
