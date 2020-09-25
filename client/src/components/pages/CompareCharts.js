import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useParams } from "react-router";

import Axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Badge from "react-bootstrap/Badge";
import ChartSong from "./ChartSong";

import "../styles/compareCharts.css";

export default function UserAccount() {
  let [todaySongs, setTodaySongs] = useState([]);
  let [beforeSongs, setBeforeSongs] = useState([]);
  let { username } = useParams();

  const { userData } = useContext(UserContext);
  const history = useHistory();

  // Checking if a user is still authenticated
  useEffect(() => {
    // if (!userData.user) history.push("/login");
    if (!localStorage.getItem("auth-token")) {
      history.push("/login");
    }
  });

  return (
    <div>
      <h1>
        {/* {console.log(userData)} */}
        <h1 className="compare-greeting">Battle of the Decades</h1>
        <h4 className="compare-msg">This feature is coming soon</h4>
      </h1>
      <div className="chart-flex">
        <div class="chart">
          <ChartSong />
        </div>
        <div class="chart">
          <ChartSong />
        </div>
      </div>
    </div>
  );
}
