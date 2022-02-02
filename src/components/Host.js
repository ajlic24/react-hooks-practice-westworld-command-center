import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({host, onClick, clickedImage}) {
  const {imageUrl} = host

  function handleClick() {
    onClick(host)
  }

  return (
    <Card
      className={(clickedImage === imageUrl) ? "host selected" : 'host'}
      onClick={handleClick}
      image={imageUrl}
      raised
      link
    />
  );
}

export default Host;
