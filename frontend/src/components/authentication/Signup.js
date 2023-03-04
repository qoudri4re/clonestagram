import React, { useState, useEffect } from "react";
import "./styles/authentication.css";
import "./styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../../axios";
import { v4 as uuidv4 } from "uuid";
import {
  saveUserDetailsToLocalStorage,
  retrieveUserDetailsFromLocalStorage,
} from "../../utils/functions";
import FourCirclesGrowAndShrink from "../animations/FourCirclesGrowAndShrink";

function Signup() {
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
  const [signupStatus, setSigupStatus] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let errors = [];
    if (!formDetails.username && !formDetails.password && !formDetails.email) {
      errors.push("All input fields must be filled!");
    } else {
      if (formDetails.password.length < 8) {
        errors.push("Password must be 8 characters or more!");
      }
    }
    if (errors.length) {
      setErrors(errors);
    } else {
      setDisplayLoader(true);
      client
        .post("signup", {
          username: formDetails.username,
          email: formDetails.email,
          password: formDetails.password,
        })
        .then((res) => {
          if ("error" in res.data) {
            console.log(res.data);
            setDisplayLoader(false);
            setErrors(res.data.error);
          } else {
            setDisplayLoader(false);
            setSigupStatus(true);
            saveUserDetailsToLocalStorage(res.data.userDetails, 3600000);
            setTimeout(() => navigate("/"), 1000);
          }
        })
        .catch((err) => {
          setErrors(["Something went wrong, please try again"]);
        });
    }
  };

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    if (e.target.name === "username") {
      if (
        formDetails.password === "" ||
        e.target.value === "" ||
        formDetails.email === ""
      ) {
        setDisableSubmitButton(true);
      } else {
        setDisableSubmitButton(false);
      }
    } else if (e.target.name === "email") {
      if (
        formDetails.username === "" ||
        e.target.value === "" ||
        formDetails.password === ""
      ) {
        setDisableSubmitButton(true);
      } else {
        setDisableSubmitButton(false);
      }
    } else {
      if (
        formDetails.username === "" ||
        e.target.value === "" ||
        formDetails.email === ""
      ) {
        setDisableSubmitButton(true);
      } else {
        setDisableSubmitButton(false);
      }
    }
  };

  if (!userDetails) {
    return (
      <div className="content">
        {errors.length ? (
          <div className="info errors">
            {errors.map((item) => (
              <span key={uuidv4()}>{item}</span>
            ))}
          </div>
        ) : signupStatus ? (
          <div className="info success">
            <span>Registration successful, redirecting...</span>
          </div>
        ) : displayLoader ? (
          <div className="info loader">
            <FourCirclesGrowAndShrink />
          </div>
        ) : (
          ""
        )}
        <div className="signup auth">
          <div className="logo">
            <h3>Clonestagram</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
            />
            <button type="submit" id="submit" disabled={disableSubmitButton}>
              Signup
            </button>
            <div className="terms">
              <span>
                By signing up, you agree to our Terms , Privacy Policy and
                Cookies Policy
              </span>
            </div>
          </form>
        </div>
        <div className="bottom">
          <p>
            Have an account?{" "}
            <span>
              <Link to="/login"> LOGIN</Link>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
