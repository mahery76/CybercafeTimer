import React, { useEffect, useState } from "react";
import { getAllComputers } from "../api/computersApi";
import { addComputer } from "../api/computersApi";
import { deleteComputer } from "../api/computersApi";
import ComputerItem from "../components/ComputerItem";
function ComputerPages() {
  const [feePerMinute, setFeePerMinute] = useState(30);
  const [computerList, setComputerList] = useState([]);

  const handleAdd = () => {
    addComputer(computerList, setComputerList);
  };

  const handleDelete = (computer_id) => {
    deleteComputer(computer_id,computerList, setComputerList)
  }

  useEffect(() => {
    getAllComputers().then((data) => setComputerList(data));
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
        {computerList.map((computer) => (
          <ComputerItem
          key={computer.computer_id}
          computer={computer}
          handleDelete={handleDelete}
          feePerMinute={feePerMinute}
          />
        ))}
      </div>
    
    </div>
  );
}

export default ComputerPages;
