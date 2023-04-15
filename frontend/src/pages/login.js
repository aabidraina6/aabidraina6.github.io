import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { Password } from "@mui/icons-material";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/profile", { replace: true });
    }
  });
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameRegister, setUserNameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [contactNumber, setContactNumber] = useState("");

  const [isLogin, setIsLogin] = useState(1);
  const [isDisabledLogin, setIsDisabledLogin] = useState(1);
  const [isDisabledRegister, setIsDisabledRegister] = useState(1);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:userName,
        password,
      }),
    });

   

    //! retData.status
    if ( res.status === 400  ) {
      alert("wrong credentials");
    } else {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/profile", { replace: true });

    }

    // if (localStorage.getItem("isLoggedIn") === "true") {
    //   navigate("/profile", { replace: true });
    // }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        userName: userNameRegister,
        email,
        age,
        contactNumber,
        password: passwordRegister,
      }),
    });

    const retData = await res.json();
    if (!retData || retData.status === 422) {
      alert("invalid registeration");
    } else {
      alert("registeration successful");
      setIsLogin(!isLogin);
    }
  };

  let style = {
    boxShadow: " 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
    // margin: "100px 500px",
    minWidth: "400px",
    maxWidth: "400px",
    marginTop: "40px",
    padding: "50px 50px",
  };

  const handleToggle = (e) => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    userName === "" || password === ""
      ? setIsDisabledLogin(1)
      : setIsDisabledLogin(0);
  }, [userName, password]);
  useEffect(() => {
    userNameRegister === "" ||
    passwordRegister === "" ||
    firstName === "" ||
    lastName === "" ||
    age === "" ||
    contactNumber === "" ||
    email === ""
      ? setIsDisabledRegister(1)
      : setIsDisabledRegister(0);
  }, [
    userNameRegister,
    passwordRegister,
    firstName,
    lastName,
    contactNumber,
    age,
    email,
  ]);

  return (
    <>
      <div style={{ height: "100px", backgroundColor: "#a2d2ff" }}>
        <center>
          <h1 style={{ color: "#0d1b2a" }}>Greddit</h1>
        </center>
      </div>
      <center>
        <div className="field box " style={style}>
          <form onSubmit={handleSubmitLogin}>
            {!isLogin ? (
              <label className="label">
                First Name
                <br />
                <input
                  className="input"
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                  minLength={5}
                />
                <br />
              </label>
            ) : (
              <div></div>
            )}

            {!isLogin ? (
              <label className="label">
                Last Name
                <br />
                <input
                  className="input"
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <br />
              </label>
            ) : (
              <div></div>
            )}
            {isLogin ? (
              <div className="form-group was-validated mb-2">
                <label className="label">
                  Username
                  <br />
                  <input
                    className="input"
                    placeholder="Username"
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                  <br />
                </label>
              </div>
            ) : (
              <div className="form-group was-validated mb-2">
                <label className="label">
                  Username
                  <br />
                  <input
                    className="input"
                    placeholder="Username"
                    type="text"
                    value={userNameRegister}
                    onChange={(e) => {
                      setUserNameRegister(e.target.value);
                    }}
                  />
                  <br />
                </label>
              </div>
            )}

            {!isLogin ? (
              <label className="label">
                Email
                <br />
                <input
                  className="input"
                  placeholder="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <br />
              </label>
            ) : (
              <div></div>
            )}

            {!isLogin ? (
              <label className="label">
                Age
                <br />
                <input
                  className="input"
                  placeholder="Age"
                  type="number"
                  value={age || ""}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
                <br />
              </label>
            ) : (
              <div></div>
            )}

            {!isLogin ? (
              <label className="label">
                Contact Number
                <br />
                <input
                  className="input"
                  placeholder="Contact Number"
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                />
                <br />
              </label>
            ) : (
              <div></div>
            )}
            {isLogin ? (
              <div className="form-group was-validated mb-2">
                <label className="label" style={{ marginTop: "2px" }}>
                  Passwordlogin
                  <br />
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </label>
              </div>
            ) : (
              <div className="form-group was-validated mb-2">
                <label className="label" style={{ marginTop: "2px" }}>
                  Password
                  <br />
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={passwordRegister}
                    onChange={(e) => {
                      setPasswordRegister(e.target.value);
                    }}
                  />
                </label>
              </div>
            )}
            <br />
            <div className="has-text-centered">
              {isLogin ? (
                <button
                  // disabled={isDisabled}
                  className="button is-link"
                  type="submit"
                  onClick={handleSubmitLogin}
                  disabled={isDisabledLogin}
                >
                  Login
                </button>
              ) : (
                <button
                  // disabled={isDisabled}
                  className="button is-link"
                  type="submit"
                  onClick={handleSubmitRegister}
                  disabled={isDisabledRegister}
                >
                  Signup
                </button>
              )}
            </div>
          </form>
        </div>
      </center>
      <div className="has-text-centered">
        <p>{isLogin ? "Don't have an account" : "Already have an account"}</p>
        <button onClick={handleToggle} className="button is-ghost">
          {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </>
  );
}
