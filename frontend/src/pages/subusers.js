import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import FullNavBar from "../components/navbar";
import SecondNav from "../components/secondnav";

export default function SubUser(props) {
  const [users, setUsers] = useState({});
  // todo : blocked vs non blocked sort
  const listitems = Object.keys(users).map((key) => {

    return (
      <Card bg={users[key].isBlocked?"secondary":""} className="font-weight-bold " key={key}>
        <Card.Img variant="top" />
        <Card.Body className="">
          <strong style={{ textTransform: "capitalize" }}>
            {" "}
            {users[key].name}
          </strong>

          <div
            className="text-right"
            style={{ display: "inline", float: "right" }}
          ></div>
        </Card.Body>
      </Card>
    );
  });

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
    setUsers(temp.users);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  // get the subgreddit name
  const { username } = useParams();
  return (
    <>
      <FullNavBar />
      <SecondNav user={username} />
      {listitems}
    </>
  );
}
