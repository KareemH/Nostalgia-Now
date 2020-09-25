import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import "../styles/register.css";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // Only destructure the setUserData property of the UserContext object
  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  // This function will trigger when a user clicks a button
  // This function handles registering and behind the scenes logging in to authenticate a user
  const submit = async (e) => {
    // Submitting a form reloads the page, prevent that from restarting the state
    e.preventDefault();
    try {
      // Gather all the input the user submitted and package it into one object
      const newUser = { email, password, passwordCheck, username };

      // Make a POST request to submit this data to the backend /users/register route
      await Axios.post("/users/register", newUser);

      // Make a follow-up POST request to automatically log in
      const loginRes = await Axios.post("/users/login", {
        email,
        password,
      });

      // Retrieve the JWT maintaining the session for the user
      // Use the token to set the user's credentials and maintain it in the global context
      setUserData({ token: loginRes.data.token, user: loginRes.data.user });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      // If the left side is true
      // The right side then executes
      // Succint && conditional rendering
      console.log(err.response.data);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="register-background">
      <h1 class="register-title">Sign Up</h1>
      <h6 class="register-prompt">To start reliving your childhood</h6>
      <div className="register-box">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <Form onSubmit={submit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formVerifyPassword">
            <Form.Label>Verify Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Verify password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
