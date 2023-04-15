import React, { useState, useEffect } from "react";
import Subcard from "../components/subcard";
import FullNavBar from "../components/navbar";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

import { MDBBtn, MDBCol } from "mdb-react-ui-kit";

export default function AllSub(props) {
  const navigate = useNavigate();
  const [subdata, setSubdata] = useState({});
  const [searchdata, setSearchdata] = useState({});

  const fetchdata = async () => {
    const res = await fetch("/allsubs", {
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
  }, [tagdata]);

  const handlesearch = async () => {
    const res = await fetch(`/search?query=${search}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const temp = await res.json();
    setSearchdata(temp);
  };

  const applyFilter = async () => {
    if (props.search) {
    } else {
    }
  }; // todo : inc

  const [tags, setTags] = useState("");
  const [tagdata, setTagdata] = useState([]);

  const [search, setSearch] = useState("");

  const tagitems = tagdata.map((key) => (
    <div style={{ marginTop: "10px", display: "inline-flex" }} key={key}>
      <Button
        variant="secondary"
        disabled
        style={{
          inlineSize: "150px",
          overflowWrap: "break-word",
          color: "black",
        }}
      >
        <div style={{ fontWeight: "200" }}> {key}</div>
      </Button>
      <Button
        onClick={() => {
          setTagdata((prevTags) => prevTags.filter((tag) => tag !== key));
        }}
        variant="secondary"
      >
        <div style={{ color: "red" }}>X</div>
      </Button>
    </div>
  ));

  const listitems = Object.keys(props.search ? searchdata : subdata).map(
    (key) => (
      <div
        key={key}
        onClick={() => {

          navigate(
            `/allsubs/${
              props.search ? searchdata[key].name : subdata[key].name
            }`,
            {
              state: {
                _id: props.search ? searchdata[key]._id : subdata[key]._id,
              },
            }
          );
        }}
      >
        <Subcard my={true} all={true} details={subdata[key]}></Subcard>
      </div>
    )
  );

  return (
    <>
      <FullNavBar />

      <MDBCol md="12" style={{ margin: "9px", marginBottom: "5px" }}>
        <Row>
          <Col sm={4}>
            <input
              className="form-control mr-sm-2"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search"
              aria-label="Search"
            />
          </Col>
          <Col sm={3}>
            <MDBBtn
              gradient="aqua"
              rounded
              size="sm"
              type="submit"
              className="mr-auto"
              onClick={() => {
                if (search) handlesearch();
              }}
            >
              Search
            </MDBBtn>
          </Col>

          <Col sm={5} style={{ fontSize: "large", fontWeight: "bold" }}>
            <div style={{ display: "inline", float: "left" }}>Sort By | </div>{" "}
            <Form style={{ marginTop: "2px" }}>
              {["checkbox"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Followers"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="Name(Asc)"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="Name(desc)"
                    type={type}
                    id={`inline-${type}-3`}
                  />
                  <Form.Check
                    inline
                    label="Time"
                    type={type}
                    id={`inline-${type}-3`}
                  />
                </div>
              ))}
            </Form>
          </Col>
        </Row>
      </MDBCol>
      <Row>
        {!props.search ? (
          <Col
            className="sticky-top"
            style={{
              marginLeft: "10px",
              marginTop: "20px",
              position: "fixed",
              marginTop: "150px",
            }}
            xs="auto"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (tags && !tagdata.includes(tags))
                  setTagdata((prevState) => [...prevState, tags]);

                setTags("");
              }}
            >
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="tags"
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
                aria-label="Search"
              />
            </form>

            <center>
              <MDBBtn
                variant="info"
                onClick={() => {
                  if (tags && !tagdata.includes(tags))
                    setTagdata((prevState) => [...prevState, tags]);

                  setTags("");
                }}
                size="sm"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Add
              </MDBBtn>
              <MDBBtn
                onClick={applyFilter}
                size="sm"
                type="submit"
                style={{ marginLeft: "12px", marginTop: "10px" }}
              >
                Filter
              </MDBBtn>
            </center>
            <div style={{ inlineSize: "210px", overflowWrap: "break-word" }}>
              {tagitems}
            </div>
          </Col>
        ) : (
          <></>
        )}
        <Col>{listitems}</Col>
      </Row>
    </>
  );
}
