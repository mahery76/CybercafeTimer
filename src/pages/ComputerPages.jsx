import React, { useEffect, useState } from "react";
import { getAllComputers } from "../api/computersApi";
import { addComputer } from "../api/computersApi";
import { deleteComputer } from "../api/computersApi";
import ComputerList from "../components/ComputerList";
import ComputerItem from "../components/ComputerItem";
function ComputerPages() {
  const [mininumFee, setMinimumFee] = useState(30);
  const [terminalList, setTerminalList] = useState([]);

  const handleAdd = () => {
    addComputer(terminalList, setTerminalList);
  };

  const handleDelete = (computers_id) => {
    deleteComputer(computers_id,terminalList, setTerminalList)
  }

  useEffect(() => {
    getAllComputers().then((data) => setTerminalList(data));
  }, []);

  return (
    <div>
      <div>Prix minimal</div>
      <button onClick={handleAdd}>Ajouter poste</button>

      {terminalList.map((terminal) => (
        <ComputerItem key={terminal.computers_id} terminal={terminal} handleDelete={handleDelete}/>
      ))}
    
    </div>
  );
}

export default ComputerPages;
