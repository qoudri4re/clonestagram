import React, { useEffect, useState } from "react";
import "./styles/authentication.css";
import "./styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../../axios";
import { v4 as uuidv4 } from "uuid";
import {
  saveUserDetailsToLocalStorage,
  retrieveUserDetailsFromLocalStorage,
} from "../../utils/functions";
import FourCirclesGrowAndShrink from "../animations/FourCirclesGrowAndShrink";

function Login() {
  let navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    setUserDetails(retrieveUserDetailsFromLocalStorage());
  }, []);
  useEffect(() => {
    if (userDetails) {
      navigate("/");
    }
  }, [navigate, userDetails]);

  const [errors, setErrors] = useState([]);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    if (e.target.name === "username") {
      if (formDetails.password === "" || e.target.value === "") {
        setDisableSubmitButton(true);
      } else {
        setDisableSubmitButton(false);
      }
    } else {
      if (formDetails.username === "" || e.target.value === "") {
        setDisableSubmitButton(true);
      } else {
        setDisableSubmitButton(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (!formDetails.password && !formDetails.username) {
      errors.push("All input fields must be filled!");
    } else {
      setDisplayLoader(true);
      client
        .post("login", {
          username: formDetails.username,
          password: formDetails.password,
        })
        .then((res) => {
          if ("error" in res.data) {
            setDisplayLoader(false);
            setErrors([res.data.error]);
          } else {
            setLoginStatus(true);
            saveUserDetailsToLocalStorage(res.data.userDetails, 3600000);
            setTimeout(() => navigate("/"), 1000);
          }
        })
        .catch((err) => {
          setErrors(["Something went wrong, please try again"]);
          console.log("something went wrong");
        });
    }
  };

  if (!userDetails) {
    return (
      <div className="content" onSubmit={handleSubmit}>
        {errors.length ? (
          <div className="info errors">
            {errors.map((item) => (
              <span key={uuidv4()}>{item}</span>
            ))}
          </div>
        ) : loginStatus ? (
          <div className="info success">
            <span>Login successful, redirecting...</span>
          </div>
        ) : displayLoader ? (
          <div className="info loader">
            <FourCirclesGrowAndShrink />
          </div>
        ) : (
          ""
        )}
        <div className="login auth">
          <div className="logo">
            <h3>Clonestagram</h3>
          </div>
          <form action="/login" method="post">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
            />
            <button type="submit" id="submit" disabled={disableSubmitButton}>
              Login
            </button>
            <div className="forgot-password">
              <span>Forgot password?</span>
            </div>
          </form>
        </div>
        <div className="bottom">
          <p>
            Don't have an account{" "}
            <span>
              <Link to="/signup">SIGNUP</Link>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
