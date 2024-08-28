import React,{useContext} from "react";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../../../context/accountProvider";
const Google_singup_CTA = ({ btn_name }) => {
  const navigate = useNavigate();
  const {setToken} = useContext(MyContext)
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token Response:", tokenResponse);

      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        console.log("User Info:", userInfo);
        const response = await axios.post(
          "https://farmersforforests.org/admin/acc/registration",
          {
            fullname: userInfo.data.name,
            email: userInfo.data.email,
            sub: userInfo.data.sub,
            email_verified: userInfo.data.email_verified,
          }
        );

        console.log(response);
        if(response.data.isValid==true){
          // toast.success(response.data.msgText)
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userid", response.data.user_details.userid);
          localStorage.setItem("username", response.data.user_details.username);

          setToken(response.data.jwt_token);  // Update context
        
          navigate("/")
        }else{
          toast.warning(response.data.msgtext)
        } 
        

        // navigate("/");
      } catch (error) {
        console.error("Error fetching user info:", error);
        toast.error(error.message)
      }
    },
    onError: (errorResponse) => {
      console.error("Signup Error:", errorResponse);
      toast.error(errorResponse)
    },
  });

  return (
    <button
      onClick={() => googleLogin()}
      className="font-inter w-[100%] h-[56px] bg-[#125B57] text-white font-[700] text-[16px] leading-[19.36px] text-center rounded-[40px]"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {btn_name}
    </button>
  );
};

export default Google_singup_CTA;
