import React, { useState, useContext, useEffect } from "react";
import CTA from "../../components/components/Common_Components/CTA";
import Toggle_login_signup from "../../components/components/Common_Components/Toggle_login_signup";
import Login_with_google from "../../components/Login_with_google";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { encrypt } from "../../HelperFunctions/calcMD5";
import axios from "axios";
import { MyContext } from "../../context/accountProvider";
import { api_url } from "../../constants";
import LoadingAnimation from "../../components/LoadingAnimation";
import { BarLoader } from "react-spinners";
import BarLoad from "../../components/BarLoad";

const Login_Form = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, setToken } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      console.log("Token updated:", token);
    }
  }, [token]);

  //Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    const hashedPassword = encrypt(password, 12);

    // // Check if credentials match dummy user
    // if (email === dummyUser.email && hashedPassword === dummyUser.hashedPassword) {
    //   console.log("Dummy User Login:");
    //   console.log("Email:", email);
    //   console.log("Password:", password);
    //   console.log("Hashed Password:", hashedPassword);

    //   // Simulating successful login for dummy user
    //   toast.success("Logged in as dummy user");
    //   localStorage.setItem("userID", dummyUser.userID);
    //   navigate("/home");
    //   return;
    // }

    // API call for real login
    try {
      const response = await axios.post(`${api_url}/admin/acc/login`, {
        email: email,
        password: hashedPassword,
      });
      console.log(response);
      if (response.data.isValid === true) {
        // toast.success("Login successful")
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userid", response.data.user_details.userid);
        localStorage.setItem("username", response.data.user_details.username);
        localStorage.setItem("role", response.data.user_details.role);

        setToken(response.data.jwt_token); // Update context
        navigate("/"); // Navigate to home after setting the tok
      } else {
        toast.warning(response.data.msgtext);
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      console.error("Login Error:", error);
    }
  };

  // Checking email for resetting the password
  const checkEmail = async () => {
    if (!email) {
      toast.warning("Email is required");
    } else if (!validateEmail(email)) {
      toast.warning("Invalid email");
    } else {
      try {
        const response = await axios.post(
          "https://farmersforforests.org/admin/acc/reset",
          { email }
        );
        if (response.data.isValid === true) {
          console.log("Password Reset Info:", response.data);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("hash", response.data.hash);
          localStorage.setItem("userid", response.data.userid);
          toast.success(response.data.email_text);
          navigate("/resetPassword");
        } else {
          toast.warning(response.data.msgText);
        }
      } catch (error) {
        toast.error("Failed to reset password, please try again");
        console.error("Reset Password Error:", error);
      }
    }
  };

  return (
    <>
      {loading && <BarLoad />}
      <div className="w-full mx-auto flex flex-col gap-[18px] pt-[26px]">
        <div className="w-full max-h-[96px] flex flex-col gap-[13px]">
          <div className="h-[29px]">
            <h3 className="font-inter font-[500] text-[24px] leading-[29.05px] text-center text-[#000000]">
              Log in
            </h3>
          </div>
          <div className="h-[54px]">
            <p className="font-inter font-[400] text-[18px] leading-[21.78px] text-center text-[#000000]">
              Hello, welcome back!
            </p>
          </div>
        </div>

        <section className="w-full">
          <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
            <div
              className={`w-full h-[56px] ${
                focusedInput === "Email"
                  ? "border-none"
                  : "border-2 border-black"
              } bg-white`}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput("Email")}
                onBlur={() => setFocusedInput(null)}
                className={`placeholder-[#125B57] w-full h-full font-inter font-[300] text-[18px] leading-[21.78px] p-[calc(16px-2px)] pr-[calc(23px-2px)] pl-[calc(23px-2px)] ${
                  focusedInput === "Email"
                    ? "border-2 border-black"
                    : "border-none"
                } bg-white`}
                style={{ boxSizing: "border-box" }}
              />
            </div>

            <div
              className={`w-full h-[56px] ${
                focusedInput === "password"
                  ? "border-none"
                  : "border-2 border-black"
              } bg-white`}
            >
              <input
                type="password"
                placeholder="Password"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                className={`placeholder-[#125B57] w-full h-full font-inter font-[300] text-[18px] leading-[21.78px] p-[calc(16px-2px)] pr-[calc(23px-2px)] pl-[calc(23px-2px)] ${
                  focusedInput === "password"
                    ? "border-2 border-black"
                    : "border-none"
                } bg-white`}
                style={{ boxSizing: "border-box" }}
              />
            </div>

            <CTA btn_name="Log in" />
          </form>
          <div className="my-3">
            <Login_with_google setLoading={setLoading} />
          </div>
        </section>

        <Toggle_login_signup
          notify="Don’t have an account?"
          redirect_To="Sign up"
          redirect_path="/signup"
        />
        <p
          className="w-full flex justify-center items-center"
          onClick={checkEmail}
        >
          <span className="cursor-pointer font-[400] font-inter leading-[21.78px] text-[14px] text-gray-400 underline">
            Reset Password
          </span>
        </p>
      </div>
    </>
  );
};

export default Login_Form;
