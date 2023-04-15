import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import FullNavBar from "../components/navbar";
import SecondNav from "../components/secondnav";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import RequestCard from "../components/requestcard";

export default function SubRequests(props) {
  const [requests, setRequests] = useState({});
  const [subdata , setSubdata] = useState({})
  const fetchdata = async () => {
    const res = await fetch(`/${username}/data`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const temp = await res.json();

    setSubdata(temp)
    setRequests(temp.requests);
  };

  

  useEffect(() => {
    fetchdata();

  }, []);
  
  


  
  const { username } = useParams();
  

  

  const listitems = Object.keys(requests).map((key)=>{
    return(
      <RequestCard key = {key} request = {requests[key]} subdata = {subdata}></RequestCard>
    )
  })
 
 
  return (
    <>
     <FullNavBar />
      <SecondNav user={username} />
     {listitems}
    </>
  );
}
