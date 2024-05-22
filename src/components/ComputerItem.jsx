import React, { useRef, useState } from "react";
import { editNameComputer } from "../api/computersApi";

function ComputerItem({ terminal, handleDelete }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isRunnig, setIsRunning] = useState(false)
  
  const [computer_name, setComputer_name] = useState(terminal.computer_name)
  

  const [hours, sethours] = useState(terminal.hours)
  const [minutes, setminutes] = useState(terminal.minutes)
  const [seconds, setseconds] = useState(terminal.seconds)

  const handleValidate = (computers_id) => {
    setIsSelected(() => false);
    editNameComputer(computer_name, computers_id)
  };

  return (
    <div  className="flex">

      <div className={isSelected ? "hidden" : "block"}>
        {computer_name}
      </div>

      <div className={isSelected ? "block" : "hidden"}>
        <input
          className="border-2 border-grey-100"
          type="text"
          value={computer_name}
          onChange={(e) => setComputer_name(e.target.value)}
        />
      </div>

      <div
        className={isSelected ? "hidden" : "block"}
        onClick={() => setIsSelected(() => true)}
      >
        Edit
      </div>

      <div
        className={isSelected ? "block" : "hidden"}
        onClick={() => handleValidate(terminal.computers_id)}
      >
        Valider
      </div>

      <div>{hours}</div>
      <div>{minutes}</div>
      <div>{seconds}</div>

      <div>play</div>
      <div>pause</div>
      <div>clear</div>

      <button onClick={() => handleDelete(terminal.computers_id)}>
        Delete
      </button>
    </div>
  );
}

export default ComputerItem;
