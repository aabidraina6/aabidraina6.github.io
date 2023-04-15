import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ImageAndTextExample from './cardHolder';
import "bulma/css/bulma.min.css";
import Card from 'react-bootstrap/Card'

export default function MyVerticallyCenteredModal(props) {
  const style = {display:" block",
    backgroundColor:" #bbb",
    margin: "10px",
    padding:" 10px"}


  return (
  
    <Modal

      {...props}
      scrollable={true}
      size="md"
    //   backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
          {props.isfollowers?"Followers":"Following"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
            <Row>
              <Col >
                <div>
                <ImageAndTextExample userdata = {props.userdata} nameList={props.nameList} isfollowers={props.isfollowers}></ImageAndTextExample>
                </div>
               
                </Col>
               
            </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



