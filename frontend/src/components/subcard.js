import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
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

export default function Subcard(props) {
  var details = props.details;
  details = {
    name: "subgr name",
    description: "this is a subgr",
    tags: ["a", "b"],
    "banned keywords": ["fuck", "crap", "penguin"],
  };
  const body = Object.keys(details).map((key) => {
    return (
      <div key={key}>
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>{key}</MDBCardText>
          </MDBCol>

          <div>
            {Array.isArray(details[key]) ? (
              <div>
                {details[key].map((item, j) => (
                  <MDBCol sm="9" key={j}>
                    <MDBCardText className="text-muted">{item}</MDBCardText>
                  </MDBCol>
                ))}
              </div>
            ) : (
              <MDBCol sm="9" key={key}>
                <MDBCardText className="text-muted">{details[key]}</MDBCardText>
              </MDBCol>
            )}
          </div>
        </MDBRow>
        <hr />
      </div>
    );
  });
  return (
    <>
      <Card>
        <Card.Body>
          <MDBCardBody>{body}</MDBCardBody>
        </Card.Body>
      </Card>
    </>
  );
}
