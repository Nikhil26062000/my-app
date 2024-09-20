import React,{useContext} from "react";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../context/accountProvider";
import { api_url } from "../constants";

const Login_with_google = ({ btn_name }) => {
  const navigate = useNavigate();
  const {setToken} = useContext(MyContext);
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
          `${api_url}/admin/acc/login`,
          {
            email: userInfo.data.email,
            email_verified: userInfo.data.email_verified,
            sub: userInfo.data.sub,
            fullname : userInfo.data.name
            
          }
        );
        console.log(response);
            if(response.data.isValid===false){
              // console.log("Email is registered");
              // toast.error(response.data.msgtext)
              // console.log("Email is registered2");

              
            }else{
              // toast.success("Login Successful")
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userid", response.data.user_details.userid);
              localStorage.setItem("username", response.data.user_details.username);
    
              setToken(response.data.jwt_token);  // Update context
              navigate("/");  // Navigate to home after setting the tok
           
            }
            
       
      } catch (error) {
        console.error("Error fetching user info:", error.message);
        toast.error("Login failed")
      }
    },
    onError: (errorResponse) => {
      console.error("Login Error:", errorResponse);
      toast.error("Internal Server Error")
    },
  });

  return (
    <button
      onClick={() => googleLogin()}
      className="font-inter w-[100%] h-[56px] bg-[#125B57] text-white font-[700] text-[16px] leading-[19.36px] text-center rounded-[40px]"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      Login with Google
    </button>
  );
};

export default Login_with_google;
