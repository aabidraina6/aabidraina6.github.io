import React  , {useEffect , useState}from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";


import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function   Subcard(props) {
  const navigate = useNavigate();
  const [isloading , setIsloading] = useState(false)
  const  [userdata,setUserdata] = useState({});
  const [isme , setIsme] = useState(false)
  const [joined , setJoined]= useState(false)
  const [pending  , setPending] = useState(false)
  const checkLogin = async () => {
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

  const joinRequest = async () =>{
    const res = await fetch("/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sub : props.details
      }),
    });
  }

  var dd = props.details;  // details of the subgreddit 
  // details = {
  //   name: "subgr name",
  //   "Number of posts":20,
  //   "Number of people":30,
  //   description: "this is a subgr ggfdsfdsf adf asdf sda fs df sd fs df das f sad fs df sdfasdfasdf asd fsda f sadf sad f sdf ds f sd fds",
  //   "banned keywords": ["fuck", "crap", "penguin"],
  // };
  let banned = [];
  const subid = props.details._id

  for (let i = 0; i < dd.banned.length; i++) {
    banned.push(dd.banned[i].word);
  }

  var details = {
    name: dd.name,
    "Number of posts": dd.posts.length,
    "Number of people": dd.users.length,
    description: dd.desc,
    "banned keywords": banned,
  };
  const un = details.name;
  const body = Object.keys(details).map((key) => {
    return (
      <div key={key}>
        <div>
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText
                className="text-uppercase fs-6 fw-bold"
                style={{ whiteSpace: "nowrap" }}
              >
                {key}
              </MDBCardText>
            </MDBCol>

            <div>
              {Array.isArray(details[key]) ? (
                <MDBCol sm="9" key={key}>
                  <MDBCardText className="">
                    {details[key].map((item, j) => (
                      <span
                        key={j}
                        className="badge bg-primary text-wrap"
                        style={{ margin: "3px", display: "inline" }}
                      >
                        {item}
                      </span>
                    ))}
                  </MDBCardText>
                </MDBCol>
              ) : (
                <MDBCol sm="9" key={key}>
                  <MDBCardText className="text-muted">
                    {details[key]}
                  </MDBCardText>
                </MDBCol>
              )}
            </div>
          </MDBRow>
        </div>
        <hr />
      </div>
    );
  });

  useEffect(()=>{
    setIsloading(true)
    if(props.details ){
      if(userdata && userdata.mysubs){
        setIsme(userdata.mysubs.findIndex(e =>e._id ===props.details._id)>-1)
        setJoined(props.details.users.findIndex(e =>e._id === userdata._id) > -1)
        setPending(props.details.requests.findIndex(e=>e._id === userdata._id)>-1)
      }
    }
    setIsloading(false)
  } , [userdata , props.details])

useEffect(()=>{
  checkLogin();
},[])
if(isloading){
  return (<div>loading...</div>)
}

  return (
    <>
      <Card
        style={{
          margin: "20px ",
          marginLeft: props.all ? "250px" : "210px",
          marginRight: "100px",
          backgroundColor: "#cce3de",
        }}
      >
        <Card.Body>
          <MDBCardBody>
            <MDBRow>
              <MDBCol className="d-flex justify-content-center">
                <MDBCol lg="4">
                  <MDBCard
                    className="mb-4"
                    style={{ backgroundColor: "#eaf4f4" }}
                  >
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src="https://www.vectorico.com/wp-content/uploads/2018/08/Reddit-logo-300x300.png"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                      <p className=" mb-4">
                        <strong>{dd.name} </strong>
                      </p>
                      <div className="d-flex justify-content-center mb-2">
                        {!props.all ? (
                          <div>
                           
                           <MDBBtn style={{ margin: "3px" }} color="danger">
 
                              {"Delete"}
                            </MDBBtn>
                            <MDBBtn
                              color="primary"
                              style={{ margin: "3px" }}
                              onClick={() => {
                                navigate(`/mysubgreddits/${un}`);
                              }}
                            >
   
                              {"Open"}
                            </MDBBtn>
                          </div>
                        ) : (
                          isme?
                          (<MDBBtn
                            disabled
                            style={{ margin: "3px" }}
                            color="danger"
                            onClick={() => {}}
                          >

                            {"Self"}
                          </MDBBtn>):(
                            joined ? (<MDBBtn
                              style={{ margin: "3px" }}
                              color="danger"
                              onClick={() => {}}
                            >
      
                              {"Leave"}
                            </MDBBtn>):(
                              pending?
                            <MDBBtn
                            disabled
                            style={{ margin: "3px" }}
                            color="success"
                           
                          >

                            {"Requested"}
                          </MDBBtn>: <MDBBtn

                            style={{ margin: "3px" }}
                            color="primary"
                            onClick={() => {joinRequest()
                            window.location.reload()}}
                          >

                            {"Join"}
                          </MDBBtn>)
                          )
                        )}
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBCol>
              <MDBCol>{body}</MDBCol>
            </MDBRow>
          </MDBCardBody>
        </Card.Body>
      </Card>
    </>
  );
}
