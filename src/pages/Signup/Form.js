





import React, { useState } from 'react';
import CTA from '../../components/components/Common_Components/CTA';
import Toggle_login_signup from '../../components/components/Common_Components/Toggle_login_signup';
import Google_singup_CTA from '../../components/components/Common_Components/Google_singup_CTA';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { encrypt } from '../../HelperFunctions/calcMD5';
import { useNavigate } from 'react-router-dom';

const Form = () => {

    const [focusedInput, setFocusedInput] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // const validatePassword = (password) => {
    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     return passwordRegex.test(password);
    // };

    const validatePassword = (password) => {
        return password.length >= 3;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!fullName || fullName.length < 3) {
            toast.error("Full Name must be at least 3 characters long");
        } else if (!email) {
            toast.error("Email is required");
        } else if (!validateEmail(email)) {
            toast.error("Invalid Email address");
        } else if (!password) {
            toast.error("Password is required");
        } else if (!validatePassword(password)) {
            toast.error("Password must be at least 3 characters long");
        } else {
            try {
                const hashedPassword = encrypt(password, 12);
                const response = await axios.post('https://farmersforforests.org/admin/acc/registration', {
                    fullname: fullName,
                    email: email,
                    password: hashedPassword,
                });
                console.log(response);
                if (response.data.isValid == true) {
                    navigate("/login");
                } else {
                    toast.warning(response.data.msgtext);
                    setFullName("");
                    setEmail("");
                    setPassword("");

                }
            } catch (error) {
                toast.error("An error occurred while creating the account");
                console.error(error);
            }
        }
    };

    return (
        <div className="w-[100%] mx-auto flex flex-col gap-[18px]">
            <section className="w-full">
                <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
                    <div
                        className={`w-full h-[56px] ${
                            focusedInput === "Full Name"
                                ? "border-none"
                                : "border-2 border-black"
                        } bg-white`}
                    >
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onFocus={() => setFocusedInput("Full Name")}
                            onBlur={() => setFocusedInput(null)}
                            className={`placeholder-[#125B57] w-full h-full font-inter font-[300] text-[18px] leading-[21.78] p-[calc(16px-2px)] pr-[calc(23px-2px)] pl-[calc(23px-2px)] ${
                                focusedInput === "Full Name"
                                    ? "border-2 border-black"
                                    : "border-none"
                            } bg-white`}
                            style={{ boxSizing: "border-box" }}
                        />
                    </div>

                    <div
                        className={`w-full h-[56px] ${
                            focusedInput === "email"
                                ? "border-none"
                                : "border-2 border-black"
                        } bg-white`}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedInput("email")}
                            onBlur={() => setFocusedInput(null)}
                            className={`placeholder-[#125B57] w-full h-full font-inter font-[300] text-[18px] leading-[21.78] p-[calc(16px-2px)] pr-[calc(23px-2px)] pl-[calc(23px-2px)] ${
                                focusedInput === "email"
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
                        } bg-white relative`}
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedInput("password")}
                            onBlur={() => setFocusedInput(null)}
                            className={`placeholder-[#125B57] w-full h-full font-inter font-[300] text-[18px] leading-[21.78] p-[calc(16px-2px)] pr-[calc(23px-2px)] pl-[calc(23px-2px)] ${
                                focusedInput === "password"
                                    ? "border-2 border-black"
                                    : "border-none"
                            } bg-white`}
                            style={{ boxSizing: "border-box" }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </button>
                    </div>

                    <CTA btn_name="Create account" />
                </form>
                {/* <div className="my-3">
                    <Google_singup_CTA btn_name="Continue with Google" />
                </div> */}
            </section>

            <Toggle_login_signup
                notify="Already have an account?"
                redirect_To=" Log in"
                redirect_path="/login"
            />
        </div>
    );
};

export default Form;
