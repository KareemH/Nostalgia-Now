import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useParams } from "react-router";

import Axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Badge from "react-bootstrap/Badge";
import Song from "./Song";
import "../styles/specificYear.css";

export default function SpecificYear() {
  let [songs, setSongs] = useState([]);
  let { year } = useParams();

  const { userData } = useContext(UserContext);
  const history = useHistory();

  // Checking if a user is still authenticated
  useEffect(() => {
    // if (!userData.user) history.push("/login");
    if (!localStorage.getItem("auth-token")) {
      history.push("/login");
    }
  }, []);

  // Retrieving songs from a specific year
  useEffect(() => {
    const getSongs = async () => {
      const results = await Axios.get(`/songs/specificYear/${year}`, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      //   console.log("From server:", results);
      let songList = results.data;
      //   console.log(songList);
      setSongs(songList);
    };

    getSongs();
    console.log("Effect has been run");
  }, []);

  return (
    <div className="homepage">
      {/* {console.log(userData)} */}
      <h1 className="year-greeting">Take it back to {year}</h1>
      <h4 className="year-msg">Here are this week's most popular songs</h4>

      <CardGroup>
        {songs.map((song) => {
          return (
            <div style={{ marginBottom: 19 }}>
              <Song
                key={song._id}
                id={song._id}
                title={song.title}
                artist={song.artist}
                img={song.coverImage}
                rank={song.rank}
                year={song.yearOnChart}
                current_user={userData.user.username}
                likes={song.likeCount}
                //url = { "https://en.wikipedia.org/wiki/Boom Boom Pow"}
                url={`https://www.youtube.com/embed/${song.videoId}`}
              />
            </div>
          );
        })}
      </CardGroup>
    </div>
  );
}
