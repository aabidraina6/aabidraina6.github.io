import React , {useState}from "react";
import FullNavBar from "../components/navbar";
import Post from "../components/postcard";



export default function SavedPosts(props){

    const [userdata, setUserdata] = useState({});
    const [saved , setSaved] = useState([])
    const FetchUserdata = async () => {
      const res = await fetch("/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }); 
      const temp = await res.json();
      setSaved(temp.savedposts)
      setUserdata(temp);
    };
    
    // const FetchSaved = async () =>{
    //     const res = await fetch("/profile", {
    //         method: "GET",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //       }); 
    //       const temp = await res.json();
    //       setUserdata(temp);
    // } //todo :remove

   return ( <>
    <FullNavBar/>
    adfj;
    </>)
}