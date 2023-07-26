import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../signin/Signin.css'
import '../SignUp/Signup.css'

function Signin() {
  const navigation = useNavigate();
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const handleSignin = () => {
    if (email !== "" && pass !== "") {
        navigation("/feed");
    } else {
        alert("Enter your email and password correctly");
    }
  }
  return (
    <div className='signUpMainContainer'>
        <div className="SignupBoxContainer">
            <div className="SignupFirstDetails">
                <input type='text' placeholder='Email' value={email} onInput={(e) => {setEmail(e.target.value);}} className="SignupInputBox" />
                <input type="text" placeholder='Password' value={pass} onInput={(e) => {setPass(e.target.value);}} className="SignupInputBox" />
                <div className="signinText">New account? Click here to <a href="/signup">Sign up</a></div>
                <div className="SignupBtn" onClick={() => handleSignin()}> proceed </div>
            </div>
            <div className="SignupMiddleText"> or Continue with </div>
            <div className="signupOauth">
                <div className="OauthIcon"> G </div>
                <div className="OauthIcon"> I </div>
                <div className="OauthIcon"> F </div>
            </div>
            <div className="termsAndConditions">
                Read the <a href="#"> terms and conditions </a>
            </div>
        </div>
    </div>
  )
}

export default Signin