import React, { useEffect, useState } from "react";
import Terminal from "./Terminal";

function ComputerPages() {
  const [mininumFee, setMinimumFee] = useState(30);
  const [counter, setCounter] = useState(1);
  const [terminalList, setTerminalList] = useState([]);

  const addTerminal = () => {
    setCounter((prevValue) => prevValue + 1);
    terminalList.push(counter);
  };
  
  const removeTerminal = (terminalId) => {
    setCounter((prevValue) => prevValue - 1);
    setTerminalList(terminalList.filter((terminal) => terminal !== terminalId));
  };

  return (
    <div>
      <div>Prix minimal</div>
      <button onClick={() => addTerminal()}>Ajouter poste</button>
      {terminalList &&
        terminalList.map((terminalId) => (
          <div key={terminalId}>
            <div>{terminalId.toString()}</div>
            <button onClick={() => removeTerminal(terminalId)}>Delete</button>
          </div>
        ))}
    </div>
  );
}

export default ComputerPages;
