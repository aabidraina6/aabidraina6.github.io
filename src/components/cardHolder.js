import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function ImageAndTextExample({ nameList ,isFollowers }) {
  const names = nameList.map((nameToShow) => (
    <div>
      <Card>
        <Card.Img variant="top" />
        <Card.Body className="">
         <strong> {nameToShow}</strong>

          <div className="text-right" style={{display:"inline" ,float:"right"}} >

            <Button variant="danger">{isFollowers?"Remove":"Unfollow"}</Button>
            </div>
        </Card.Body>
      </Card>
      <br />
    </div>
  ));

  return <>{names}</>;
}

export default ImageAndTextExample;
