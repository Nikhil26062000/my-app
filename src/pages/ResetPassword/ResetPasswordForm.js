import React, { useEffect, useState } from "react";
import CTA from "../../components/components/Common_Components/CTA";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { encrypt } from "../../HelperFunctions/calcMD5";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  // const validatePassword = (password) => {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  //   if (!passwordRegex.test(password)) {
  //     setPasswordError(
  //       "Password must be at least 8 characters, with uppercase, lowercase, number, and special character."
  //     );
  //     return false;
  //   }
  //   setPasswordError("");
  //   return true;
  // };

  const validatePassword = (password) => {
    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before submission
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 3 characters long."
      );
      setPasswordError("");
      return;
    }

    // Log the password and OTP to the console
    console.log("New Password:", password);
    console.log("OTP:", otp);
    const hashedPasswords = encrypt(password, 12);
    console.log("EncryptedPass", hashedPasswords);
    try {
      const email = localStorage.getItem("email");
      const hash = localStorage.getItem("hash");
      const userid = localStorage.getItem("userid");
      console.log("LS", email, hash, userid);
      const response = await axios.post(
        "https://farmersforforests.org/admin/acc/setpassword",
        {
          email: email,
          hash: hash,
          userid: userid,
          otp: otp,
          password: hashedPasswords,
        }
      );
      console.log(response);
      if (response.data.isValid == true) {
        toast.success(response.data.msgtext);
        navigate("/");
      } else {
        toast.error(response.data.msgtext);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    // Simulate sending data to the backend
    // For now, just log to the console
  };

  return (
    <div className="w-full flex flex-col gap-[18px]">
      <section className="w-full">
        <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
              className={`w-full font-inter h-[48px] p-[12px] mt-1 placeholder-[#125B57] border-2 ${
                focusedInput === "password"
                  ? "border-[#125B57]"
                  : "border-[#125B57]"
              } bg-[#FAFAFA] box-border outline-none text-[#125B57] font-[300] text-[16px] leading-[19.36px] tracking-[-2%]`}
            />
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#125B57] font-inter font-[300] text-[14px] leading-[19.36px]"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>

          <input
            type="text"
            required
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            onFocus={() => setFocusedInput("OTP")}
            onBlur={() => setFocusedInput(null)}
            className={`w-full font-inter h-[48px] p-[12px] mt-1 placeholder-[#125B57] border-2 ${
              focusedInput === "OTP" ? "border-[#125B57]" : "border-[#125B57]"
            } bg-[#FAFAFA] box-border outline-none text-[#125B57] font-[300] text-[16px] leading-[19.36px] tracking-[-2%]`}
          />

          <CTA btn_name="Set Password" />
        </form>
      </section>
    </div>
  );
};

export default ResetPasswordForm;
