import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import Headquarters from "./Headquarters";
import WestworldMap from "./WestworldMap";
import { Log } from "../services/Log";


function App() {
  const [hosts, setHosts] = useState([])
  const [areas, setAreas] = useState([])
  const [clickedImage, setClickedImage] = useState('')
  const [idToShow, setIdToShow] = useState(0)
  const [logs, setLogs] = useState([])
  const [isActivated, setIsActivated] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3001/areas`)
      .then(r => r.json())
      .then(data => setAreas(data))
    fetch(`http://localhost:3001/hosts`)
      .then(r => r.json())
      .then(data => setHosts(data))
  }, [])

  function onClick(value) {
    setClickedImage(value.imageUrl)
    setIdToShow(value.id)
  }

  const toShow = hosts.find(host => host.id === idToShow)

  function onChangeLocation(obj, area) {
    const amntHostsInArea = hosts.filter(host => host.area === obj.area)
    const areaLimit = areas.find(area => area.name === obj.area)
    const newHosts = [...hosts].map(host => {
      if (host.id === obj.id) {
        return obj
      } else {
        return host
      }
    })

    if (amntHostsInArea.length < areaLimit.limit) {
      fetch(`http://localhost:3001/hosts/${obj.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(obj)
      })
        .then(r => r.json())
        .then(()=> {
          setHosts(newHosts)
          setLogs([Log.notify(`${obj.firstName} set in area ${area}`), ...logs])
        })
    } else {
      setLogs([Log.error(`Too many hosts. Cannot add ${obj.firstName} to ${area}`), ...logs])
    }
  }

  function onRadioChange(obj) {
    const newObj = [...hosts].map(host => {
      if (host.id === obj.id) {
        return obj
      } else {
        return host
      }
    })

    fetch(`http://localhost:3001/hosts/${obj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(r => r.json())
      .then(() => {
        setHosts(newObj)
        return obj.active ? setLogs([Log.warn(`Activated ${obj.firstName}`), ...logs]) : setLogs([Log.notify(`Decommissioned ${obj.firstName}`), ...logs])
      })
  }

  function toggleAll() {

    const newArray = [...hosts].map(host => {

      // fetch(`http://localhost:3001/hosts/${host.id}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   },
      //   body: JSON.stringify({ ...host, active: !isActivated })

      // })
      //   .then(r => r.json())
      //   .then(data => setHosts(hosts.map(host => host.id === data.id ? data : host)))
      host.active = !isActivated
      return host
    })

      setIsActivated(!isActivated)
      setHosts(newArray)
      !isActivated ? setLogs([Log.warn(`Activating all hosts!`), ...logs]) : setLogs([Log.notify(`Deacommissioning all hosts.`), ...logs])
    
    
  }

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} onClick={onClick} clickedImage={clickedImage} />
      <Headquarters hosts={hosts} areas={areas} onChangeLocation={onChangeLocation} onClick={onClick} clickedImage={clickedImage} toShow={toShow} onRadioChange={onRadioChange} logs={logs} toggleAll={toggleAll} isActivated={isActivated} />
    </Segment>
  );
}

export default App;
