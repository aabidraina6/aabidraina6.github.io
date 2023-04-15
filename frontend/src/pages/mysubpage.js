import React from "react";
import {  useParams } from "react-router-dom";
import FullNavBar from "../components/navbar";
import SecondNav from "../components/secondnav";


export default function MySubPage(props){
    const {username} = useParams()
    return(
        <>
        <FullNavBar/>
        <SecondNav user = {username}/> 
        <h1>this is the desired pafge {username}</h1></>
    )
}