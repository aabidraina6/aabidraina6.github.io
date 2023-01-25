import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if(loggedIn){
        setLoggedIn(true)
    }
  },[]);

  useEffect(() => {
    if(!isLoggedIn){
        navigate("/login")
    }
  },[isLoggedIn,navigate])

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: currently hardcoded..

    if (userName == "admin" && password == "admin") {
      localStorage.setItem("isLoggedIn", true);
      navigate("/profile");
    } else {
      alert("wrong credentials");
      localStorage.setItem("isLoggedIn",false)
    }
    const temp = localStorage.getItem("isLoggedIn")
    console.log(temp)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <br />
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
          <br />
        </label>
        <label>
          Password:
          <br />
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
