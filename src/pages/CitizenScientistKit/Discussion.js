import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';
import Top_Header from '../../components/components/Common_Components/Top_Header'
import CloseIcon from '@mui/icons-material/Close';


import PostButton from './PostButton';
import AddPhoto from './AddPhoto';
import Footer from '../../components/Footer';

const Discussion = () => {
    const [focusedInput, setFocusedInput] = useState(null);
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
    <div className="w-[100%] box-border ">
        <Top_Header title="Citizen scientist kit"/>
        <section className="w-full box-border px-5 max-h-[586px] mt-[19px] flex flex-col gap-[55px] mx-auto">
            <section className="w-full max-h-[325px] flex flex-col gap-[45px]">
                <div className="w-full max-h-[22px] flex gap-[10px]">
                    <div className="w-full h-[22px] flex gap-[10px]">
                        {/* icon */}
                        <CloseIcon/>
                        {/* text */}
                        <p className="font-inter font-[400] text-[16px] leading-[24px] tracking-[-2.3%] text-[#125B57]">Start a new discussion</p>
                    </div>
                    <div>
                        {/* post link */}
                        <p className="font-inter font-[600] text-[16px] leading-[24px] tracking-[-2.3%] text-[#125B57]">Post</p>
                    </div>
                </div>

                <div className="w-full max-h-[258px] mx-auto flex flex-col gap-[13px]">
                    {/* inputs */}
                    <input
                        type="text"
                        required
                        
                        placeholder="Enter your topic to discuss"
                        onFocus={() => setFocusedInput("topic")}
                        onBlur={() => setFocusedInput(null)}
                        className={`w-full font-inter h-[47px] placeholder-[#125B57] py-0 px-2.5 border-2 rounded-[10px] ${
                        focusedInput === "topic" ? 'border-[#125B57]' : 'border-[#125B57]'
                        } bg-[#FAFAFA] box-border outline-none  text-[#125B57] font-[400] text-[16px] leading-[24px] tracking-[-2.3%]`}
                     />

                     {/* description input */}
                        <textarea
                            required
                            placeholder="Description"
                            onFocus={() => setFocusedInput("topic")}
                            onBlur={() => setFocusedInput(null)}
                            className={`w-full font-inter h-[138px] placeholder-[#125B57] py-[10px] px-2.5 border-2 rounded-[10px] ${
                                focusedInput === "topic" ? 'border-[#125B57]' : 'border-[#125B57]'
                            } bg-[#FAFAFA] box-border outline-none text-[#125B57] font-[400] text-[16px] leading-[24px] tracking-[-2.3%] resize-none`}
                        />

                    {/* Add a photo Button */}
                    <AddPhoto/>

                </div>
            </section>


            {/* Post button */}
            <section className=" w-full box-border px-5   py-2">
            <PostButton btn_name="POST"/>
            </section>
            
        </section>

        <section className="mt-16">
    <Footer color={fixedColor} /> 
    </section>
    </div>
  )
}

export default Discussion