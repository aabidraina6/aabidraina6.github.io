import React from "react";
import {Link} from "react-router-dom"
import FullNavBar from "../components/navbar";

export default function MyHome(){
 return   (
    <>
    <div><FullNavBar/>  </div>
 <div>

    <h1>Home Page</h1>
    <Link to="/login">Go to Login page</Link>
    </div>
   
    </>
    )
}