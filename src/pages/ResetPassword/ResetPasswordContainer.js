import React from "react";
import Signup_Login_Header from "../../components/components/Common_Components/Signup_Login_Header";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordContainer = () => {
  return (
    <div className="absolute w-full px-5 top-[158px]">
      <Signup_Login_Header heading="Reset Password" paragraph="Enter your new password below." />
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordContainer;
