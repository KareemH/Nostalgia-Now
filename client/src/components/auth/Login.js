import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import "../styles/login.css";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Only destructure the setUserData property of the UserContext object
  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  // This function will trigger when a user clicks a button
  // This function handles logging in to authenticate a user
  const submit = async (e) => {
    // Submitting a form reloads the page, prevent that from restarting the state
    e.preventDefault();
    try {
      // Gather all the input the user submitted and package it into one object
      const loginUser = { email, password };

      // Make a POST request to log in
      const loginRes = await Axios.post("/users/login", loginUser);

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
    <div className="login-background">
      <h1 class="login-title">Log In</h1>
      <h6 class="login-prompt">To continue reliving your childhood</h6>
      <div className="login-box">
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

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
