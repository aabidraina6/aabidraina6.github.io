import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import MyProfile from "./pages/profile";
import MyHome from "./pages/home";

//login page
const user = {
  name : "Abid",
  email : "a@b.c",
  bio : "this the bio"


}

function MyApp(){
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  console.log(isLoggedIn)
  return(<div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {isLoggedIn==true?(<MyHome/>):(<LoginPage/>)}></Route>
        <Route path="/profile" element={isLoggedIn==true?(<MyProfile user={user}/>):<LoginPage/>}></Route>
        <Route path ="login" element={<LoginPage/>}></Route>
      </Routes>
    </BrowserRouter>
    
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyApp />);