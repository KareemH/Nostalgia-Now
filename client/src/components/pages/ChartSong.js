import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useParams } from "react-router";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Badge from "react-bootstrap/Badge";

import "../styles/compareCharts.css";

export default function ChartSong(props) {
  let [songs, setSongs] = useState([]);
  let { username } = useParams();

  const { userData } = useContext(UserContext);
  const history = useHistory();

  // Checking if a user is still authenticated
  useEffect(() => {
    // if (!userData.user) history.push("/login");
    if (!localStorage.getItem("auth-token")) {
      history.push("/login");
    }
  }, []);

  return <div></div>;
}
