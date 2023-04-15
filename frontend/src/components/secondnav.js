import { Navbar, Container, Nav } from "react-bootstrap";
import React, { useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";
export default function SecondNav(props) {
  const navigate = useNavigate();

  return (
    <Navbar variant="light" style={{ backgroundColor: "#caf0f8" }}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link href={`/mysubgreddits/${props.user}/users`}>Users</Nav.Link>
          <Nav.Link href={`/mysubgreddits/${props.user}/requests`}>Requests</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
