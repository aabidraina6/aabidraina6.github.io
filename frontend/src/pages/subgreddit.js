import React, { useState, useEffect } from "react";
import FullNavBar from "../components/navbar";
import Subcard from "../components/subcard";
import { MDBBtn } from "mdb-react-ui-kit";

export default function MySubgreddit(props) {
  const details = {
    name: "subgr name",
    "Number of posts": 20,
    "Number of people": 30,
    description:
      "this is a subgr ggfdsfdsf adf asdf sda fs df sd fs df das f sad fs df sdfasdfasdf asd fsda f sadf sad f sdf ds f sd fds",
    "banned keywords": ["fuck", "crap", "penguin"],
  };

  const [subdata, setSubdata] = useState({});
  const fetchdata = async () => {
    const res = await fetch("/mysubgreddits", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const temp = await res.json();
    setSubdata(temp);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const listitems = Object.keys(subdata).map((key) => (
    <Subcard key={key} details={subdata[key]}></Subcard>
  ));

  return (
    <>
      <FullNavBar></FullNavBar>

      <MDBBtn
        className="mr-auto"
        style={{ position: "fixed", marginTop: "20px", marginLeft: "2px" }}
        gradient="aqua"
        rounded
        href="/createsub"
      >
        Create New Subgreddit
      </MDBBtn>

      {listitems}
      {/* <Subcard details = {details}></Subcard> */}
    </>
  );
}
