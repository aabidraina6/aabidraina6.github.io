import React, { useState , useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FullNavBar from "../components/navbar";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

function CreateSubForm(props) {
  let style = {
    boxShadow: " 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
    minWidth: "400px",
    maxWidth: "400px",
    marginTop: "40px",
    marginBottom: "20px",
    padding: "50px 50px",
  };

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [banned, setBanned] = useState("");
  const [userdata , setUserdata] = useState({})


  const [isCreatingPost, setIsCreatingPost] = useState(false);
const loaderColor = "#ffffff";
const loaderStyle = css`
  display: block;
  margin: 0 auto;
  border-color: ${loaderColor};
`;


  const details = async () => {
    const res = await fetch("/profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const temp= await res.json();
    setUserdata(temp)
  };
  
  useEffect(() => {
    details();
    }, []);


  const user = userdata; 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsCreatingPost(true);
      const res = await fetch("/createsub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,desc,tags,banned,user
        }),
      });
      const retData = await res.json()
      if(!retData || res.status === 400 ){
        alert('unsuccessfull reg')
      }
      else{
        navigate('/mysubgreddits')
      }
    } catch (err) {
    }
  };

  return (
    <div className=" ">
      <div style={{ height: "100px", backgroundColor: "#a2d2ff" }}>
        <h1
          style={{
            color: "#0d1b2a",
            marginLeft: "30px",
            verticalAlign: "middle",
          }}
        >
          Greddit
        </h1>
        <MDBBtn
          style={{ marginLeft: "30px" }}
          color="danger"
          href="/mysubgreddits"
        >
          Back
        </MDBBtn>
      </div>
      <center>
        <Card style={style}>
          <Card.Body>
            <Card.Title>Create New Subgreddit</Card.Title>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-uppercase fs-6 fw-bold">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-uppercase fs-6 fw-bold">
                  Description
                </Form.Label>
                <Form.Control
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-uppercase fs-6 fw-bold">
                  Tags
                </Form.Label>
                <Form.Control
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Enter space separated list of tags
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-uppercase fs-6 fw-bold">
                  Banned Keywords
                </Form.Label>
                <Form.Control
                  type="text"
                  value={banned}
                  onChange={(e) => setBanned(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Enter space separated list of banned keywords
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit} disabled={isCreatingPost}>
              {isCreatingPost ? (
    <RingLoader css={loaderStyle} color={loaderColor} />
  ) : (
    'Submit'
  )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </center>
    </div>
  );
}

export default CreateSubForm;
