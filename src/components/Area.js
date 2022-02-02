import React from "react";
import "../stylesheets/Area.css";
import HostList from "./HostList";

function Area({area, hosts, onClick, clickedImage}) {
  const {id, name, limit, auth_req} = area

  const toShow = hosts.filter(host => host.area === name && host.active === true)

  return (
    <div
      className="area"
      id={
        name
      }
    >
      <h3 className="labels">
        {name.replace(/_/g, ' ').split(' ').map(word => {
          return word[0].toUpperCase() + word.slice(1)
        }).join(' ')
        }
      </h3>
        <HostList hosts={toShow} onClick={onClick} clickedImage={clickedImage} />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
