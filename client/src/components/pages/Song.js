import React, { useState } from "react";
import axios from "axios";
import Iframe from "react-iframe";
import "../styles/song.css";
import Card from "react-bootstrap/Card";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faHeart,
  faHeartBroken,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";

function Song(props) {
  const [show, setShow] = useState(false); // State to handle Modal component
  // Functions to handle Modal component
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let date = new Date();
  let currentYear = date.getFullYear();

  //-----------------------------------Incrementing a song's number of total likes on the backend---------------------------
  const [likes, setLikes] = useState(props.likes); // State to management the amount of likes of a given song

  // When a user click on the heart button, this function will get triggered
  const increaseLikes = (current_user, id) => {
    let alreadyLiked;

    const addLike = async () => {
      // Increment the song's likes on the backend
      const res = await axios.get(`/songs/likeSong/${current_user}/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      alreadyLiked = res.data.result; // Was a song already liked by this user?
      console.log(alreadyLiked);
      // If a song was not already liked by this user, then we can increment the front end like's
      if (alreadyLiked === false) {
        setLikes(likes + 1);
      } // Note that if a user already liked a song, they are prevented from incrementing to deter spamming
    };

    // Call the function to increment likes
    addLike();
  };

  // This will enable the popup of the likes
  function renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        <strong>Total Likes: {likes}</strong>
      </Tooltip>
    );
  }
  //------------------------------------------------------------------------------------------------------------------

  //-----------------------------------Decrementing a song's number of total likes on the backend---------------------------
  // When a user click on the heart broken button, this function will get triggered
  const decreaseLikes = (current_user, id) => {
    let alreadyUnliked;

    const unLike = async () => {
      // Decrement the song's likes on the backend
      const res = await axios.get(`/songs/unlikeSong/${current_user}/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      alreadyUnliked = res.data.result; // Was a song already unliked by a user?
      console.log(alreadyUnliked);
      // If a song was not already unliked by this user, then we can decrement the front end like's
      if (alreadyUnliked === false) {
        setLikes(likes - 1);
      } // Note that if a user already unliked a song, they are prevented from decrementing to deter spamming
    };

    // Call the functiion to decrement likes
    unLike();
  };
  //------------------------------------------------------------------------------------------------------------------

  //-----------------------------------Adding a song to a user's likes array on the backend---------------------------
  // When a user click on the plus button, this function will get triggered
  const addToMyFavorite = (current_user, id) => {
    // Create a function to make a POST request to add a song to a user's likes array on the database/backend
    const addSong = async () => {
      const results = await axios.post(
        `/songs/addSong/${current_user}/${id}`,
        null,
        {
          headers: { "x-auth-token": localStorage.getItem("auth-token") },
        }
      );
    };

    // Call the function to add the song
    addSong();
  };
  //------------------------------------------------------------------------------------------------------------------

  //-----------------------------------Removing a song from a user's likes array on the backend---------------------------
  // When a user click on the minus button, this function will get triggered
  const removeFromMyFavorite = (current_user, id) => {
    // Create a function to make a POST request to remove a song from a user's likes array on the database/backend
    const removeSong = async () => {
      const res = await axios.post(
        `/songs/removeSong/${current_user}/${id}`,
        null,
        {
          headers: { "x-auth-token": localStorage.getItem("auth-token") },
        }
      );
      console.log(res.data.result);
    };

    // Call the function to remove the song
    removeSong();
  };

  //------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Card style={{ margin: 5 }}>
        <Card.Body>
          <Card.Title>
            {props.title} <Badge variant="success">{"#" + props.rank}</Badge>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.artist}
          </Card.Subtitle>
          <div style={{ width: 400, height: 240 }}>
            <Card.Img src={props.img} onClick={handleShow} />
          </div>

          <div>
            <div className="button-left">
              <Button variant="warning">
                {props.year}{" "}
                <Badge variant="light">
                  {currentYear - props.year + " Years Ago!"}
                </Badge>
              </Button>
            </div>

            <div className="icons">
              <Button
                variant="light"
                size="sm"
                onClick={() => addToMyFavorite(props.current_user, props.id)}
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  size="2x"
                  style={{ color: "green", marginLeft: 10, marginRight: 10 }}
                />
              </Button>
              {/* <OverlayTrigger trigger="click" placement="right" overlay={popover}> */}
              <Button
                variant="light"
                size="sm"
                onClick={() =>
                  removeFromMyFavorite(props.current_user, props.id)
                }
              >
                {" "}
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  size="2x"
                  style={{ color: "red", marginLeft: 10, marginRight: 10 }}
                />
              </Button>
              {/* </OverlayTrigger> */}
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => increaseLikes(props.current_user, props.id)}
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="2x"
                    style={{
                      color: "#FA709A",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                </Button>
              </OverlayTrigger>
              <Button
                variant="light"
                size="sm"
                onClick={() => decreaseLikes(props.current_user, props.id)}
              >
                {" "}
                <FontAwesomeIcon
                  icon={faHeartBroken}
                  size="2x"
                  style={{ color: "#FA709A", marginLeft: 10, marginRight: 10 }}
                />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.artist} - {props.title}
          </Modal.Title>
        </Modal.Header>
        <ResponsiveEmbed
          aspectRatio="16by9"
          style={{ height: 500, width: 500 }}
        >
          <Iframe
            url={props.url}
            width={400}
            height={400}
            allowFullScreen={"true"}
            frameBorder={0}
          />
        </ResponsiveEmbed>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Song;
