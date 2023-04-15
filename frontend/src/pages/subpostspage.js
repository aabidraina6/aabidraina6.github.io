import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import FullNavBar from "../components/navbar";
import Post from "../components/postcard";
import { useParams } from "react-router-dom";
import { Modal, Card, Button, Image, Form, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBCardImage } from "mdb-react-ui-kit";


export default function SubPage(props) {
  const [subdata, setSubdata] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);



  const fetchdata = async () => {
    setLoading(true);
    const res = await fetch(`/${username}/data`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const temp = await res.json();

    setSubdata(temp);
    setLoading(false);
  };

  const [userdata, setUserdata] = useState({});
  const FetchUserdata = async () => {
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
    fetchdata();
  }, []);
  useEffect(() => {
    FetchUserdata();
  }, []);

  // const banned = sd.map(obj => obj['word'])
  const [text, setText] = useState("");
  const { username } = useParams();

  const handlePost = async (e) => {
    const res = await fetch("/allsubs/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        subname: username,
      }),
    });

    const retData = await res.json();
    window.location.reload();
    if (res.status == 200) {
      handleHideModal();
    } else {
      alert(retData);
    }
  };
  var listitems;
  if (!loading) {
    listitems = subdata.posts.map((key) => {
      return <Post userdata = {userdata} sub={subdata.name} key={key._id} id={key._id}></Post>;
    });
  }

  if (loading) {
    return <div>loading... </div>;
  }

  return (
    <>
      <Modal show={showModal} onHide={handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>What's on your mind,{userdata.firstName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handlePost();
            }}
          >
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type  here"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>
            Close
          </Button>
          <Button
            onClick={() => {
              handlePost();
            }}
            variant="primary"
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>

      <FullNavBar />
      <div style={{ position: "sticky", top: "83px", zIndex: "1" }}>
        <Card style={{ backgroundColor: "#e0e2db", paddingLeft: "20px" }}>
          <Card.Body>
            <Row>
              <Col>
                <MDBCardImage
                  src="https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px", marginLeft: "50px" }}
                  fluid
                />
              </Col>
              <Col md={4}>
                <div className="text-wrap"> {subdata.desc}</div>
              </Col>
              <Col sm={5}>
                <h1>{subdata.name}</h1>
                <Button
                  variant="primary"
                  style={{ width: "auto", marginTop: "20px" }}
                  onClick={handleShowModal}
                >
                  Create Post
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      {listitems}
    </>
  );
}
