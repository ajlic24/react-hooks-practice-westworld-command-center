import React, {useState, useEffect} from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({areas, hosts, onClick, clickedImage}) {

  return <Segment id="map">{areas.map(area => <Area key={area.id} area={area} hosts={hosts} onClick={onClick} clickedImage={clickedImage} />)}</Segment>;
}

export default WestworldMap;
