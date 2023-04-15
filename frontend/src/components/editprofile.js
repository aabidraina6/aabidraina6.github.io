import React ,{ useEffect, useState } from "react";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdb-react-ui-kit";

export default function EditProfileModal({ userdata, show, onHide, onSave }) {
  const [formData, setFormData] = useState(userdata);
  console.log( userdata)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onHide();
  };
  useEffect(()=>{
    setFormData(userdata)
    console.log('setforn' , formData)
  } , [])

  console.log(formData)

  return (
    <MDBModal show={show} onHide={onHide}>
      <MDBModalHeader>
        <h5>Edit Profile</h5>
      </MDBModalHeader>
      <MDBModalBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
