import React, { useEffect, useState } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({toShow, onChangeLocation, onRadioChange}) {
  const {id, firstName, lastName, imageUrl, gender, area, active} = toShow
  const options = [
    { key: "high_plains", text: "High Plains", value: "high_plains" },
    { key: "lowlands", text: "Lowlands", value: "lowlands" },
    { key: "under_construction", text: "Under Construction", value: "under_construction" },
    { key: "pariah", text: "Pariah", value: "pariah" },
    { key: "python_pass", text: "Python Pass", value: "python_pass" },
    { key: "badlands", text: "Badlands", value: "badlands" },

  ]

  const [values, setValue] = useState(area);
  const [toggleActive, setToggleActive] = useState(active)

  // console.log(values)

  useEffect(() => {
    console.log('running')
    setValue(area)
    setToggleActive(active)
  }, [id])

  function handleOptionChange(e, {value} ) {
    const name = e.target.innerText
    const newObj = {...toShow, area: value}
    onChangeLocation(newObj, name)
    setValue(value) 
  }

  function handleRadioChange(e) {
    const newObj = {...toShow, active: !toggleActive}
    onRadioChange(newObj)
    setToggleActive(!toggleActive)
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} | {(gender === 'Male') ? <Icon name="man" /> : <Icon name="woman" />}
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={handleRadioChange}
                label={toggleActive ? "Active" : 'Decommissioned'}
                checked={toggleActive}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={values}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
