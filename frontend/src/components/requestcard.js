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

  MDBBtn,

} from "mdb-react-ui-kit";



  


export default function RequestCard(props){

    const [userdata , setUserdata] = useState({})

    
    
      const rejectRequest = (user) => {
        fetch(`/${props.subdata._id}/delete`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ index: user._id })
        })
        .then(res => res.json())
        .then()
        .catch();
        window.location.reload();
      }
    
      const acceptRequest = (user) => {
        fetch(`/${props.subdata._id}/add`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Object: user })
        })
        .then(res => res.json())
        .then()
        .catch();
        window.location.reload();
      }

   

      const fetchUserdata = async () => {
        const res = await fetch(`/${props.request._id}/userdata`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const temp = await res.json();
       setUserdata(temp[0])
      };

      

      

      useEffect(() => {
        fetchUserdata();
    
      }, []);

      const validData = {
        "First Name" : userdata.firstName,
        "Last Name" : userdata.lastName,
        "Username" : userdata.userName,
        "Email" : userdata.email,
        "Age" : userdata.age,
        "Contact Number" : userdata.contactNumber,
    
    
      }
      const listitems = Object.keys(validData).map((key) => {
        return (
          <div key={key}>
            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>{key}</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                <MDBCardText className="text-muted">{validData[key]}</MDBCardText>
              </MDBCol>
            </MDBRow>
            <hr />
          </div>
        );
      });


    return(
        <>
        
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                {listitems}

                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn className="btn btn-success" onClick={()=>{
                    acceptRequest(props.request);
                  }}>{"Accept"}</MDBBtn>

                  <MDBBtn
                    style={{ marginLeft: "10px" }}
                    className="btn btn-danger"
                    onClick={()=>{
                      rejectRequest(props.request);
                    }}
                  >
                    {"Reject"}
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer></>
    )
}
