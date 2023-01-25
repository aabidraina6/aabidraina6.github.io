import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
import MyVerticallyCenteredModal from "../components/verticalmodal";
import Button from 'react-bootstrap/Button';

export default function MyProfile({ user , followers , following} ) {


  
  const listItems = Object.keys(user).map((key) => (
    <div>
      <MDBRow>
        <MDBCol sm="3">
          <MDBCardText>{key}</MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
          <MDBCardText className="text-muted">{user[key]}</MDBCardText>
        </MDBCol>
      </MDBRow>
      <hr />
    </div>
  ));
  let followingCount = following.length
  let followerCount = followers.length
  const [modalShow, setModalShow] = React.useState(false);
  const [showFollowers , setShowFollowers] = React.useState();
  return (
    <>
      <section className="box"  style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5" style={{height:"890px"}}>
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <a href="/">Home</a>
                </MDBBreadcrumbItem>

                <MDBBreadcrumbItem active>Profile</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://i.pinimg.com/474x/d0/6c/98/d06c98438ef148f378958b16a23550b5.jpg"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <p className=" mb-4"><strong>{user["First Name"] + " " + user["Last Name"]}</strong></p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline  onClick={() => {setModalShow(true);setShowFollowers(false)}}><strong className="h5">{followingCount}</strong><br></br>{ "Following"}</MDBBtn>
                    <MDBBtn outline className="ms-1"  onClick={() => {setModalShow(true);setShowFollowers(true)}}>
                    <strong className="h5">{followerCount}</strong><br></br>{ "Followers"}
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>{listItems}</MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
              <>
     

      <MyVerticallyCenteredModal
        user = {user}
        nameList = {showFollowers?followers:following}
        isFollowers = {showFollowers}
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></MyVerticallyCenteredModal>
    </>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
