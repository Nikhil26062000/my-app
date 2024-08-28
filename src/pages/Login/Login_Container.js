import React from "react";
import Signup_Login_Header from "../../components/components/Common_Components/Signup_Login_Header";
import Login_Form from "./Login_Form";

const Login_Container = () => {
  return (
    <div className="absolute  w-full top-[158px]">
      <Signup_Login_Header heading="Log in" paragraph="Hello, welcome back!" />
      <Login_Form/>
    </div>
  );
};

export default Login_Container;
