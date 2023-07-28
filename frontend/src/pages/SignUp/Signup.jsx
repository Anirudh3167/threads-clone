import React, { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../SignUp/Signup.css'

function Signup() {
  const toBackend = async () => {
    const formdata = new FormData();
    formdata.append("email",email);
    formdata.append("password",pass);
    formdata.append("username",uname);
    formdata.append("firstname",fname);
    formdata.append("lastname",lname);
    formdata.append("dob",dob);
    formdata.append("bio",bio);
    formdata.append("profile",profilePic,profilePic.name);
    console.log(profilePic);
    // const data = {
    //   email : email,
    //   password : pass,
    //   username : uname,
    //   firstname : fname,
    //   lastname : lname,
    //   dob : dob,
    //   bio : bio,
    //   profile : profilePic 
    // }
    const res = await axios.post("http://localhost:8080/user",formdata,{"withCredentials":true});
    navigation("/profile");
  }
  const uploadImage = (event) => {
    event.preventDefault();
    imageInputRef.current.click();
  }
  const changeImage = (event) => {
    setProfilePic(event.target.files[0]);
  }
  const navigation = useNavigate();
  const imageInputRef = useRef(null);
  const [fname,setFname] = useState("");
  const [lname,setLname] = useState("");
  const [dob,setDob] = useState("");
  const [uname,setUname] = useState("");
  const [bio,setBio] = useState("A thread clone user");
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const [profilePic,setProfilePic] = useState("");
  const [intersets,setInterests] = useState([{"name":"Science","selected":false},{"name":"Technology","selected":false},
                                             {"name":"Games","selected":false},{"name":"Politics","selected":false},
                                             {"name":"News","selected":false},{"name":"Space","selected":false}]);
  const [follows,setFollows] = useState([{"name":"Master","selected":false},{"name":"Ultimatum","selected":false},
                                         {"name":"Cooper","selected":false},{"name":"Elon","selected":false}]);
  const [pageNumber,setPageNumber] = useState('1');
  const validateDetails = (pageno) => {
    if (pageno === '1') {
      if (email !== "" && pass !== "") {
        setPageNumber('2');
      } else {
        alert("Enter you email and password");
      }
    } else if (pageno === '2') {
      if (fname !== "" && lname !== "" && uname !== "" && dob !== "") {
        setPageNumber('3');
      } else {
        alert("Enter all the compulsory details");
      }
    } else if (pageno === '3') {
      const selectedInterestCount = intersets.filter((interest) => interest.selected).length;
      if (selectedInterestCount >= 3) {setPageNumber('4');}
      else {
        alert("You must select atleast three choices");
      }
    } else if (pageno === '4') {
      const selectedFollowsCount = follows.filter((follow) => follow.selected).length;
      console.log(selectedFollowsCount);
      if (selectedFollowsCount >= 3) {
        // navigation("/feed");
        toBackend();
      }
      else {
        alert("You must select atleast three choices");
      }
    }
  }
  const renderPages = () => {
    switch (pageNumber) {
        case '1':
            return (
                <div className="SignupBoxContainer">
                    <div className="SignupFirstDetails">
                        <input type='text' placeholder='Email' value={email} onInput={(e) => {setEmail(e.target.value);}} className="SignupInputBox" />
                        <input type="password" placeholder='Password' value={pass} onInput={(e) => {setPass(e.target.value);}} className="SignupInputBox" />
                        <div className="signinText">Already have account? Click here to <a href="/signin">Sign in</a></div>
                        <div className="SignupBtn" onClick={() => validateDetails('1')}> proceed </div>
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
            )
        case '2':
            return (
                <div className="SignupUserDetailsPage">
                    <div className="SignupUserBasicDetails">
                        <div className="SignupUserProfile">
                            <div className="SignUpProfileItemHead"> Profile Pic </div>
                            <input type="file" ref={imageInputRef} onChange={(e) => {changeImage(e)}} style={{display:"none"}} />
                            <div className="SignUpProfilePicContainer" onClick={(e) => {uploadImage(e)}}>
                              <div className="SignupProfilePicPrompt"> Upload </div>
                            {
                              (profilePic === "") ?
                                ""
                              :
                              <img src={URL.createObjectURL(profilePic)} className='SignUpProfilePicContainer' alt="" width="100%" height="100%" />
                            }
                            </div>
                        <div className="SignupNamesItem">
                            <div className="SignUpItemHead"> User Name </div>
                            <input type="text" className='SignUpItemInput' value={uname} onInput={(e) => {setUname(e.target.value);}} />
                        </div>
                        </div>
                        <div className="SignupNames">
                            <div className="SignupNamesItem">
                                <div className="SignUpItemHead"> First Name </div>
                                <input type="text" className='SignUpItemInput' value={fname} onInput={(e) => {setFname(e.target.value);}} />
                            </div>
                            <div className="SignupNamesItem">
                                <div className="SignUpItemHead"> Last Name </div>
                                <input type="text" className='SignUpItemInput' value={lname} onInput={(e) => {setLname(e.target.value);}} />
                            </div>
                            <div className="SignupNamesItem">
                                <div className="SignUpItemHead"> Date of Birth </div>
                                <input type="date" className='SignUpItemInput' value={dob} onInput={(e) => {setDob(e.target.value);}} />
                            </div>
                        </div>
                    </div>
                    <div className="SignupUserDisplayDetails">
                        
                        <div className="SignupBioItem">
                            <div className="SignUpItemHead"> Bio </div>
                            <textarea type="text" className='SignUpBioItemInput' value={bio} onInput={(e) => {setBio(e.target.value);}} />
                        </div>
                    </div>
                    <div className="SignupUserDetailsBtns">
                        <div className="SecondBackBtn" onClick={() => {setPageNumber("1");}}> Back </div>
                        <div className="secondProceedBtn" onClick={() => validateDetails("2")}> Proceed </div>
                    </div>
                </div>
            )
        
            case '3':
                return (
                  <div className="SignupUserInterestPage">
                    <div className="SignupMainHead"> Interests </div>
                    <div className="InterestOptions">
                      {intersets.map((interest, index) => (
                        <div className="interestedOptionWrapper" key={index}>
                          {interest.selected ? (
                            <div className="InterestOption" onClick={() => setSelectedInterest(interest.name)}>
                              {interest.name}
                            </div>
                          ) : (
                            <div className="InterestNotSlectedOption" onClick={() => setSelectedInterest(interest.name)}>
                              {interest.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="SignupUserDetailsBtns">
                      <div className="SecondBackBtn" onClick={() => setPageNumber("2")}> Back </div>
                      <div className="secondProceedBtn" onClick={() => validateDetails("3")}> Proceed </div>
                    </div>
                  </div>
                );
              
              case '4':
                return (
                  <div className="SignupUserFollowsPage">
                    <div className="SignupMainHead"> Follow </div>
                    <div className="FollowsOptions">
                      {follows.map((Follow, index) => (
                        <div className="FollowOptionWrapper" key={index}>
                          {Follow.selected ? (
                            <div className="FollowOption" onClick={() => setSelectedFollows(Follow.name)}>
                              {Follow.name}
                            </div>
                          ) : (
                            <div className="FollowNotSlectedOption" onClick={() => setSelectedFollows(Follow.name)}>
                              {Follow.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="SignupUserDetailsBtns">
                      <div className="SecondBackBtn" onClick={() => setPageNumber("3")}> Back </div>
                      <div className="secondProceedBtn" onClick={() => validateDetails("4")}> Proceed </div>
                    </div>
                  </div>
                );
              
        default:
            break;
    }
  }
  const setSelectedInterest = (interestName) => {
    setInterests((prevInterests) =>
      prevInterests.map((interest) =>
        interest.name === interestName ? {...interest, selected: !interest['selected']} : interest
      )
    );
  };
  const setSelectedFollows = (FollowerName) => {
    setFollows((prevInterests) =>
      prevInterests.map((interest) =>
        interest.name === FollowerName ? {...interest, selected: !interest['selected']} : interest
      )
    );
  };
  return (
    <div className='signUpMainContainer'>
        {renderPages()}
    </div>
  )
}

export default Signup