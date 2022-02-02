import React, {useState} from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList({hosts, clickedImage, onClick}) {

  return (
    <Card.Group itemsPerRow={6}>
      {hosts.map(host => <Host key={host.id} host={host} onClick={onClick} clickedImage={clickedImage} />)}
    </Card.Group>
  );
}

export default HostList;
