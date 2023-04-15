import React from "react"
import { Outlet , Navigate } from "react-router-dom"
import LoginPage from "../pages/login"


export default function ProtectedRoute(){
    const isAuth = localStorage.getItem("isLoggedIn") == "true"
    return isAuth ? <Outlet/> : <Navigate to="/login"/>;
}

