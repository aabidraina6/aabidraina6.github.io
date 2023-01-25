import React, { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName , setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email , setEmail] = useState("")
  const [age , setAge] = useState()
  const [contactNumber , setContactNumber] = useState("")

  const [isLogin, setIsLogin] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: currently hardcoded..
    if (isLogin) {
      if (userName == "admin" && password == "admin") {
        if(localStorage.getItem("isLoggedIn")!= "true")
        localStorage.setItem("isLoggedIn", "true");
        
        console.log("local set  ")

        // navigate("/profile"); // FIX
      } else {
        alert("wrong credentials"); 
        localStorage.setItem("isLoggedIn","false");
      }
      if (localStorage.getItem("isLoggedIn") == "true") {
        navigate("/profile");
      }
    }
    else{
      alert("hi")
    }
  };
  let style = {
    boxShadow: " 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
    // margin: "100px 500px",
    minWidth : "500px",
    maxWidth : "500px",
    marginTop : "50px",
    padding: "50px 50px",
    
  };

  const handleToggle = (e) => {
      setIsLogin(!isLogin)
  }

  return (
    <>
    <center style={{height : "100px" , backgroundColor : '#A2D2FF'}}>
      <div className=" " style={{margin : "auto", width: "50%",padding: '20px'}}>
      <h1 style={{color : "#0d1b2a"}}>Greddit</h1>
      </div>
    </center>
    <center>
    <div className="field box " style={style} >

        <form onSubmit={handleSubmit}>

     {!isLogin  ? <label className="label">
            First Name
            <br />
            <input
              className="input"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <br />
          </label>:<div></div>}

          {!isLogin?<label className="label">
            Last Name
            <br />
            <input
              className="input"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <br />
          </label>:<div></div>}

          <label className="label">
            Username
            <br />
            <input
              className="input"
              placeholder="Username"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            
       
            <br />
          </label>

         { !isLogin?<label className="label">
            Email
            <br />
            <input
              className="input"
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
          </label>:<div></div>}
              
          {!isLogin?<label className="label">
            Age
            <br />
            <input
              className="input"
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
            <br />
          </label>:<div></div>}

         {!isLogin? <label className="label">
            Contact Number
            <br />
            <input
              className="input"
              placeholder="Contact Number"
              type="text"
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
              }}
            />
            <br />
          </label>:<div></div>}

          <label className="label">
            Password:
            <br />
            <input
              className="input"
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <br />
          <div className="has-text-centered">
            <button
              className="button is-link"
              type="submit"
              onClick={handleSubmit}
            >
              {isLogin?"Login":"Signup"}
            </button>
          </div>
        </form>
    </div>
    </center>
           <div className="has-text-centered">
            <p>{isLogin?"Don't have an account":"Already have an account"}</p>
           <button onClick={handleToggle} className="button is-ghost">{isLogin?"Signup":"Login"}</button>
          </div></>
  );
}
