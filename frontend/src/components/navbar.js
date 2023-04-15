import { Navbar, Container, Nav } from "react-bootstrap";


import StarRateIcon from '@mui/icons-material/StarRate';
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useNavigate, NavLink } from "react-router-dom";
export default function FullNavBar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  const [bgcolor, setBgcolor] = useState("black");
  const [textcolor, setTextcolor] = useState("#023047");

  function handleHighlightTab() {
    setTextcolor("red");
  }

  return (
    <Navbar
      style={{
        backgroundColor: "#A2D2FF",
        margin: "0px",
        position: "sticky",
        top: "0",
      }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/">
          {" "}
          <h1 style={{ color: "#0d1b2a" }}>Greddit</h1>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link style={{ color: "#023047" }} href="/">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <HomeIcon style={{ marginBottom: "10px" }} />
              <h6>Home</h6>
            </div>
          </Nav.Link>
          <Nav.Link style={{ color: "#023047" }} href="/profile">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <AccountCircleIcon style={{ marginBottom: "10px" }} />
              <h6>Profile</h6>
            </div>
          </Nav.Link>

          <Nav.Link style={{ color: "#023047" }} href="/mysubgreddits">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              className=""
            >
              <GroupWorkIcon style={{ marginBottom: "10px" }}></GroupWorkIcon>
              <h6>My Subgreddits</h6>
            </div>
          </Nav.Link>

          <Nav.Link style={{ color: "#023047" }} href="/allsubs">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <WorkspacesIcon style={{ marginBottom: "10px" }} />
              <h6> All Subgreddits</h6>
            </div>
          </Nav.Link>

          <Nav.Link style={{ color: "#023047" }} href="/savedposts">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <StarRateIcon style={{ marginBottom: "10px" }} />
              <h6> Saved Posts</h6>
            </div>
          </Nav.Link>

          <Nav.Link style={{ color: "#023047" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              className=""
              onClick={logOut}
            >
              <LogoutIcon style={{ marginBottom: "10px" }}></LogoutIcon>
              <h6>Logout</h6>
            </div>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
