import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";
import HostInfo from "./HostInfo";

function Headquarters({hosts, onChangeLocation, onClick, clickedImage, toShow, onRadioChange, logs, toggleAll, isActivated}) {
  
  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={hosts} onClick={onClick} clickedImage={clickedImage} />
      </Grid.Column>
      <Grid.Column width={5}>
        {clickedImage ? <HostInfo toShow={toShow} onChangeLocation={onChangeLocation} onRadioChange={onRadioChange} /> : <Details />}
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel logs={logs} toggleAll={toggleAll} isActivated={isActivated} />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
