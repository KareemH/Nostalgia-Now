import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

import Axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/home.css";
import Song from "./Song";

export default function Home() {
  const [homesongs, setHomeSongs] = useState([]);
  const { userData } = useContext(UserContext);
  const history = useHistory();

  // Checking if a user is still authenticated
  useEffect(() => {
    // if (!userData.user) history.push("/login");
    if (!localStorage.getItem("auth-token")) {
      history.push("/login");
    }
  }, []);

  // Retrieving song information
  useEffect(() => {
    const getSongs = async () => {
      const results = await Axios.get("/songs/homepage", {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      let songList = results.data;
      // console.log(songList);
      setHomeSongs(songList);
    };
    getSongs();
    console.log("Effect has been run");
  }, []);

  return (
    <div className="homepage">
      {/* {console.log(userData)} */}
      <h1 className="home-greeting">
        Welcome to the past, {userData.user.username}
      </h1>
      <h4 className="home-msg">
        Here are this week's most popular nostalgic songs
      </h4>

      <CardGroup>
        {homesongs.map((homesong) => {
          return (
            <div style={{ marginBottom: 19 }}>
              <Song
                key={homesong._id}
                id={homesong._id}
                title={homesong.title}
                artist={homesong.artist}
                img={homesong.coverImage}
                rank={homesong.rank}
                year={homesong.yearOnChart}
                current_user={userData.user.username}
                likes={homesong.likeCount}
                //url = { "https://en.wikipedia.org/wiki/Boom Boom Pow"}
                url={`https://www.youtube.com/embed/${homesong.videoId}`}
              />
            </div>
          );
        })}
      </CardGroup>
    </div>
  );
}
