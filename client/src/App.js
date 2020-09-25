import React, { useState, useEffect } from "react";
import "./components/styles/app.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";

import NavBar from "./components/layout/NavBar.js";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SpecificYear from "./components/pages/SpecificYear";
import UserAccount from "./components/pages/UserAccount";
import Popular from "./components/pages/Popular";
import CompareCharts from "./components/pages/CompareCharts";

import UserContext from "./context/UserContext";

function App() {
  // Default global state of the app is a client with undefined credentials
  const [userData, setUserData] = useState({
    token: "",
    user: "",
  });

  // This useEffect will check for the auth-token data in a browser's local storage
  // Second parameter [] makes the useEffect function run only once
  useEffect(() => {
    const checkLoggedIn = async () => {
      // Check if token exists
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      // Verify a token's legitimacy
      // This POST request returns T/F
      const tokenRes = await Axios.post("/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });

      // If the token exists/is truthy
      if (tokenRes.data) {
        // Make a GET request to retrieve info about the user since the token exists
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });

        setUserData({ token, user: userRes.data });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route
              path="/songYear/:year"
              exact
              component={SpecificYear}
            ></Route>
            <Route path="/user/:username" exact component={UserAccount}></Route>
            <Route path="/popular" exact component={Popular}></Route>
            <Route
              path="/compareCharts"
              exact
              component={CompareCharts}
            ></Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
