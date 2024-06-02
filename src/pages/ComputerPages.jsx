import React, { useEffect, useState } from "react";
import { getAllComputers } from "../api/computersApi";
import { addComputer } from "../api/computersApi";
import { deleteComputer } from "../api/computersApi";
import ComputerList from "../components/ComputerList";
import ComputerItem from "../components/ComputerItem";
function ComputerPages() {
  const [feePerMinute, setFeePerMinute] = useState(30);
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

      <div>
        <div>Prix à la minute:</div> 
        <div>
          <input 
          type="number" 
          className="border-[2x] border-grey-100 w-full"
          value={feePerMinute}
          onChange={(e) => setFeePerMinute(e.target.value)}
        />
        </div>
      </div>

      <div>
        <button onClick={handleAdd}>Ajouter poste</button>
      </div>
z
      <div className="mx-4">
        {terminalList.map((terminal) => (
          <ComputerItem
          key={terminal.computers_id}
          terminal={terminal}
          handleDelete={handleDelete}
          feePerMinute={feePerMinute}
          />
        ))}
      </div>
    
    </div>
  );
}

export default ComputerPages;
