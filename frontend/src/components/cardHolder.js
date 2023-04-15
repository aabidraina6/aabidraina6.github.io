import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function ImageAndTextExample({ userdata, nameList, isfollowers }) {
  const reload = () => {
    const mymodal = 
    window.location.reload();
  };
  const removefollow = async (useremail, followeremail) => {
    const res = await fetch("/follow/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followeremail: followeremail,
        useremail: useremail,
      }),
    });
  };

  const unfollow = async (useremail , followingemail) => {
    const res = await fetch("/unfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followingemail: followingemail,
        useremail: useremail,
      }),
    });
  };

  const names = nameList.map((nameToShow, key) => {
    return (
    <div key={key}>
      <Card>
        <Card.Img variant="top" />
        <Card.Body className="">
          <strong> {nameToShow.name}</strong>

          <div
            className="text-right"
            style={{ display: "inline", float: "right" }}
          >
            <Button
              variant="danger"
              onClick={
                isfollowers
                  ? () => {
                      removefollow(userdata.Email, nameToShow.email);
                      reload();
                    }
                  : () =>{
                    unfollow(userdata.Email , nameToShow.email)
                    reload();
                  }
              }
            >
              {isfollowers ? "Remove" : "Unfollow"}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <br />
    </div>
  )});

  return <>{names}</>;
}

export default ImageAndTextExample;
