import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({logs, toggleAll, isActivated}) {
  // function dummyLogs() {
  //   // This is just to show you how this should work. But where should the log data actually get stored?
  //   // And where should we be creating logs in the first place?
  //   // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
  //   // Just remember to import it

  //   let logs = [];

  //   logs.unshift(Log.warn(Activated {first name of host}));
  //   logs.unshift(Log.notify("This is an example of a notify log"));
  //   logs.unshift(Log.error("This is an example of an error log"));

  //   return logs;
  // }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      <Button fluid color={isActivated ? "green" : 'red'} content={isActivated ? "DEACTIVATE ALL" : "ACTIVATE ALL"} onClick={toggleAll} />
    </Segment>
  );
}

export default LogPanel;
