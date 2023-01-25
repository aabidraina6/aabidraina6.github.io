import React from "react";
import {Link} from "react-router-dom"

export default function MyHome(){
 return   (
 <div>
    <h1>Home Page</h1>
    <Link to="/login">Go to Login page</Link>
    </div>)
}