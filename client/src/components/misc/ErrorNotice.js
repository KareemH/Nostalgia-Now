import React from "react";
import Alert from "react-bootstrap/Alert";

export default function ErrorNotice(props) {
  return (
    <div>
      <Alert variant="danger" onClose={props.clearError} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{props.message}</p>
      </Alert>
    </div>
  );
}
