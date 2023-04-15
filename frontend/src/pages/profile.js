import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

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
import Button from "react-bootstrap/Button";
import FullNavBar from "../components/navbar";
import EditProfileModal from "../components/editprofile";

export default function MyProfile({ user, followers, following }) {
  const [userdata, setUserdata] = useState({});
  const [editmodal, setEditmodal] = useState(false);
  const checkLogin = async () => {
    const res = await fetch("/profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const temp = await res.json();
    setUserdata(temp);
  };
  useEffect(() => {
    checkLogin();
  }, []);

  const editProfile = () => {
    console.log('edit')
    setEditmodal(true)
  };


  const validData = {
    "First Name": userdata.firstName,
    "Last Name": userdata.lastName,
    Username: userdata.userName,
    Email: userdata.email,
    Age: userdata.age,
    "Contact Number": userdata.contactNumber,
  };
  followers = userdata.followers || [];
  following = userdata.following || [];
  // setUserdata(validData)

  const listItems = Object.keys(validData).map((key) => (
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
  ));

  let followingCount = following.length;
  let followerCount = followers.length;
  const [modalShow, setModalShow] = React.useState(false);
  const [showFollowers, setShowFollowers] = React.useState();
  return (
    <>
      <FullNavBar />
      {/* <EditProfileModal userdata={validData} show={editmodal} onHide={setEditmodal(false)} /> */}

      <section className="box" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5" style={{ height: "890px" }}>
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb
                className="bg-light rounded-3 p-3 mb-4"
                style={{ position: "relative", alignItems: "center" }}
              >
                <MDBBreadcrumbItem>
                  <a href="/">Home</a>
                </MDBBreadcrumbItem>

                <MDBBreadcrumbItem active>Profile</MDBBreadcrumbItem>
                <MDBBtn
                  onClick={editProfile}
                  style={{
                    position: "absolute",
                    right: "0",
                    marginRight: "20px",
                  }}
                >
                  Edit Profile
                </MDBBtn>
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
                  <p className=" mb-4">
                    <strong>
                      {validData["First Name"] + " " + validData["Last Name"]}
                    </strong>
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn
                      outline
                      onClick={() => {
                        if (followingCount) {
                          setModalShow(true);
                          setShowFollowers(false);
                        }
                      }}
                    >
                      <strong className="h5">{followingCount}</strong>
                      <br></br>
                      {"Following"}
                    </MDBBtn>
                    <MDBBtn
                      outline
                      className="ms-1"
                      onClick={() => {
                        if (followerCount) {
                          setModalShow(true);
                          setShowFollowers(true);
                        }
                      }}
                    >
                      <strong className="h5">{followerCount}</strong>
                      <br></br>
                      {"Followers"}
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
                    userdata={validData}
                    nameList={showFollowers ? followers : following}
                    isfollowers={showFollowers}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  ></MyVerticallyCenteredModal>
                </>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <EditProfileModal userdata={userdata} show={editmodal}/>
    </>
  );
}
